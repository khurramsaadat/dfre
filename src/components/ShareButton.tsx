'use client';

import { useState } from 'react';
import { shareContent } from '@/utils/share';

interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
  className?: string;
}

export default function ShareButton({ 
  title, 
  text, 
  url,
  className = 'bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition-colors'
}: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (isSharing) return;
    
    setIsSharing(true);
    try {
      await shareContent({ title, text, url });
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={isSharing}
      className={`${className} ${isSharing ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isSharing ? 'Sharing...' : 'Share'}
    </button>
  );
} 