import { Button } from '@/components/ui/button';
import Link from 'next/link';
import HeroSection from './home/hero-section';
import SkillsSection from './home/skills-section';
import BlogSection from './home/blog-section';
import ContactSection from './home/contact-section';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-teal-800 text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded flex items-center justify-center">
            <span className="text-white font-bold">⚡</span>
          </div>
          <span className="font-bold text-xl">RAJIUL ISLAM</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="hover:text-blue-300">
            HOME
          </Link>
          <Link href="#" className="hover:text-blue-300">
            Skills
          </Link>
          <Link href="#" className="hover:text-blue-300">
            Projects
          </Link>
          <Link href="#" className="hover:text-blue-300">
            Blog
          </Link>
          <Link href="#" className="hover:text-blue-300">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            🌐
          </Button>
          <Button variant="ghost" size="sm">
            🔍
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />
      {/* Skills Section */}
      <SkillsSection />
      {/* Blog Section */}
      <BlogSection />
      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default HomePage;
