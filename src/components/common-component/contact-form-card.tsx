'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import emailjs from '@emailjs/browser';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { toast } from 'sonner';

type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

const ContactFormCard = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = async (values: ContactFormValues) => {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast.error('Email service is not configured');
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: values.name,
          email: values.email,
          message: values.message,
        },
        publicKey,
      );
      toast.success('Message sent successfully');
      reset();
    } catch {
      toast.error('Failed to send message');
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">CONTACT</h2>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium mb-2 text-white"
          >
            Name
          </label>
          <Input
            id="contact-name"
            placeholder="Your name"
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 transition-all duration-300"
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              },
            })}
          />
          {errors.name ? (
            <p className="mt-1 text-xs text-red-300">{errors.name.message}</p>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium mb-2 text-white"
          >
            Email
          </label>
          <Input
            id="contact-email"
            type="email"
            placeholder="your.email@example.com"
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 transition-all duration-300"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
              },
            })}
          />
          {errors.email ? (
            <p className="mt-1 text-xs text-red-300">{errors.email.message}</p>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="contact-message"
            className="block text-sm font-medium mb-2 text-white"
          >
            Message
          </label>
          <Textarea
            id="contact-message"
            placeholder="Tell me about your project..."
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 transition-all duration-300"
            rows={4}
            {...register('message', {
              required: 'Message is required',
              minLength: {
                value: 10,
                message: 'Message must be at least 10 characters',
              },
            })}
          />
          {errors.message ? (
            <p className="mt-1 text-xs text-red-300">{errors.message.message}</p>
          ) : null}
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-cyan-500/80 to-blue-500/80 hover:from-cyan-500 hover:to-blue-500 backdrop-blur-sm border border-white/20 transition-all duration-300"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>

      <div className="flex gap-4 mt-8">
        <Button
          size="sm"
          variant="ghost"
          className="w-10 h-10 p-0 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
          aria-label="Facebook profile"
          asChild
        >
          <Link
            href="https://www.facebook.com/mohammad.rajiulislam"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </Link>
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="w-10 h-10 p-0 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
          aria-label="LinkedIn profile"
          asChild
        >
          <Link
            href="https://www.linkedin.com/in/rajiul-islam-rayhan"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn />
          </Link>
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="w-10 h-10 p-0 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
          aria-label="GitHub profile"
          asChild
        >
          <Link
            href="https://github.com/rajiul93"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ContactFormCard;
