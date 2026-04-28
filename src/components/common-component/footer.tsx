
import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-2 px-4 text-sm text-white md:flex-row">
        <span>© {year} Portfolio App. All rights reserved.</span>
         
      </div>
    </footer>
  );
};

export default Footer;
