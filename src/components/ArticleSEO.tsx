import { Helmet } from 'react-helmet-async';
import { BlogPost } from '@/types/blogTypes';

interface ArticleSEOProps {
  post: BlogPost;
  baseUrl?: string;
}

const ArticleSEO: React.FC<ArticleSEOProps> = ({ post, baseUrl = 'https://proptech-ai.ru' }) => {
  const articleUrl = `${baseUrl}/blog/${post.slug}`;
  const imageUrl = post.image ? `${baseUrl}${post.image}` : `${baseUrl}/placeholder.svg`;
  
  // Генерация тегов для статьи
  const articleTags = post.tags ? post.tags.join(', ') : '';

  return (
    <Helmet>
      {/* Основные мета-теги */}
      <title>{post.title} | Блог Proptech AI</title>
      <meta name="description" content={post.description} />
      <link rel="canonical" href={articleUrl} />
      
      {/* Open Graph теги */}
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={articleUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="Proptech AI" />
      <meta property="og:locale" content="ru_RU" />
      <meta property="article:published_time" content={post.date} />
      <meta property="article:author" content={post.author} />
      <meta property="article:section" content={post.category} />
      {post.tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter Card теги */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={post.description} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* JSON-LD структурированные данные */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": articleUrl
          },
          "headline": post.title,
          "description": post.description,
          "image": imageUrl,
          "author": {
            "@type": "Person",
            "name": post.author
          },
          "publisher": {
            "@type": "Organization",
            "name": "Proptech AI",
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/logo.png`
            }
          },
          "datePublished": post.date,
          "dateModified": post.date,
          "articleSection": post.category,
          "keywords": articleTags
        })}
      </script>
    </Helmet>
  );
};

export default ArticleSEO;