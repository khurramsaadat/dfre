'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import html2canvas from 'html2canvas';

// Add helper function to determine if background is dark
const isBackgroundDark = (hexColor: string): boolean => {
  // Remove the # if present
  const color = hexColor.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  
  // Calculate relative luminance
  // Using the formula: (0.299*R + 0.587*G + 0.114*B)
  const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return true if the background is dark (brightness < 0.5)
  return brightness < 0.5;
};

interface Box {
  width: number;
  height: number;
  left: number;
  top: number;
  image?: string;
}

const DMBoxLayout = () => {
  const [boxes, setBoxes] = useState<Box[]>([
    { width: 640, height: 360, left: 868, top: 139 },
    { width: 1280, height: 720, left: 228, top: 593 },
    { width: 800, height: 180, left: 228, top: 1413 },
    { width: 640, height: 360, left: 1601, top: 139 },
    { width: 1280, height: 720, left: 1601, top: 593 },
    { width: 800, height: 180, left: 2081, top: 1413 }
  ]);

  const [currentBoxIndex, setCurrentBoxIndex] = useState<number | null>(null);
  const [labelText, setLabelText] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const [backgroundColor, setBackgroundColor] = useState('#000000');

  // Responsive scale calculation based on viewport
  const layoutWidth = 3105;
  const layoutHeight = 1734;
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const availableWidth = window.innerWidth;
      const availableHeight = window.innerHeight;
      const scaleWidth = availableWidth / layoutWidth;
      const scaleHeight = availableHeight / layoutHeight;
      setScale(Math.min(scaleWidth, scaleHeight, 1)); // Never upscale above 1
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
          image: e.target?.result as string
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
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setCurrentBoxIndex(index);

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newBoxes = [...boxes];
        newBoxes[index] = {
          ...newBoxes[index],
          image: e.target?.result as string
        };
        setBoxes(newBoxes);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleCaptureImage = async () => {
    if (layoutRef.current) {
      // Hide any elements you don't want in the capture
      const boxes = layoutRef.current.querySelectorAll('.box-border');
      boxes.forEach((box: Element) => {
        (box as HTMLElement).style.border = 'none';
      });

      try {
        const canvas = await html2canvas(layoutRef.current, {
          scale: 1,
          backgroundColor: backgroundColor,
          width: 3105,
          height: 1734,
          logging: false,
          windowWidth: 3105,
          windowHeight: 1734,
          x: 0,
          y: 0,
          useCORS: true,
          allowTaint: true,
          onclone: (clonedDoc) => {
            const clonedElement = clonedDoc.querySelector('[data-layout-ref]') as HTMLElement;
            if (clonedElement) {
              clonedElement.style.transform = 'none';
              clonedElement.style.width = '3105px';
              clonedElement.style.height = '1734px';
            }
          }
        });

        // Restore borders
        boxes.forEach((box: Element) => {
          (box as HTMLElement).style.border = '';
        });

        // Create download link
        const link = document.createElement('a');
        link.download = `DM_Approval_${labelText || 'layout'}.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 0.9);
        link.click();
      } catch (error) {
        console.error('Error capturing image:', error);
      }
    }
  };

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
    <div className="flex justify-center items-center w-screen h-screen bg-transparent">
      <div
        ref={layoutRef}
        data-layout-ref
        className={`relative border-[5px] ${isBackgroundDark(backgroundColor) ? 'border-white' : 'border-black'}`}
        style={{
          width: layoutWidth,
          height: layoutHeight,
          backgroundColor,
          transform: `scale(${scale})`,
          transformOrigin: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Date Display */}
        <div className={`absolute top-8 left-12 text-xl font-arial font-semibold ${
          isBackgroundDark(backgroundColor) ? 'text-white' : 'text-black'
        }`}>
          {getCurrentDate()}
        </div>

        {/* Text Label */}
        {labelText && (
          <div className="absolute left-[228px] top-[150px] text-2xl bg-white border border-gray-300 px-4 py-2 z-10">
            {labelText}
          </div>
        )}

        {/* Boxes */}
        {boxes.map((box, index) => (
          <div
            key={index}
            className={`absolute border-2 overflow-hidden transition-all duration-200 box-border ${
              !box.image ? 'cursor-pointer hover:border-primary border-dashed border-gray-400' : 'border-solid border-gray-400'
            } ${currentBoxIndex === index && isDragging ? 'border-primary border-solid bg-primary/10' : ''}`}
            style={{
              width: box.width + 'px',
              height: box.height + 'px',
              left: box.left + 'px',
              top: box.top + 'px',
            }}
            onClick={() => !box.image && handleBoxClick(index)}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            {box.image ? (
              <Image
                src={box.image}
                alt={`Box ${index + 1}`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-2xl text-gray-500 font-bold">
                <svg
                  className="w-12 h-12 mb-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Drag & Drop</span>
                <span className="text-base text-gray-400">or Click to Import</span>
              </div>
            )}
          </div>
        ))}

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />

        {/* Controls Overlayed at Bottom Center */}
        <div
          className="absolute left-1/2 bottom-8 -translate-x-1/2 z-20 bg-white/80 rounded-lg shadow-md px-6 py-3 flex items-center gap-4"
          style={{ width: 'fit-content' }}
        >
          <input
            type="text"
            value={labelText}
            onChange={(e) => setLabelText(e.target.value)}
            placeholder="Enter text here"
            className="px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            className="w-12 h-12 rounded cursor-pointer"
          />
          <span className="text-gray-700">Background Color</span>
          <button
            onClick={handleCaptureImage}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Capture Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default DMBoxLayout; 