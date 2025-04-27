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
  { width: 640, height: 360, left: 868, top: 139 },
  { width: 1280, height: 720, left: 228, top: 593 },
  { width: 800, height: 180, left: 228, top: 1413 },
  { width: 640, height: 360, left: 1601, top: 139 },
  { width: 1280, height: 720, left: 1601, top: 593 },
  { width: 800, height: 180, left: 2081, top: 1413 }
];

export default function DM6AssetsHeroLayout() {
  const layoutWidth = 3105;
  const layoutHeight = 1734;
  const [scale, setScale] = useState(1);
  const [boxes, setBoxes] = useState<Box[]>(boxesConfig.map(box => ({ ...box, image: undefined })));
  const [currentBoxIndex, setCurrentBoxIndex] = useState<number | null>(null);
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [labelText, setLabelText] = useState('');
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

      try {
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
        {/* Controls Overlayed at Bottom Center */}
        <div
          className="controls-overlay"
          style={{ position: 'absolute', left: '50%', bottom: 32, transform: 'translateX(-50%)', zIndex: 20, background: 'rgba(255,255,255,0.8)', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 16 }}
        >
          <input
            type="text"
            value={labelText}
            onChange={e => setLabelText(e.target.value)}
            placeholder="Enter text here"
            style={{ padding: '8px 16px', border: '1px solid #ccc', borderRadius: 8, fontSize: 16, marginRight: 8 }}
          />
          <input
            type="color"
            value={backgroundColor}
            onChange={e => setBackgroundColor(e.target.value)}
            style={{ width: 48, height: 48, borderRadius: 8, cursor: 'pointer', marginRight: 8 }}
          />
          <span style={{ color: '#333', fontSize: 16, marginRight: 8 }}>Background Color</span>
          <button
            onClick={handleCaptureImage}
            style={{ padding: '8px 24px', background: '#0070f3', color: '#fff', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <svg width={20} height={20} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Capture Image
          </button>
        </div>
      </div>
    </div>
  );
} 