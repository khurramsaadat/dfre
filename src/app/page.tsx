import Hero from '@/components/Hero';

export default function Home() {
  return (
    <div>
      <Hero hideButtons />
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Welcome to Our Website</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto">
          This is a modern website built with Next.js and Tailwind CSS. It features a responsive design,
          beautiful UI components, and is ready for you to customize and build upon.
        </p>
      </section>
    </div>
  );
} 