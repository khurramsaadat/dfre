import Hero from '@/components/Hero';
import dynamic from 'next/dynamic';

const Typewriter = dynamic(() => import('@/components/Typewriter'), { ssr: false });

export default function Home() {
  return (
    <div>
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center uppercase">
          Layout Creation
          <Typewriter />
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