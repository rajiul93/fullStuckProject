import Footer from '@/components/common-component/footer';
import Navbar from '@/components/common-component/navbar';
import React from 'react';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-teal-800 text-white">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default PublicLayout;
