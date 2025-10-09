import { Helmet } from 'react-helmet-async';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import BlogCard from '@/components/BlogCard';
import { Skeleton } from '@/components/ui/skeleton';

const BlogIndex = () => {
  const { posts, loading, error } = useBlogPosts();

  return (
    <div className="min-h-screen bg-background">
      {/* SEO мета-теги для главной страницы блога */}
      <Helmet>
        <title>Блог Proptech AI | Современные решения для недвижимости</title>
        <meta
          name="description"
          content="Экспертные статьи о применении ИИ в сфере недвижимости, инвестиционные стратегии, анализ рынка и многое другое."
        />
        <link rel="canonical" href="http://localhost:8080/blog" />
        
        {/* JSON-LD для главной страницы блога */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Блог Proptech AI",
            "description": "Экспертные статьи о применении ИИ в сфере недвижимости",
            "url": "http://localhost:8080/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Proptech AI"
            }
          })}
        </script>
      </Helmet>
      
      <div className="container-custom py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Блог Proptech AI</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Экспертные статьи о применении ИИ в сфере недвижимости, инвестиционные стратегии, анализ рынка и многое другое.
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))
          ) : error ? (
            <div className="col-span-full text-center py-12">
              <p className="text-red-500">Ошибка загрузки статей: {error}</p>
            </div>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Статей пока нет</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogIndex;