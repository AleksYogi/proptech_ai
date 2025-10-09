export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  category: string;
  image?: string;
  readingTime: string;
  content: string;
}

export interface BlogMetadata {
  title: string;
 description: string;
  date: string;
  author: string;
  tags: string[];
  category: string;
  image?: string;
  readingTime: string;
}