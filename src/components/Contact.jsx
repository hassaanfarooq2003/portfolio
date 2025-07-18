import React from 'react';

const Contact = () => {
  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto mt-12">
      <h2 className="text-2xl font-bold text-white">Let's Connect</h2>
      <a
        href="mailto:hassaanfarooq000@gmail.com"
        className="bg-green-400 text-black px-6 py-2 rounded-lg text-base font-medium hover:bg-green-500 transition-colors"
      >
        Email Me
      </a>
    </div>
  );
};

export default Contact;
