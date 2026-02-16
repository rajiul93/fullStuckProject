'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Lock,
  Search,
  Calendar,
  User,
  Copy,
  Check,
  Code2,
  Plus,
} from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type BlogPost = {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  category: string;
  published: boolean;
  tags: string[];
  slug: string;
};

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch('/api/blogs');
      if (response.ok) {
        const data = await response.json();
        setBlogPosts(data.blogs || []);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'All',
    ...Array.from(
      new Set(blogPosts.map((post) => post.category).filter(Boolean)),
    ),
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopyCode = (code: string, postId: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(postId);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Developer Blog</h1>
            <p className="text-muted-foreground text-lg">
              Component showcases, tutorials, and code examples
            </p>
          </div>

          <Link href="/dashboard/contents/blog/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create New Blog
            </Button>
          </Link>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Header */}
            <div className="p-6 border-b bg-muted/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {post.category && (
                    <Badge variant="secondary">{post.category}</Badge>
                  )}
                  {!post.published && (
                    <Badge variant="outline" className="gap-1">
                      Draft
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>

              <p className="text-muted-foreground mb-4">
                {post.content.substring(0, 200)}...
              </p>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                {post.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-background px-2 py-1 rounded border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Preview + Code Section */}
            <div className="p-6">
              <Tabs defaultValue="preview" className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <TabsList>
                    <TabsTrigger value="preview" className="gap-2">
                      <Code2 className="h-4 w-4" />
                      Preview
                    </TabsTrigger>
                    <TabsTrigger value="code">Code</TabsTrigger>
                  </TabsList>

                  <Link href={`/dashboard/contents/blog/${post.slug}`}>
                    <Button variant="ghost" size="sm">
                      View Full Article →
                    </Button>
                  </Link>
                </div>

                {/* Preview Tab */}
                <TabsContent
                  value="preview"
                  className="border rounded-lg p-8 bg-muted/30"
                >
                  <div className="flex items-center justify-center min-h-[200px]">
                    <div className="space-y-3">
                      <Button>Default Button</Button>
                      <div className="flex gap-2">
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Code Tab */}
                <TabsContent value="code">
                  <div className="relative rounded-lg border bg-muted/50">
                    <div className="flex items-center justify-between px-4 py-2 border-b bg-muted">
                      <span className="text-xs text-muted-foreground font-mono">
                        tsx
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleCopyCode(
                            `// Example code for ${post.title}\nimport { Button } from '@/components/ui/button'\n\nexport function Example() {\n  return (\n    <div>\n      <Button>Click me</Button>\n    </div>\n  )\n}`,
                            post.id,
                          )
                        }
                        className="h-7 gap-1"
                      >
                        {copiedCode === post.id ? (
                          <>
                            <Check className="h-3 w-3" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            Copy Code
                          </>
                        )}
                      </Button>
                    </div>
                    <pre className="p-4 overflow-x-auto">
                      <code className="text-sm font-mono">
                        {post.content.substring(0, 500)}...
                      </code>
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Footer CTA */}
            <div className="px-6 pb-6">
              <Link
                href={`/dashboard/contents/blog/${post.slug}`}
                className="block"
              >
                <Button className="w-full" variant="outline" size="lg">
                  Read Full Article
                </Button>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            {blogPosts.length === 0
              ? 'No blog posts found. Create your first blog post!'
              : 'No articles found matching your criteria.'}
          </p>
          {blogPosts.length === 0 && (
            <Link href="/dashboard/contents/blog/create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Blog Post
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogPage;
