'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface FeatureCardProps {
  title: string;
  description: string;
  imageUrl: string;
  assets: string[];
  href?: string;
}

const FeatureCard = ({ title, description, imageUrl, assets, href }: FeatureCardProps) => {
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
          className="object-contain p-6"
          priority={true}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="space-y-2">
          {assets.map((asset, index) => (
            <div key={index} className="flex items-center text-gray-700">
              <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              {asset}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCard; 