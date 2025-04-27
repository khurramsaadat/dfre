'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface FeatureCardProps {
  title: string;
  description: string;
  imageUrl: string;
  href?: string;
}

const FeatureCard = ({ title, description, imageUrl, href }: FeatureCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
        href ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' : ''
      }`}
      onClick={handleClick}
    >
      <div className="relative h-64 w-full bg-gray-100">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain p-0"
          priority={true}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard; 