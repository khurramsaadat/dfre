"use client";
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

type Box = {
  width: number;
  height: number;
  left: number;
  top: number;
  image?: string;
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
        const newBoxes = [...boxes];
        newBoxes[currentBoxIndex] = {
          ...newBoxes[currentBoxIndex],
          image: typeof e.target?.result === 'string' ? e.target.result : undefined
        };
        setBoxes(newBoxes);
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
        const newBoxes = [...boxes];
        newBoxes[index] = {
          ...newBoxes[index],
          image: typeof e.target?.result === 'string' ? e.target.result : undefined
        };
        setBoxes(newBoxes);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  // Capture functionality
  const handleCaptureImage = async () => {
    if (layoutRef.current) {
      // Hide borders for capture
      const boxEls = layoutRef.current.querySelectorAll('.box-border');
      boxEls.forEach((box: Element) => {
        (box as HTMLElement).style.border = 'none';
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
            }
          }
        });
        // Restore borders
        boxEls.forEach((box: Element) => {
          (box as HTMLElement).style.border = '';
        });
        // Download
        const link = document.createElement('a');
        link.download = `DM6Assets_${labelText || 'layout'}.jpg`;
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

  return (
    <div ref={containerRef} style={{ width: '100vw', height: '100vh', overflow: 'auto', background: backgroundColor, position: 'relative' }}>
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
        }}
      >
        {/* Date Display */}
        <div style={{ position: 'absolute', top: 32, left: 48, fontSize: 20, fontFamily: 'Arial', fontWeight: 600, color: '#fff', zIndex: 10 }}>
          {getCurrentDate()}
        </div>
        {/* Label Text */}
        {labelText && (
          <div style={{ position: 'absolute', left: 228, top: 150, fontSize: 24, background: '#fff', border: '1px solid #ccc', padding: '8px 16px', zIndex: 10 }}>
            {labelText}
          </div>
        )}
        {/* Boxes */}
        {boxes.map((box, index) => (
          <div
            key={index}
            className="box-border"
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
            }}
            onClick={() => handleBoxClick(index)}
            onDragEnter={e => handleDragEnter(e, index)}
            onDragOver={handleDragOver}
            onDrop={e => handleDrop(e, index)}
          >
            {box.image ? (
              <Image src={box.image} alt={`Box ${index + 1}`} fill style={{ objectFit: 'cover' }} />
            ) : (
              <div style={{ textAlign: 'center', color: '#888' }}>
                <div style={{ fontWeight: 'bold', fontSize: 18 }}>Drag & Drop</div>
                <div style={{ fontSize: 14 }}>or Click to Import</div>
                <div style={{ fontSize: 12, marginTop: 8 }}>[Placeholder]</div>
              </div>
            )}
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