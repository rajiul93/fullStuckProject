'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const TemplateOne = dynamic(() => import('./template-one'), {
  ssr: false,
});

const ResumePage = () => {
  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Resume</h1>
      <p className="text-gray-600">This is the Resume page content.</p>
      <TemplateOne />
    </div>
  );
};

export default ResumePage;
