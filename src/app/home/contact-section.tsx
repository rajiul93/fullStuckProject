import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import { BsTelephoneForward } from 'react-icons/bs';
const ContactSection = () => {
  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-bold mb-8">CONTACT</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-white">
                Name
              </label>
              <Input className="bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 transition-all duration-300" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">
                Email
              </label>
              <Input
                type="email"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">
                Message
              </label>
              <Textarea
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
            >
              📧
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="w-10 h-10 p-0 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              📱
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="w-10 h-10 p-0 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              💼
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="w-10 h-10 p-0 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              📺
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
              <span className="text-white">developer.rajiul@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg">
              <span className="text-cyan-400">
                <BsTelephoneForward />
              </span>
              <span className="text-white">+88 01986570093</span>
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
