import { useState, useEffect } from 'react';
import { BlogPost, BlogMetadata } from '@/types/blogTypes';

// Функция для извлечения frontmatter из MDX содержимого
const extractFrontmatter = (content: string): { metadata: BlogMetadata; body: string } => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);
  
  if (match) {
    const frontmatter = match[1];
    const body = content.replace(frontmatterRegex, '').trim();
    
    // Простой парсер frontmatter (в реальном проекте используйте yaml parser)
    const metadata: any = {};
    const lines = frontmatter.split('\n');
    
    for (const line of lines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();
        
        // Обработка массивов
        if (value.startsWith('[') && value.endsWith(']')) {
          const arrayValue = value
            .substring(1, value.length - 1)
            .split(',')
            .map(item => item.trim().replace(/['"]/g, ''));
          metadata[key] = arrayValue;
        } else {
          // Удаление кавычек из значений
          metadata[key] = value.replace(/['"]/g, '');
        }
        
        // Обработка специальных полей
        if (key === 'tags' && typeof metadata[key] === 'string') {
          // Если теги представлены как строка, преобразуем в массив
          metadata[key] = [metadata[key]];
        }
      }
    }
    
    return {
      metadata: {
        title: metadata.title,
        description: metadata.description,
        date: metadata.date,
        author: metadata.author,
        tags: Array.isArray(metadata.tags) ? metadata.tags : metadata.tags ? [metadata.tags] : [],
        category: metadata.category,
        image: metadata.image,
        readingTime: metadata.readingTime
      },
      body
    };
  }
  
  // Если нет frontmatter, возвращаем минимальные метаданные
  return {
    metadata: {
      title: 'Без названия',
      description: '',
      date: new Date().toISOString().split('T')[0],
      author: 'Аноним',
      tags: [],
      category: 'Разное',
      image: undefined,
      readingTime: '1 мин'
    },
    body: content
  };
};

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const modules = import.meta.glob('@/data/blog-posts/*.mdx', { query: '?raw', import: 'default' });
        const postsArray: BlogPost[] = [];

        for (const [path, module] of Object.entries(modules)) {
          const content = await module() as string;
          const { metadata, body } = extractFrontmatter(content);
          
          // Извлечение slug из пути файла
          const slug = path
            .split('/')
            .pop()
            ?.replace('.mdx', '')
            .replace('.md', '') || '';

          postsArray.push({
            slug,
            content: body,
            ...metadata
          });
        }

        // Сортировка по дате (новые статьи первыми)
        postsArray.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        setPosts(postsArray);
        setError(null);
      } catch (err) {
        console.error('Ошибка загрузки статей блога:', err);
        setError('Не удалось загрузить статьи блога');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return { posts, loading, error };
};