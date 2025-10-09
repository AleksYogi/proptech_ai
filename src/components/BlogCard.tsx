import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock } from "lucide-react";
import { BlogPost } from "@/types/blogTypes";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {post.image && (
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
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
        
        <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {post.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        
        <Button asChild variant="outline" className="w-full">
          <Link to={`/blog/${post.slug}`}>
            Читать далее
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default BlogCard;