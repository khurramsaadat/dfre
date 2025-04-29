'use client';

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import styles from './DesignStudioCanvas.module.css';

interface Box {
  width: number;
  height: number;
  left: number;
  top: number;
  image?: string;
  imageSize?: { width: number; height: number };
}

const boxesConfig: Box[] = [
  { width: 1280, height: 720, left: 0, top: 0 },
  { width: 640, height: 360, left: 1280, top: 0 },
  { width: 800, height: 180, left: 0, top: 720 }
];

export default function DesignStudioCanvas() {
  // Calculate initial position to be at lower right corner of BOX3
  const box3 = boxesConfig[2]; // The third box
  const textWidth = 350; // Increased width to accommodate more characters
  const textHeight = 40; // Single line height for text input
  const initialX = box3.left + box3.width - textWidth - 0; // 0px margin from right edge
  const initialY = box3.top + box3.height - textHeight - 10; // 10px margin from bottom

  const [boxes, setBoxes] = useState<Box[]>(boxesConfig.map(box => ({ ...box })));
  const [currentBoxIndex, setCurrentBoxIndex] = useState<number | null>(null);
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [inputText, setInputText] = useState('');
  const [textPosition, setTextPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

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

  const calculateAspectRatio = (width: number, height: number): string => {
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(width, height);
    return `${width / divisor}:${height / divisor}`;
  };

  const handleCapture = async () => {
    if (!canvasRef.current) return;

    const boxEls = canvasRef.current.querySelectorAll('.box-border');
    const imageSizeInfo = canvasRef.current.querySelectorAll('.image-size-info');
    
    // Hide elements before capture
    boxEls.forEach((box: Element) => {
      (box as HTMLElement).style.border = 'none';
    });
    imageSizeInfo.forEach((info: Element) => {
      (info as HTMLElement).style.display = 'none';
    });

    try {
      const canvas = await html2canvas(canvasRef.current, {
        scale: 1,
        backgroundColor: '#000000',
        width: 1920,
        height: 900,
        logging: false,
        useCORS: true,
        allowTaint: true,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector('[data-ref="canvas"]') as HTMLElement;
          if (clonedElement) {
            clonedElement.style.transform = 'none';
            clonedElement.style.width = '1920px';
            clonedElement.style.height = '900px';
          }
        }
      });
      
      // Restore elements after capture
      boxEls.forEach((box: Element) => {
        (box as HTMLElement).style.border = '';
      });
      imageSizeInfo.forEach((info: Element) => {
        (info as HTMLElement).style.display = '';
      });

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/jpeg', 1.0);
      link.download = `DesignStudio_${inputText || Date.now()}.jpg`;
      link.click();
    } catch (error) {
      console.error('Error capturing canvas:', error);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && canvasRef.current && textRef.current) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const scale = canvasRect.width / 1920;
      
      const newX = (e.clientX - canvasRect.left - dragOffset.x * scale) / scale;
      const newY = (e.clientY - canvasRect.top - dragOffset.y * scale) / scale;

      const maxX = 1920 - textWidth; // Updated to use new textWidth
      const maxY = 900 - textHeight;  // Updated to use new textHeight
      
      setTextPosition({
        x: Math.max(0, Math.min(maxX, newX)),
        y: Math.max(0, Math.min(maxY, newY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add mouseup event listener to window to handle cases where mouse is released outside the canvas
  if (typeof window !== 'undefined') {
    window.addEventListener('mouseup', handleMouseUp);
  }

  return (
    <div className={styles.container}>
      <div ref={canvasRef} className={styles.canvas} data-ref="canvas" onMouseMove={handleMouseMove}>
        {boxes.map((box, index) => (
          <div
            key={index}
            className={`${styles.droppable} box-border`}
            style={{
              width: `${box.width}px`,
              height: `${box.height}px`,
              left: `${box.left}px`,
              top: `${box.top}px`
            }}
            onClick={() => handleBoxClick(index)}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            {box.image ? (
              <img
                src={box.image}
                alt={`Box ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div className={styles.placeholder}>
                <div className={styles.placeholderContent}>
                  <div>Box {index + 1}</div>
                  <div>Drag & Drop</div>
                  <div>or Click to Import</div>
                  <div className={styles.placeholderSize}>
                    [{box.width} x {box.height}]
                  </div>
                  <div className={styles.placeholderRatio}>
                    {calculateAspectRatio(box.width, box.height)}
                  </div>
                </div>
              </div>
            )}
            {box.imageSize && (
              <div className={`${styles.imageSizeInfo} image-size-info`}>
                {box.imageSize.width} x {box.imageSize.height}
              </div>
            )}
          </div>
        ))}
        <div 
          ref={textRef}
          id="editableText"
          className={styles.editableText} 
          contentEditable
          suppressContentEditableWarning
          style={{ 
            color: textColor,
            left: `${textPosition.x}px`,
            top: `${textPosition.y}px`,
            cursor: isDragging ? 'grabbing' : 'grab',
            textAlign: 'right',
            width: `${textWidth}px`,
            height: `${textHeight}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
          onMouseDown={handleMouseDown}
        />
      </div>

      <div className={styles.controls}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="DS Image Name"
          className={styles.textInput}
        />
        <input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          className={styles.colorPicker}
        />
        <span style={{ color: '#333', fontSize: 14 }}>Text Color</span>
        <button onClick={handleCapture} className={styles.button}>
          <svg width={16} height={16} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Capture Image
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
} 