'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

type BlogArticle = {
  title: string;
  description: string;
  author: string;
  date: string;
  isPaid: boolean;
  content: {
    sections: Section[];
  };
};

type Section = {
  type: 'text' | 'component-showcase' | 'code-only';
  title?: string;
  content?: string;
  code?: string;
  preview?: React.ReactNode;
  language?: string;
};

// Mock article data
const ARTICLE_DATA: BlogArticle = {
  title: 'Building a Custom Button Component with shadcn/ui',
  description: 'Learn how to create accessible, reusable button components',
  author: 'Rajiul Islam',
  date: '2024-01-15',
  isPaid: false,
  content: {
    sections: [
      {
        type: 'text',
        title: 'Introduction',
        content:
          "In this tutorial, we'll build a fully accessible button component with multiple variants, sizes, and states. We'll use TypeScript for type safety and Tailwind CSS for styling.",
      },
      {
        type: 'component-showcase',
        title: 'Basic Button Component',
        content: "Here's a simple button component with variant support:",
        code: `import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'rounded-md font-medium transition-colors',
          {
            'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
            'border border-input hover:bg-accent': variant === 'outline',
            'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
            'px-3 py-1 text-sm': size === 'sm',
            'px-4 py-2': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    )
  }
)`,
        preview: (
          <div className="flex gap-3 flex-wrap">
            <Button>Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        ),
        language: 'tsx',
      },
      {
        type: 'text',
        title: 'Usage Examples',
        content:
          'You can use the button component with different props to achieve various styles.',
      },
      {
        type: 'code-only',
        title: 'Import and Use',
        code: `import { Button } from '@/components/ui/button'

export function MyComponent() {
  return (
    <div>
      <Button onClick={() => console.log('clicked')}>
        Click me
      </Button>
      
      <Button variant="outline" size="sm">
        Small Outline
      </Button>
    </div>
  )
}`,
        language: 'tsx',
      },
    ],
  },
};

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg border bg-muted/50">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <span className="text-xs text-muted-foreground font-mono">
          {language}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 gap-1"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              Copy
            </>
          )}
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono">{code}</code>
      </pre>
    </div>
  );
}

export default function BlogArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = ARTICLE_DATA; // In real app, fetch based on params.slug

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      {/* Back Button */}
      <Link href="/dashboard/contents/blog">
        <Button variant="ghost" className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Button>
      </Link>

      {/* Article Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          {article.isPaid && (
            <Badge variant="default" className="gap-1">
              <Lock className="h-3 w-3" />
              Premium Content
            </Badge>
          )}
        </div>

        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <p className="text-xl text-muted-foreground mb-4">
          {article.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>By {article.author}</span>
          <span>•</span>
          <span>
            {new Date(article.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
      </header>

      {/* Article Content */}
      <article className="space-y-12">
        {article.content.sections.map((section, index) => (
          <section key={index}>
            {section.title && (
              <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            )}

            {section.content && (
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {section.content}
              </p>
            )}

            {/* Component Showcase with Preview + Code */}
            {section.type === 'component-showcase' && section.code && (
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2 mb-4">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="border rounded-lg p-8">
                  <div className="flex items-center justify-center min-h-[200px]">
                    {section.preview}
                  </div>
                </TabsContent>

                <TabsContent value="code">
                  <CodeBlock
                    code={section.code}
                    language={section.language || 'tsx'}
                  />
                </TabsContent>
              </Tabs>
            )}

            {/* Code Only */}
            {section.type === 'code-only' && section.code && (
              <CodeBlock
                code={section.code}
                language={section.language || 'tsx'}
              />
            )}
          </section>
        ))}
      </article>

      {/* Paid Content Lock */}
      {article.isPaid && (
        <div className="mt-12 border rounded-lg p-8 text-center bg-muted/30">
          <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">Premium Content</h3>
          <p className="text-muted-foreground mb-6">
            Unlock this article and get access to advanced examples, source
            code, and video tutorials.
          </p>
          <Button size="lg">Unlock for $9.99</Button>
        </div>
      )}
    </div>
  );
}
