"use client";

import Hero from '@/components/Hero';
import dynamic from 'next/dynamic';

const Typewriter = dynamic(() => import('@/components/Typewriter'), { ssr: false });

export default function Home() {
  return (
    <div>
      <section className="py-16">
        <h2 className="text-[32px] md:text-5xl font-black mb-4 flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center uppercase text-left md:text-center text-orange-900 px-6 md:px-0">
          Layout Creation
          <span className="block md:inline text-[32px] md:text-5xl text-orange-900">
            <Typewriter />
          </span>
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto">
          Welcome to Layout Factory!
          <br />
        </p>
      </section>
      <Hero hideButtons />
    </div>
  );
} 