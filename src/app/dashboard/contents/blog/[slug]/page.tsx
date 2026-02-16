'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Copy, Check, Code2, Eye, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================
// 1. COMPONENT REGISTRY - Register all preview components here
// ============================================
const PremiumDataTable = () => {
  return (
    <div className="border rounded-lg p-6 bg-card">
      <h3 className="font-semibold text-lg mb-2">Premium Data Table</h3>
      <p className="text-sm text-muted-foreground mb-4">
        This is a premium component with sorting, filtering, and pagination.
      </p>
      <div className="border rounded-md">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2 text-sm">John Doe</td>
              <td className="px-4 py-2 text-sm">
                <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">
                  Active
                </span>
              </td>
              <td className="px-4 py-2 text-sm">Admin</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 text-sm">Jane Smith</td>
              <td className="px-4 py-2 text-sm">
                <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs">
                  Pending
                </span>
              </td>
              <td className="px-4 py-2 text-sm">User</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Add more components to this registry as needed
const COMPONENT_REGISTRY: Record<string, React.FC> = {
  PremiumDataTable,
  // Add more: MyChart, UserCard, etc.
};

// ============================================
// 2. TYPES
// ============================================
interface BlogPost {
  title: string;
  slug: string;
  author: string;
  category: string;
  content: string;
  tags: string[];
  published: boolean;
  isPaid?: boolean;
  previewComponent?: string; // References a key in COMPONENT_REGISTRY
}

interface BlogDetailsProps {
  userHasAccess?: boolean;
}

// ============================================
// 3. SAMPLE DATA
// ============================================
const sampleBlogPost: BlogPost = {
  title: 'Premium Interactive Data Table with Advanced Filtering',
  slug: 'premium-interactive-data-table-with-advanced-filtering',
  author: 'Rajiul Islam',
  category: 'React Components',
  previewComponent: 'PremiumDataTable', // This maps to COMPONENT_REGISTRY
  content: `# Premium Interactive Data Table with Advanced Filtering

A powerful, feature-rich data table component with sorting, filtering, pagination, and row selection capabilities built for modern React applications.

## Features

- **Sorting**: Click column headers to sort
- **Filtering**: Search across all columns
- **Pagination**: Navigate large datasets
- **Row Selection**: Select single or multiple rows

## Component Preview

\`\`\`tsx
import React from 'react';

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowSelect?: (rows: T[]) => void;
}

export const PremiumDataTable = <T extends object>({ 
  data, 
  columns, 
  onRowSelect 
}: DataTableProps<T>) => {
  const [sortColumn, setSortColumn] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');
  const [filter, setFilter] = React.useState('');
  const [selectedRows, setSelectedRows] = React.useState<Set<number>>(new Set());

  return (
    <div className="border rounded-lg p-4">
      <input 
        type="text"
        placeholder="Search..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full px-3 py-2 border rounded-md mb-4"
      />
      <table className="w-full">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} onClick={() => handleSort(col.key)}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
\`\`\`

## Usage

\`\`\`tsx
import { PremiumDataTable } from '@/components/premium-data-table';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'status', label: 'Status' },
];

const data = [
  { name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { name: 'Jane Smith', email: 'jane@example.com', status: 'Pending' },
];

export default function MyPage() {
  return (
    <PremiumDataTable 
      data={data} 
      columns={columns}
      onRowSelect={(rows) => console.log('Selected:', rows)}
    />
  );
}
\`\`\`

## Props

| Prop | Type | Description |
|------|------|-------------|
| data | T[] | Array of data objects |
| columns | Column<T>[] | Column definitions |
| onRowSelect | (rows: T[]) => void | Callback when rows are selected |
`,
  tags: ['react', 'typescript', 'data-table', 'premium', 'components', 'ui'],
  published: true,
  isPaid: false,
};

// ============================================
// 4. CODE BLOCK COMPONENT
// ============================================
interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'tsx' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative border rounded-lg overflow-hidden my-4">
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted">
        <span className="text-xs font-mono text-muted-foreground">
          {language}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 gap-1.5"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" /> Copied!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> Copy
            </>
          )}
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto bg-slate-950 text-slate-50">
        <code className="text-sm font-mono">{code}</code>
      </pre>
    </div>
  );
};

// ============================================
// 5. MARKDOWN RENDERER
// ============================================
interface MarkdownRendererProps {
  content: string;
  showCodeBlocks?: boolean;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  showCodeBlocks = true,
}) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold mt-8 mb-4 first:mt-0">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-semibold mt-4 mb-2">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside mb-4 space-y-1 text-muted-foreground">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside mb-4 space-y-1 text-muted-foreground">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="ml-2">{children}</li>,
        strong: ({ children }) => (
          <strong className="font-semibold text-foreground">{children}</strong>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse border rounded-lg">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
        th: ({ children }) => (
          <th className="border px-4 py-2 text-left text-sm font-medium">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border px-4 py-2 text-sm text-muted-foreground">
            {children}
          </td>
        ),
        code: ({ className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          const isInline = !match;

          if (isInline) {
            return (
              <code
                className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          }

          // Block code
          if (!showCodeBlocks) {
            return null;
          }

          return (
            <CodeBlock code={String(children).trim()} language={match?.[1]} />
          );
        },
        pre: ({ children }) => <>{children}</>, // Let code handle rendering
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

// ============================================
// 6. BLUR OVERLAY FOR PAID CONTENT
// ============================================
interface PaidContentWrapperProps {
  isPaid: boolean;
  hasAccess: boolean;
  children: React.ReactNode;
}

const PaidContentWrapper: React.FC<PaidContentWrapperProps> = ({
  isPaid,
  hasAccess,
  children,
}) => {
  if (!isPaid || hasAccess) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div className="filter blur-sm pointer-events-none select-none">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm rounded-lg">
        <div className="text-center p-6">
          <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Premium Content</h3>
          <p className="text-muted-foreground mb-4">
            Unlock this content to view the full article and code.
          </p>
          <Button>Unlock Access</Button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// 7. EXTRACT CODE BLOCKS UTILITY
// ============================================
const extractCodeBlocks = (
  markdown: string,
): { code: string; language: string }[] => {
  const regex = /```(\w+)?\n([\s\S]*?)```/g;
  const blocks: { code: string; language: string }[] = [];
  let match;

  while ((match = regex.exec(markdown)) !== null) {
    blocks.push({
      language: match[1] || 'plaintext',
      code: match[2].trim(),
    });
  }

  return blocks;
};

// ============================================
// 8. MAIN BLOG DETAILS PAGE COMPONENT
// ============================================
const BlogDetailsPage: React.FC<BlogDetailsProps> = ({
  userHasAccess = false,
}) => {
  const post = sampleBlogPost;
  const codeBlocks = extractCodeBlocks(post.content);

  // Get the preview component from registry
  const PreviewComponent = post.previewComponent
    ? COMPONENT_REGISTRY[post.previewComponent]
    : null;

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          {post.isPaid && (
            <span className="px-2 py-1 rounded bg-amber-100 text-amber-700 text-xs font-medium">
              Premium
            </span>
          )}
          <span className="text-sm text-muted-foreground">{post.category}</span>
        </div>
        <h1 className="text-4xl font-bold mb-3">{post.title}</h1>
        <p className="text-muted-foreground mb-4">By {post.author}</p>
        <div className="flex gap-2 flex-wrap">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Tabs */}
      <Tabs defaultValue="preview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="h-4 w-4" /> Preview
          </TabsTrigger>
          <TabsTrigger value="code" className="flex items-center gap-2">
            <Code2 className="h-4 w-4" /> Code
          </TabsTrigger>
        </TabsList>

        {/* Preview Tab */}
        <TabsContent value="preview" className="space-y-6">
          <PaidContentWrapper
            isPaid={post.isPaid || false}
            hasAccess={userHasAccess}
          >
            {/* Live Component Preview */}
            {PreviewComponent && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
                <div className="border rounded-lg p-6 bg-muted/20">
                  <PreviewComponent />
                </div>
              </div>
            )}

            {/* Markdown Content (without code blocks in preview) */}
            <div className="prose-custom">
              <MarkdownRenderer content={post.content} showCodeBlocks={false} />
            </div>
          </PaidContentWrapper>
        </TabsContent>

        {/* Code Tab */}
        <TabsContent value="code" className="space-y-6">
          <PaidContentWrapper
            isPaid={post.isPaid || false}
            hasAccess={userHasAccess}
          >
            <h2 className="text-xl font-semibold mb-4">Source Code</h2>
            {codeBlocks.length > 0 ? (
              <div className="space-y-6">
                {codeBlocks.map((block, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      {index === 0
                        ? 'Component Implementation'
                        : `Code Block ${index + 1}`}
                    </h3>
                    <CodeBlock code={block.code} language={block.language} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                No code blocks found in this post.
              </p>
            )}
          </PaidContentWrapper>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlogDetailsPage;
