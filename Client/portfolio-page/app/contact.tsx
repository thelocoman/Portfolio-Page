import { HTML5React, GithubOriginal, LinkedinPlain } from 'devicons-react';

export default function Contact() {
  return (
    <section id="contact" className="bg-gradient-to-b from-[#45daea] to-black flex flex-col justify-center items-center py-20 px-6">
      <h2 className="text-4xl font-bold mb-6 text-black">Contact</h2>
      <p className="text-gray-900 font-medium max-w-xl text-center text-lg mb-10">
        I'm currently open to new opportunities and my inbox is always open. Whether you have a question or just want to say hi, feel free to connect!
      </p>
      
      <div className="flex gap-10 justify-center">
        <a href="mailto:tiborlovasz@icloud.com" className="border-2 border-black text-gray-800 p-5 bg-white rounded-[25px] transition-all duration-300 hover:text-blue-500 hover:scale-120 flex items-center justify-center">
          <span className="text-3xl font-bold">@</span>
        </a>
        <a href="https://github.com/thelocoman" target="_blank" rel="noopener noreferrer" className="border-2 border-black text-gray-800 p-5 bg-white rounded-[25px] transition-all duration-300 hover:text-blue-500 hover:scale-120 flex items-center justify-center">
          <GithubOriginal size={35} />
        </a>
        <a href="https://linkedin.com/in/tibor-lovasz-435732260" target="_blank" rel="noopener noreferrer" className="border-2 border-black text-gray-800 p-5 bg-white rounded-[25px] transition-all duration-300 hover:text-blue-500 hover:scale-120 flex items-center justify-center">
          <LinkedinPlain size={35} />
        </a>
      </div>
    </section>
  );
}