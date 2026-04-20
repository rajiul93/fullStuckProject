'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Copy } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { BsTelephoneForward } from 'react-icons/bs';
import { toast } from 'sonner';

const ContactSection = () => {
  const email = 'developer.rajiul@gmail.com';
  const phone = '+88 01986570093';

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied`);
    } catch {
      toast.error(`Failed to copy ${label.toLowerCase()}`);
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-24 max-w-7xl mx-auto px-6 py-16"
    >
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-bold mb-8">CONTACT</h2>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-sm font-medium mb-2 text-white"
              >
                Name
              </label>
              <Input
                id="contact-name"
                name="name"
                placeholder="Your name"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 transition-all duration-300"
              />
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
                name="email"
                type="email"
                placeholder="your.email@example.com"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 transition-all duration-300"
              />
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
                name="message"
                placeholder="Tell me about your project..."
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 transition-all duration-300"
                rows={4}
              />
            </div>
            <Button className="w-full bg-gradient-to-r from-cyan-500/80 to-blue-500/80 hover:from-cyan-500 hover:to-blue-500 backdrop-blur-sm border border-white/20 transition-all duration-300">
              Send Message
            </Button>
          </div>

          {/* Social Icons */}
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
                href="www.linkedin.com/in/rajiul-islam-rayhan"
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

        <div className="space-y-8">
          <p className="text-gray-300">
            Ready to bring your ideas to life? Let&apos;s collaborate and build
            something amazing together.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg">
              <span className="text-cyan-400">📧</span>
              <a
                href={`mailto:${email}`}
                className="text-white hover:text-cyan-300 transition-colors"
              >
                {email}
              </a>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="ml-auto h-8 w-8 text-white/80 hover:text-white hover:bg-white/10"
                aria-label="Copy email"
                onClick={() => handleCopy(email, 'Email')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg">
              <span className="text-cyan-400">
                <BsTelephoneForward />
              </span>
              <a
                href="tel:+8801986570093"
                className="text-white hover:text-cyan-300 transition-colors"
              >
                {phone}
              </a>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="ml-auto h-8 w-8 text-white/80 hover:text-white hover:bg-white/10"
                aria-label="Copy phone number"
                onClick={() => handleCopy(phone, 'Phone number')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg">
              <span className="text-cyan-400">📍</span>
              <span className="text-white">Available Worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
