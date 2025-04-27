"use client";

import Hero from '@/components/Hero';
import dynamic from 'next/dynamic';

const Typewriter = dynamic(() => import('@/components/Typewriter'), { ssr: false });

export default function Home() {
  return (
    <div>
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-[20px] md:text-3xl font-bold mb-4 flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center uppercase text-left md:text-center text-orange-900">
          Layout Creation
          <span className="block md:inline ml-0 md:ml-3 text-[20px] md:text-3xl text-orange-900">
            <Typewriter />
          </span>
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto">
          Welcome to layout creation factory!
          <br />
        </p>
      </section>
      <Hero hideButtons />
    </div>
  );
} 