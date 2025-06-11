import Link from 'next/link';
import FeatureCard from './FeatureCard';

interface HeroProps {
  hideButtons?: boolean;
}

const Hero = ({ hideButtons = false }: HeroProps) => {
  const features = [
    {
      title: "DM - 6 Assets En & Ar",
      description: "For Dubai Municipality's approval",
      imageUrl: "/images/card1.jpg",
      href: "/dm6assets"
    },
    {
      title: "DM - 3 Assets - Arabic only",
      description: "For Dubai Municipality's approval",
      imageUrl: "/images/card2.jpg",
      href: "/dm3assets"
    },
    {
      title: "DFRE Schedule",
      description: "Design Studio layouts",
      imageUrl: "/images/card3.jpg",
      href: "/design-studio"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 text-white py-20">
      <div className="container mx-auto px-6">
        {!hideButtons && (
          <div className="text-center mb-16">
            <h1 style={{ fontSize: '4rem', fontWeight: 900 }} className="mb-6 tracking-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
              Layout Factory
            </h1>
            <p className="text-xl mb-8">
              A modern, responsive website built with Next.js and Tailwind CSS.
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              imageUrl={feature.imageUrl}
              href={feature.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero; 