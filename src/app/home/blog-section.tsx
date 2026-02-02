import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Component Pattern',
      description: 'Advanced design pattern',
      gradient: 'from-purple-500 to-blue-500',
      icon: null,
    },
    {
      id: 2,
      title: 'Full Manager API',
      description: 'Backend API development',
      gradient: 'from-blue-500 to-teal-500',
      icon: '⚛️',
    },
    {
      id: 3,
      title: 'Real time Chat App',
      description: 'Socket.io implementation',
      gradient: 'from-teal-500 to-green-500',
      icon: null,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">BLOG</h2>
        <Button
          variant="outline"
          className="text-cyan-400 border-cyan-400 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300"
        >
          VIEW PROJECTS
        </Button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Card
            key={post.id}
            className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:bg-white/20 transition-all duration-300"
          >
            <div
              className={`h-48 bg-gradient-to-br ${post.gradient} rounded-t-lg ${post.icon ? 'flex items-center justify-center' : ''}`}
            >
              {post.icon && <span className="text-6xl">{post.icon}</span>}
            </div>
            <CardContent className="p-6">
              <h3 className="font-bold mb-2 text-white">{post.title}</h3>
              <p className="text-sm text-gray-300">{post.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button className="bg-gradient-to-r from-cyan-500/80 to-blue-500/80 hover:from-cyan-500 hover:to-blue-500 backdrop-blur-sm border border-white/20 transition-all duration-300">
          READ ALL POSTS
        </Button>
      </div>
    </section>
  );
};

export default BlogSection;
