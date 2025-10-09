import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Clock } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import ArticleSEO from '@/components/ArticleSEO';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { posts, loading, error } = useBlogPosts();
  
  const post = posts.find(p => p.slug === slug);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-muted-foreground">Загрузка статьи...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-foreground mb-6">Ошибка загрузки</h1>
            <p className="text-red-500">Ошибка загрузки статьи: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-foreground mb-6">Статья не найдена</h1>
            <p className="text-muted-foreground">Запрашиваемая статья не найдена в блоге.</p>
          </div>
        </div>
      </div>
    );
  }

  // Обработка Markdown контента
  const renderers = {
    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground" {...props} />,
    h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-7 mb-4 text-foreground" {...props} />,
    h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-6 mb-3 text-foreground" {...props} />,
    p: ({ node, ...props }) => <p className="my-4 text-foreground" {...props} />,
    ul: ({ node, ...props }) => <ul className="list-disc list-inside my-4 space-y-2" {...props} />,
    ol: ({ node, ...props }) => <ol className="list-decimal list-inside my-4 space-y-2" {...props} />,
    li: ({ node, ...props }) => <li className="ml-4 text-foreground" {...props} />,
    a: ({ node, ...props }) => <a className="text-primary hover:underline" {...props} />,
    strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
    em: ({ node, ...props }) => <em className="italic" {...props} />,
    blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4" {...props} />,
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      if (inline) {
        return <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>{children}</code>;
      } else if (match) {
        return (
          <SyntaxHighlighter
            style={atomDark}
            language={match[1]}
            PreTag="div"
            className="rounded my-4 overflow-x-auto"
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        );
      } else {
        return (
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
            {children}
          </code>
        );
      }
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* SEO мета-теги для статьи */}
      <ArticleSEO post={post} />
      
      <div className="container-custom py-12">
        <Button
          variant="outline"
          className="mb-6"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад к блогу
        </Button>
        
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime}</span>
              </div>
            </div>
          </header>
          
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              components={renderers}
              children={post.content}
            />
          </div>
          
          <footer className="mt-12 pt-6 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  #{tag}
                </Badge>
              ))}
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;