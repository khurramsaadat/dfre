"use client";
import React, { useState } from "react";
import { ClipboardIcon, ShareIcon } from '@heroicons/react/24/outline';

const locations = [
  {
    name: "Pole: Al Garhoud",
    decimal: "25.22642724595015, 55.330701499517694",
    dms: "25°13'35.1\"N 55°19'50.5\"E",
    short: "25.226417, 55.330694",
    map: "https://www.google.com/maps?q=25.22642724595015,55.330701499517694&z=17&hl=en"
  },
  {
    name: "Pole: Ittihad Road",
    decimal: "25.283739107708772, 55.357997330812836",
    dms: "25°17'01.5\"N 55°21'28.8\"E",
    short: "25.283750, 55.358000",
    map: "https://www.google.com/maps?q=25.283739107708772,55.357997330812836&z=17&hl=en"
  },
  {
    name: "Pole: MBZR",
    decimal: "25.261671709782203, 55.408521021044955",
    dms: "25°15'42.0\"N 55°24'30.7\"E",
    short: "25.261667, 55.408528",
    map: "https://www.google.com/maps?q=25.261671709782203,55.408521021044955&z=17&hl=en"
  },
  {
    name: "Pole: SZR Last Exit",
    decimal: "24.903459919850114, 54.94664253313848",
    dms: "24°54'12.5\"N 54°56'47.9\"E",
    short: "24.903472, 54.946639",
    map: "https://www.google.com/maps?q=24.903459919850114,54.94664253313848&z=17&hl=en"
  },
  {
    name: "Pole: Airport Road",
    decimal: "25.242637467051395, 55.36193533759589",
    dms: "25°14'33.5\"N 55°21'43.0\"E",
    short: "25.242637, 55.361935",
    map: "https://www.google.com/maps?q=25.242637467051395,55.36193533759589&z=17&hl=en"
  },
  {
    name: "Pole: Al Khail",
    decimal: "25.215885162353516,55.32541275024414",
    dms: null,
    short: null,
    map: "https://www.google.com/maps?q=25.215885162353516,55.32541275024414&z=17&hl=en"
  },
  {
    name: "Pole: Al Ain",
    decimal: "25.165353775024414,55.32902526855469",
    dms: null,
    short: null,
    map: "https://www.google.com/maps?q=25.165353775024414,55.32902526855469&z=17&hl=en"
  }
];

export default function Locations() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const handleCopy = (loc: typeof locations[0], idx: number) => {
    const text = `${loc.name}\nDecimal: ${loc.decimal}${loc.dms ? `\nDMS: ${loc.dms}` : ''}\nGoogle Maps: ${loc.map}`;
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };
  const handleShare = (loc: typeof locations[0]) => {
    const text = `${loc.name}\nDecimal: ${loc.decimal}${loc.dms ? `\nDMS: ${loc.dms}` : ''}\nGoogle Maps: ${loc.map}`;
    if (navigator.share) {
      navigator.share({ title: loc.name, text, url: loc.map });
    } else {
      alert('Sharing is not supported on this device.');
    }
  };
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_center,_#ef4444,_#fb923c,_#fde047)] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-orange-900 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">Locations</h1>
        <div className="grid gap-8 md:grid-cols-2">
          {locations.map((loc, idx) => (
            <div key={idx} className="w-full bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{loc.name}</h2>
                <div className="text-gray-700 text-xs mb-1">
                  <span className="font-medium">Decimal:</span> {loc.decimal}
                </div>
                {loc.dms && (
                  <div className="text-gray-700 text-xs mb-1">
                    <span className="font-medium">DMS:</span> {loc.dms}
                  </div>
                )}
                {loc.short && (
                  <div className="text-gray-700 text-xs mb-1">
                    <span className="font-medium">Short:</span> {loc.short}
                  </div>
                )}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleCopy(loc, idx)}
                    className="flex items-center gap-1 px-3 py-1 bg-orange-900 text-white rounded font-bold shadow hover:bg-orange-800 transition text-xs"
                    title="Copy coordinates and link"
                  >
                    <ClipboardIcon className="w-4 h-4" />
                    {copiedIdx === idx ? 'Copied!' : 'Copy'}
                  </button>
                  <button
                    onClick={() => handleShare(loc)}
                    className="flex items-center gap-1 px-3 py-1 bg-orange-900 text-white rounded font-bold shadow hover:bg-orange-800 transition text-xs"
                    title="Share location"
                  >
                    <ShareIcon className="w-4 h-4" />
                    Share
                  </button>
                </div>
                <a
                  href={loc.map}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-4 py-2 bg-orange-900 text-white rounded font-bold shadow hover:bg-orange-800 transition text-sm"
                >
                  Open in Google Maps
                </a>
              </div>
              <div className="w-full md:w-64 h-48 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <iframe
                  title={loc.name}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(loc.decimal)}&z=15&output=embed`}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 