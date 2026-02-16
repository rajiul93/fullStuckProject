'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ArrowLeft,
  Save,
  Eye,
  X,
  Upload,
  Image,
  Copy,
  Wand2,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  author: z.string().min(1, 'Author is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(
      /^[a-z0-9-]+$/,
      'Slug can only contain lowercase letters, numbers, and hyphens',
    ),
  published: z.boolean(),
  tags: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
});

type BlogFormData = z.infer<typeof blogSchema>;

const CreateBlogPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [promptTemplate, setPromptTemplate] = useState('');
  const [generatedJSON, setGeneratedJSON] = useState('');
  const [componentName, setComponentName] = useState('');
  const [isPaidContent, setIsPaidContent] = useState(false);

  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      content: '',
      author: 'Rajiul Islam',
      slug: '',
      published: false,
      tags: '',
      category: '',
    },
  });

  const watchTitle = form.watch('title');

  // Auto-generate slug from title
  useEffect(() => {
    if (watchTitle) {
      const slug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens

      if (slug !== form.getValues('slug')) {
        form.setValue('slug', slug);
      }
    }
  }, [watchTitle, form]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      form.setValue('tags', newTags.join(', '));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    form.setValue('tags', newTags.join(', '));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: BlogFormData) => {
    // Console log all form data
    console.log('=== FORM SUBMIT DATA ===');
    console.log('Form Data:', data);
    console.log('Tags Array:', tags);
    console.log('Image Preview:', imagePreview);
    console.log('Component Name:', componentName);
    console.log('Is Paid Content:', isPaidContent);
    console.log('Generated JSON:', generatedJSON);
    console.log('========================');

    setIsSubmitting(true);
    try {
      const submitPayload = {
        ...data,
        tags: tags,
        featuredImage: imagePreview,
        componentName: componentName,
        isPaidContent: isPaidContent,
      };

      console.log('API Payload:', submitPayload);

      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitPayload),
      });

      if (!response.ok) {
        throw new Error('Failed to create blog post');
      }

      const result = await response.json();
      console.log('API Response:', result);
      toast.success('Blog post created successfully!');
      router.push('/dashboard/contents/blog');
    } catch (error) {
      console.error('Error creating blog post:', error);
      toast.error('Failed to create blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generatePrompt = () => {
    const prompt = `Create a developer blog card JSON.

The blog should showcase a React component similar to shadcn/ui.

Component Details:
- Component name: ${componentName || 'CustomComponent'}
- Content type: ${isPaidContent ? 'paid' : 'public'}
- Category: ${form.getValues('category') || 'Components'}
- Author: ${form.getValues('author')}

Rules:
- Include title and short description
- Add a preview section with component name
- Add a code section with TSX code
- Mark the code as ${isPaidContent ? 'paid and locked' : 'public'}
- Include a CTA link to the full article
- Output only valid JSON
- Do not include explanations

Required JSON Structure:
{
  "title": "",
  "description": "", 
  "preview": { "type": "component", "componentName": "" },
  "code": { "language": "tsx", "isPaid": ${isPaidContent}, "isLocked": ${isPaidContent}, "snippet": "" },
  "cta": { "label": "Read Full Article", "url": "" },
  "metadata": { "author": "", "category": "", "tags": [] }
}`;

    setPromptTemplate(prompt);
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(promptTemplate);
    toast.success('Prompt copied to clipboard!');
  };

  const insertGeneratedContent = () => {
    if (generatedJSON) {
      try {
        const parsed = JSON.parse(generatedJSON);
        form.setValue('title', parsed.title || '');
        form.setValue(
          'content',
          `# ${parsed.title}

${parsed.description}

## Component Preview
\`\`\`tsx
${parsed.code?.snippet || '// Component code here'}
\`\`\`

## Usage
This component can be used in your React applications...

## Props
| Prop | Type | Description |
|------|------|-------------|
| children | ReactNode | The content to display |

## Installation
\`\`\`bash
npm install component-name
\`\`\`
`,
        );
        toast.success('Content generated and inserted!');
      } catch (error) {
        toast.error('Invalid JSON format');
      }
    }
  };

  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/dashboard/contents/blog">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-2">Create New Blog Post</h1>
        <p className="text-muted-foreground">
          Write and publish a new blog post
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Post Details</CardTitle>
                  <CardDescription>
                    Fill in the basic information for your blog post
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter blog post title..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="url-friendly-slug" {...field} />
                        </FormControl>
                        <FormDescription>
                          Auto-generated from title. Edit if needed.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="author"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Author</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Components, Tutorial"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Tags Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tags</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a tag..."
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                      <Button
                        type="button"
                        onClick={handleAddTag}
                        disabled={!tagInput.trim()}
                      >
                        Add
                      </Button>
                    </div>

                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="gap-1"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content</CardTitle>
                  <CardDescription>
                    Write your blog post content (Markdown supported)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Image Upload Section */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <Image className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer"
                        >
                          <span className="mt-2 block text-sm font-medium text-gray-900">
                            Upload featured image
                          </span>
                          <input
                            id="image-upload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                    </div>
                    {imagePreview && (
                      <div className="mt-4">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-w-full h-auto rounded-lg"
                        />
                      </div>
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="space-y-2">
                            {/* Toolbar for formatting */}
                            <div className="flex gap-2 p-2 border rounded-t-md bg-gray-50">
                              <Button type="button" size="sm" variant="ghost">
                                <strong>B</strong>
                              </Button>
                              <Button type="button" size="sm" variant="ghost">
                                <em>I</em>
                              </Button>
                              <Button type="button" size="sm" variant="ghost">
                                # H1
                              </Button>
                              <Button type="button" size="sm" variant="ghost">
                                ## H2
                              </Button>
                              <Button type="button" size="sm" variant="ghost">
                                ```
                              </Button>
                            </div>
                            <Textarea
                              placeholder="# Your Blog Title

Write your blog content here using Markdown syntax...

## Example Heading
- Bullet points
- **Bold text**
- *Italic text*

```javascript
// Code blocks
const example = 'Hello World';
```

[Link text](https://example.com)"
                              className="min-h-[400px] rounded-t-none"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          {field.value?.length || 0} characters (minimum 50
                          required) - Markdown supported
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Publishing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="published"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Publish immediately</FormLabel>
                          <FormDescription>
                            Make this post visible to readers
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="pt-4 space-y-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isSubmitting ? 'Creating...' : 'Create Post'}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        const formData = form.getValues();
                        console.log('Preview data:', formData);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* AI Prompt Generator */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="h-5 w-5" />
                    AI Prompt Generator
                  </CardTitle>
                  <CardDescription>
                    Generate structured prompts for AI blog creation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">
                        Component Name
                      </label>
                      <Input
                        placeholder="e.g., CustomButton, DataTable"
                        value={componentName}
                        onChange={(e) => setComponentName(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="paid-content"
                        checked={isPaidContent}
                        onCheckedChange={(checked) => {
                          // Handle CheckedState type properly
                          setIsPaidContent(checked === true);
                        }}
                      />
                      <label
                        htmlFor="paid-content"
                        className="text-sm font-medium"
                      >
                        Paid Content
                      </label>
                    </div>

                    <Button
                      type="button"
                      onClick={generatePrompt}
                      className="w-full"
                      variant="secondary"
                    >
                      <Wand2 className="h-4 w-4 mr-2" />
                      Generate Prompt
                    </Button>

                    {promptTemplate && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-medium">
                            Generated Prompt
                          </label>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={copyPrompt}
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </Button>
                        </div>
                        <Textarea
                          value={promptTemplate}
                          readOnly
                          className="text-xs bg-gray-50"
                          rows={8}
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        AI Generated JSON
                      </label>
                      <Textarea
                        placeholder="Paste AI generated JSON here..."
                        value={generatedJSON}
                        onChange={(e) => setGeneratedJSON(e.target.value)}
                        rows={6}
                        className="text-xs"
                      />
                      <Button
                        type="button"
                        onClick={insertGeneratedContent}
                        disabled={!generatedJSON}
                        className="w-full"
                        size="sm"
                      >
                        Insert Generated Content
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Tips</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• Copy the generated prompt</p>
                  <p>• Use it with ChatGPT/Claude</p>
                  <p>• Paste JSON result back here</p>
                  <p>• Click Insert to auto-fill form</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Tips</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• Use clear, descriptive titles</p>
                  <p>• Add relevant tags to improve discoverability</p>
                  <p>• Write engaging introductions</p>
                  <p>• Include code examples when applicable</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateBlogPage;
