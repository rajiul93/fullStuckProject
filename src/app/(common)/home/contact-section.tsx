'use client';

import ContactFormCard from '@/components/common-component/contact-form-card';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import React from 'react';
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
        <ContactFormCard />

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
