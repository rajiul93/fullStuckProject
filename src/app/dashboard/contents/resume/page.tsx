'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const TemplateOne = dynamic(() => import('./template-one'), { ssr: false });
const TemplateTwo = dynamic(() => import('./template-two'), { ssr: false });

const ResumePage = () => {
  const [active, setActive] = useState<'one' | 'two'>('two');

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Resume</h1>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActive('one')}
          className={`px-4 py-1.5 rounded text-sm font-medium border transition-colors ${
            active === 'one'
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          Template 1 – Frontend Dev
        </button>
        <button
          onClick={() => setActive('two')}
          className={`px-4 py-1.5 rounded text-sm font-medium border transition-colors ${
            active === 'two'
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          Template 2 – Backend Node.js Dev
        </button>
      </div>
      {active === 'one' ? <TemplateOne /> : <TemplateTwo />}
    </div>
  );
};

export default ResumePage;
