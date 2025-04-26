import Link from 'next/link';
import FeatureCard from './FeatureCard';

const Hero = () => {
  const features = [
    {
      title: "Dubai Municipality - 6 Assets",
      description: "For Dubai Municipality's approval",
      imageUrl: "/images/6-assets.png",
      assets: [
        "Asset Management"
      ],
      href: "/dm6assets"
    },
    {
      title: "Dubai Municipality - 3 Assets",
      description: "Streamlined asset management solution",
      imageUrl: "/images/DS-layout.png",
      assets: [
        "Asset Tracking"
      ]
    },
    {
      title: "DFRE Schedule",
      description: "Efficient scheduling system",
      imageUrl: "/images/DS-layout.png",
      assets: [
        "Schedule Management"
      ]
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to Your Next.js Website
          </h1>
          <p className="text-xl mb-8">
            A modern, responsive website built with Next.js and Tailwind CSS.
            Start building something amazing today.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              imageUrl={feature.imageUrl}
              assets={feature.assets}
              href={feature.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero; 