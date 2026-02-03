"use client";
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

type Box = {
  width: number;
  height: number;
  left: number;
  top: number;
  image?: string;
  imageSize?: { width: number; height: number };
};

const boxesConfig: Box[] = [
  { width: 640, height: 360, left: 680, top: 139 },
  { width: 1280, height: 720, left: 360, top: 593 },
  { width: 800, height: 180, left: 600, top: 1413 }
];

export default function DM3AssetsHeroLayout() {
  const layoutWidth = 2000;
  const layoutHeight = 1734;
  const [scale, setScale] = useState(1);
  const [boxes, setBoxes] = useState<Box[]>(boxesConfig.map(box => ({ ...box, image: undefined })));
  const [currentBoxIndex, setCurrentBoxIndex] = useState<number | null>(null);
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [labelText, setLabelText] = useState('');
  const [isLoadingLogos, setIsLoadingLogos] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScale = () => {
      const availableWidth = window.innerWidth;
      const availableHeight = window.innerHeight;
      const scaleWidth = availableWidth / layoutWidth;
      const scaleHeight = availableHeight / layoutHeight;
      setScale(Math.max(Math.min(scaleWidth, scaleHeight, 1), 0.2)); // min scale 0.2
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handleBoxClick = (index: number) => {
    setCurrentBoxIndex(index);
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && currentBoxIndex !== null) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          const newBoxes = [...boxes];
          newBoxes[currentBoxIndex] = {
            ...newBoxes[currentBoxIndex],
            image: typeof e.target?.result === 'string' ? e.target.result : undefined,
            imageSize: {
              width: img.width,
              height: img.height
            }
          };
          setBoxes(newBoxes);
        };
        img.src = typeof e.target?.result === 'string' ? e.target.result : '';
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentBoxIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentBoxIndex(index);
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          const newBoxes = [...boxes];
          newBoxes[index] = {
            ...newBoxes[index],
            image: typeof e.target?.result === 'string' ? e.target.result : undefined,
            imageSize: {
              width: img.width,
              height: img.height
            }
          };
          setBoxes(newBoxes);
        };
        img.src = typeof e.target?.result === 'string' ? e.target.result : '';
      };
      reader.readAsDataURL(imageFile);
    }
  };

  // Capture functionality
  const handleCaptureImage = async () => {
    if (layoutRef.current) {
      setIsCapturing(true);
      try {
        // Hide controls and add white border for capture
        const controlsOverlay = layoutRef.current.querySelector('.controls-overlay');
        const boxEls = layoutRef.current.querySelectorAll('.box-border');
        const imageSizeInfo = layoutRef.current.querySelectorAll('.image-size-info');
        
        if (controlsOverlay) {
          (controlsOverlay as HTMLElement).style.display = 'none';
        }
        
        boxEls.forEach((box: Element) => {
          (box as HTMLElement).style.border = 'none';
        });

        imageSizeInfo.forEach((info: Element) => {
          (info as HTMLElement).style.display = 'none';
        });

        const html2canvas = (await import('html2canvas')).default;
        const canvas = await html2canvas(layoutRef.current, {
          scale: 1,
          backgroundColor: backgroundColor,
          width: layoutWidth,
          height: layoutHeight,
          logging: false,
          windowWidth: layoutWidth,
          windowHeight: layoutHeight,
          x: 0,
          y: 0,
          useCORS: true,
          allowTaint: true,
          onclone: (clonedDoc) => {
            const clonedElement = clonedDoc.querySelector('[data-layout-ref]') as HTMLElement;
            if (clonedElement) {
              clonedElement.style.transform = 'none';
              clonedElement.style.width = layoutWidth + 'px';
              clonedElement.style.height = layoutHeight + 'px';
              clonedElement.style.border = '5px solid white';
            }
          }
        });

        // Restore controls and borders
        if (controlsOverlay) {
          (controlsOverlay as HTMLElement).style.display = 'flex';
        }
        boxEls.forEach((box: Element) => {
          (box as HTMLElement).style.border = '';
        });
        imageSizeInfo.forEach((info: Element) => {
          (info as HTMLElement).style.display = '';
        });

        // Download with prefixed filename
        const link = document.createElement('a');
        const fileName = labelText ? `DM_Approval_${labelText}` : 'DM_Approval_layout';
        link.download = `${fileName}.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 0.9);
        link.click();
      } catch (error) {
        console.error('Error capturing image:', error);
      } finally {
        setIsCapturing(false);
      }
    }
  };

  // Date display
  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateAspectRatio = (width: number, height: number): string => {
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(width, height);
    return `${width / divisor}:${height / divisor}`;
  };

  const aspectRatioDecimal = (width: number, height: number): number => {
    return width / height;
  };

  const aspectRatioMatches = (w1: number, h1: number, w2: number, h2: number, tolerance = 0.01): boolean => {
    const r1 = aspectRatioDecimal(w1, h1);
    const r2 = aspectRatioDecimal(w2, h2);
    return Math.abs(r1 - r2) <= tolerance;
  };

  // Load Dubai Logos function - loads specific images to specific boxes
  const handleLoadDubaiLogos = async () => {
    setIsLoadingLogos(true);
    try {
      // Map images to specific boxes:
      // Box 1 (index 0) → 640x360 01.jpg
      // Box 2 (index 1) → 1280x720.jpg
      // Box 3 (index 2) → 800x180 01.jpg
      const imageMapping = [
        { boxIndex: 0, imagePath: '/images/640x360 01.jpg' }, // Box 1
        { boxIndex: 1, imagePath: '/images/1280x720.jpg' },   // Box 2
        { boxIndex: 2, imagePath: '/images/800x180 01.jpg' }  // Box 3
      ];

      const newBoxes = [...boxes];
      
      // Load all images in parallel
      const loadPromises = imageMapping.map(async ({ boxIndex, imagePath }) => {
        try {
          const img = new window.Image();
          img.crossOrigin = 'anonymous';
          
          await new Promise<void>((resolve, reject) => {
            img.onload = () => {
              const canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.drawImage(img, 0, 0);
                const imageData = canvas.toDataURL('image/jpeg');
                newBoxes[boxIndex] = {
                  ...newBoxes[boxIndex],
                  image: imageData,
                  imageSize: {
                    width: img.width,
                    height: img.height
                  }
                };
                resolve();
              } else {
                reject(new Error('Canvas context not available'));
              }
            };
            img.onerror = () => reject(new Error(`Failed to load image: ${imagePath}`));
            img.src = imagePath;
          });
        } catch (error) {
          console.error(`Error loading logo for Box ${boxIndex + 1}:`, error);
        }
      });
      
      await Promise.all(loadPromises);
      setBoxes(newBoxes);
    } finally {
      setIsLoadingLogos(false);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: backgroundColor,
        position: 'relative'
      }}
    >
      <div
        ref={layoutRef}
        data-layout-ref
        style={{
          width: layoutWidth,
          height: layoutHeight,
          position: 'relative',
          margin: '0 auto',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          overflow: 'hidden',
        }}
      >
        {/* Label Text and Date */}
        <div style={{ position: 'absolute', left: 228, top: 150, zIndex: 10 }}>
          {labelText && (
            <div style={{
              fontSize: 20,
              background: '#fff',
              border: '1px solid #ccc',
              padding: '1px 1px',
              paddingBottom: '20px',
              marginBottom: 8
            }}>
              {labelText}
            </div>
          )}
          <div style={{ fontSize: 20, fontFamily: 'Arial', fontWeight: 600, color: '#fff' }}>
            {getCurrentDate()}
          </div>
        </div>

        {/* Boxes */}
        {boxes.map((box, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <div
              className="box-border group"
              style={{
                position: 'absolute',
                width: box.width,
                height: box.height,
                left: box.left,
                top: box.top,
                background: '#fff',
                border: '2px solid #ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out',
              }}
              onClick={() => handleBoxClick(index)}
              onDragEnter={e => handleDragEnter(e, index)}
              onDragOver={handleDragOver}
              onDrop={e => handleDrop(e, index)}
            >
              {box.image ? (
                <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={box.image}
                    alt={`Box ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/0 group-hover:from-black/30 group-hover:via-black/20 group-hover:to-black/30 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 px-4 py-2 rounded-lg shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-gray-800 font-semibold">Click to Change</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="text-center text-gray-500 group-hover:text-gray-700 transition-colors duration-300 w-full">
                    <div className="font-bold text-base mb-2" style={{marginTop: 8}}>
                      Box {index + 1}
                    </div>
                    <div className="font-bold text-2xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                      Drag & Drop
                    </div>
                    <div className="text-lg transform group-hover:scale-105 transition-transform duration-300">
                      or Click to Import
                    </div>
                    <div className="text-sm mt-4 transform group-hover:scale-105 transition-transform duration-300">
                      [Placeholder]
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-blue-500/5 group-hover:to-blue-500/10 transition-all duration-300" />
                </div>
              )}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-300" />
            </div>
            {/* Size Information */}
            <div
              className="image-size-info"
              style={{
                position: 'absolute',
                left: box.left,
                top: box.top + box.height + 5,
                fontSize: 12,
                color: '#666',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                padding: '2px 6px',
                borderRadius: 4,
                zIndex: 5,
                transition: 'all 0.3s ease-in-out'
              }}
            >
              <div style={{ marginBottom: 2 }}>
                Screen Size: {box.width}x{box.height}px - Screen Aspect Ratio: {calculateAspectRatio(box.width, box.height)}
              </div>
              <div>
                Image Size: {box.imageSize ? `${box.imageSize.width}x${box.imageSize.height}px - Image Aspect Ratio: ${calculateAspectRatio(box.imageSize.width, box.imageSize.height)}` : 'N/A - Image Aspect Ratio: N/A'}
              </div>
              {box.imageSize && (box.imageSize.width !== box.width || box.imageSize.height !== box.height) ? (
                <div style={{ color: '#ff4444', marginTop: 2 }}>
                  ⚠️ Image size doesn't match screen size
                  {aspectRatioMatches(box.imageSize.width, box.imageSize.height, box.width, box.height) ? (
                    <span style={{ color: '#00aa00', marginLeft: 4 }}>✓ Aspect ratio matches</span>
                  ) : (
                    <span style={{ color: '#ff4444', marginLeft: 4 }}>⚠️ Aspect ratio doesn't match</span>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        ))}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        {/* Controls Overlayed at Bottom Right - Compact Size */}
        <div
          className="controls-overlay"
          style={{ 
            position: 'absolute', 
            right: 10, 
            bottom: 140,
            zIndex: 20, 
            background: 'rgba(30, 41, 59, 0.95)', 
            borderRadius: 16, 
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)', 
            padding: '16px 20px', 
            display: 'flex', 
            flexDirection: 'column',
            gap: 12, 
            width: '500px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          {/* Promo Title */}
          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <label htmlFor="labelText" style={{ fontSize: 13, marginBottom: 6, color: '#ffffff', fontWeight: 600, letterSpacing: '0.5px' }}>
              Promo Title:
            </label>
            <input
              id="labelText"
              type="text"
              value={labelText}
              onChange={e => setLabelText(e.target.value)}
              placeholder="Enter promo title"
              title="Enter the Promo title"
              style={{ 
                padding: '8px 12px', 
                border: '1px solid rgba(255,255,255,0.2)', 
                borderRadius: 8, 
                fontSize: 14,
                background: 'rgba(255,255,255,0.1)',
                color: '#ffffff',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.border = '1px solid rgba(59, 130, 246, 0.5)';
                e.target.style.background = 'rgba(255,255,255,0.15)';
              }}
              onBlur={(e) => {
                e.target.style.border = '1px solid rgba(255,255,255,0.2)';
                e.target.style.background = 'rgba(255,255,255,0.1)';
              }}
            />
          </div>
          
          {/* BG Color and Load Dubai Logos in same row */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
            {/* Background Color */}
            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <label htmlFor="backgroundColor" style={{ fontSize: 13, marginBottom: 6, color: '#ffffff', fontWeight: 600, letterSpacing: '0.5px' }}>
                BG Color:
              </label>
              <input
                id="backgroundColor"
                type="color"
                value={backgroundColor}
                onChange={e => setBackgroundColor(e.target.value)}
                title="Select the background color for the entire layout"
                style={{ 
                  width: 44, 
                  height: 44, 
                  borderRadius: 8, 
                  cursor: 'pointer',
                  border: '2px solid rgba(255,255,255,0.2)',
                  background: 'transparent'
                }}
              />
            </div>
            
            {/* Load Dubai Logos button with preview */}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <button
                onClick={handleLoadDubaiLogos}
                disabled={isLoadingLogos}
                title="Load Dubai logos into all boxes"
                style={{ 
                  padding: '10px 16px', 
                  background: isLoadingLogos ? '#9ca3af' : '#3b82f6', 
                  color: '#ffffff', 
                  borderRadius: 8, 
                  border: 'none', 
                  fontWeight: 600, 
                  fontSize: 14, 
                  cursor: isLoadingLogos ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
                  width: '100%',
                  opacity: isLoadingLogos ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isLoadingLogos) {
                    e.currentTarget.style.background = '#2563eb';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoadingLogos) {
                    e.currentTarget.style.background = '#3b82f6';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.3)';
                  }
                }}
              >
                {isLoadingLogos ? (
                  <>
                    <svg className="animate-spin" width={18} height={18} fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </>
                ) : (
                  <>
                    <svg width={18} height={18} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Load Logos
                  </>
                )}
              </button>
            </div>
            
            {/* Preview image */}
            <div 
              style={{
                width: 100,
                height: 43,
                borderRadius: 8,
                overflow: 'hidden',
                border: '2px solid rgba(255,255,255,0.2)',
                flexShrink: 0
              }}
              title="Dubai Logo Preview"
            >
              <Image
                src="/images/640x360 01.jpg"
                alt="Dubai Logo Preview"
                width={100}
                height={50}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
          </div>
          
          {/* Capture Image button */}
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <button
              onClick={handleCaptureImage}
              disabled={isCapturing}
              title="Capture the current layout as a JPG image"
              style={{ 
                padding: '10px 20px', 
                background: isCapturing ? '#9ca3af' : '#3b82f6', 
                color: '#ffffff', 
                borderRadius: 8, 
                border: 'none', 
                fontWeight: 600, 
                fontSize: 14, 
                cursor: isCapturing ? 'not-allowed' : 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: 8,
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
                width: '100%',
                opacity: isCapturing ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!isCapturing) {
                  e.currentTarget.style.background = '#2563eb';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isCapturing) {
                  e.currentTarget.style.background = '#3b82f6';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.3)';
                }
              }}
            >
              {isCapturing ? (
                <>
                  <svg className="animate-spin" width={16} height={16} fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Capturing...
                </>
              ) : (
                <>
                  <svg width={16} height={16} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Capture Image
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 