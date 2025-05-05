interface ShareOptions {
  title?: string;
  text?: string;
  url?: string;
}

export async function shareContent({
  title = 'DFRE Templates',
  text = 'Explore Dubai Calendar - Your Ultimate Guide to Events in Dubai',
  url = typeof window !== 'undefined' ? window.location.href : '',
}: ShareOptions = {}) {
  try {
    if (typeof window === 'undefined') return false;

    // Track the share attempt
    if (window.trackShare) {
      window.trackShare('share_initiated');
    }

    if (navigator.share) {
      await navigator.share({
        title,
        text,
        url,
      });
      // Track successful native share
      if (window.trackShare) {
        window.trackShare('native_share');
      }
      return true;
    }

    // Fallback to WhatsApp sharing
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title}\n${text}\n${url}`)}`;
    window.open(whatsappUrl, '_blank');
    
    // Track WhatsApp fallback
    if (window.trackShare) {
      window.trackShare('whatsapp_fallback');
    }
    return true;
  } catch (error) {
    console.error('Error sharing:', error);
    // Track share error
    if (window.trackShare) {
      window.trackShare('share_error');
    }
    return false;
  }
} 