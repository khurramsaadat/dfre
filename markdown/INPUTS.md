# User Inputs Log

_Log all user inputs here with timestamps (YYYY-MM-DD HH:mm) as per project rules._ 

2024-06-09  User input: save (after navbar icons, copy/share buttons, client fix, and error investigation)

2024-06-09  User input: Rename ds to design-studio, add Locations page and links in navbar/footer, embed Google Maps.

2024-06-09  [User]: Requested DFRE Schedule card on homepage to open /design-studio page (same as navbar/footer). Command: save 

2024-06-09:
- User requested to reduce navbar link size (desktop, match footer, icon too).
- User requested gap between navbar link and underline (desktop only, -8px).
- User requested icons in footer quick links (same as navbar, before text, all sizes).
- User requested underline in footer only on hover/active, like navbar.
- User requested underline under both icon and text in footer.
- User requested increased gap and shorter underline in footer.
- User requested footer quick links font size to match navbar (text-sm).
- User requested Playwright checks for font size consistency.
- User confirmed all changes and requested save.

2024-11-20:
- User requested Print PDF button on locations page for downloading PDF version of locations.
- Initial requirements: Multi-page PDF (separate PDF for each location), single button at top right, printer-friendly white background with modern UI/UX, embedded Google Maps iframes captured in PDF, filename format: location-name.pdf, title: "DFRE Pole Locations".
- User requested correction: ONE PDF with multiple pages (each location on separate page), text should be selectable for copy/paste, links and location maps should be clickable, additional improvements needed.
- User feedback on PDF improvements:
  - Add Page 1 as index/cover page with title "DFRE Pole Locations"
  - Keep location title (e.g., "Pole: Al Garhoud") on each location page
  - Remove "Generated: November 20, 2025 at 5:36:20 PM" timestamp from pages
  - Fix Location Map Preview not showing issue (second request - critical)
  - Remove strange characters (emoji) before "Click map to open in Google Maps"
  - User provided reference image showing expected map preview (satellite/hybrid view with streets and labels)
  - Implemented multiple fallback map services to ensure maps load reliably
  - User reported "Invalid Key" error for map preview - external APIs not working
  - Changed approach to create professional map placeholder instead of external API calls
  - User requested index page to be clickable (links to specific pages)
  - User requested to remove "Generated: November 20, 2025" from index page
  - User requested to remove emoji (📍) before "CLICK ANYWHERE TO VIEW INTERACTIVE MAP"
  - User provided new location order:
    1. Pole-1 Ittihad Road
    2. Pole-2 SZR Last Exit
    3. Pole-3 Airport Road
    4. Pole-4 MBZ Road
    5. Pole-5 Garhoud Road
    6. Pole-6 Al Ain Road
    7. Pole-7 Al Khail Road
  - User provided PNG map screenshot for Pole-5 Garhoud Road
  - User requested to use PNG images for map previews with size optimization for web
  - Implemented automatic PNG loading from public/images folder with compression
  - User replaced all PNG files with JPG files (all 7 poles)
  - User requested to use JPG images as-is without compression/resizing
  - Updated code to load JPG images at full quality without optimization
  - User requested more space above "Location Map Preview" title
  - User requested overall style and look & feel improvements for PDF pages
  - User pointed out emojis show as strange characters in PDF - remove ALL emojis
  - User requested outline/border for map preview images
  - User requested more space above "Decimal:" text (not too close to Coordinates box)
  - User requested dark grey text instead of blue colors
  - User requested layout and color improvements:
    - More space between "Pole-1" and "Table of Contents" (18mm instead of 16mm)
    - Move "Location Map Preview" text closer to image (6mm spacing instead of 8mm)
    - Remove separator line under "Location Map Preview"
    - Change Coordinates box and Table of Contents box to same colors as Google Maps Link box (warm orange background #FFF7ED, golden border #FBC02D)
    - Reorganize: Move Coordinates section AFTER map preview (Google Maps Link → Map Preview → Coordinates)
  - User reported overlap between Google Maps Link and Location Map Preview on location pages
  - Fixed spacing: Increased gap from 10mm to 26mm after Google Maps box to prevent overlap
  - User requested more space above "Location Map Preview" text
  - Increased spacing from 26mm to 30mm (20mm box + 10mm gap)
  - User requested to push all code to GitHub repo

2024-11-20:
- User requested changes to dm6assets page:
  - Replace "Promo Path" input field with a button called "Load Dubai Logos"
  - Remove "DMS Link" input field and its label
  - Implemented "Load Dubai Logos" button that loads Dubai Municipality logo images into all boxes
  - User requested to remove "Promo Schedule" input field and its label
  - User requested to remove "Save PDF" button and all PDF-related code
  - Removed jsPDF import and all PDF generation functionality
  - Removed promo details display section from layout
- User requested UI/UX improvements for dm6assets panel:
  - Buttons to be blue and text to be white
  - Improved panel styling with dark background
  - Enhanced button hover effects and transitions
  - Updated "Load Dubai Logos" button to load specific images:
    - "640x360 01.jpg" → Box 1 and Box 4
    - "800x180 01.jpg" → Box 3 and Box 6
    - "1280x720.jpg" → Box 2 and Box 5
- User requested additional improvements:
  - Add tooltips to all controls in dm6assets panel
  - Show small preview image of Dubai logo next to "Load Dubai Logos" button
  - Implement similar controls for dm3assets page with same styling and functionality
- User requested to update all dependencies to latest versions
  - Updated Next.js from 14.1.0 to 15.5.11
  - Updated React from 18.2.0 to 19.2.4
  - Updated React-DOM from 18.2.0 to 19.2.4
  - Updated TypeScript from 5.3.3 to 5.8.3
  - Updated jsPDF from 3.0.1 to 4.1.0
  - Updated all other dependencies to latest versions
  - Build successful with all updated dependencies
  - User corrected: Next.js 15.5.11 is not the latest version
  - Updated to Next.js 16.1.6 (latest stable version)
  - Updated eslint-config-next to match Next.js 16.1.6

2025-05-22 11:09:
- User requested new "Check" page for comparing old and new artworks side by side
  - Two drop zones (1280x720) for English and Arabic artworks
  - Load old artworks, then load new artworks, toggle to see differences
  - User said NO to multiple comparison modes (slider, difference, overlay)
  - User said YES to page name "Artwork QC" with EyeIcon
  - User said YES to Reset/Clear button for each panel
  - User said YES to toggle speed fast = 200ms
  - Place link before Locations in navbar

2025-05-22 11:30:
- User feedback on Artwork QC page:
  - Drop zone should be white color like dm6assets page
  - Clicking the drop zone should open file browser
  - 1280x720 dimension text should move below the drop zone box (was hiding artwork)
  - Compare toggle speed changed from 200ms to 500ms
  - OLD/NEW badges moved from upper right corner to outside/below the drop zone
  - "Old loaded" and "New loaded" status should be directly under OLD and NEW buttons
  - Rename button "Old" to "Old Artwork" and "New" to "New Artwork"
  - Rename DOCS folder to markdown folder
  - Make all markdown files and keep them updated
  - Test with MCP playwright server
  - Push all code to repo

2026-06-10 14:29:
- User requested Resolution Mismatch Report feature for dm6assets and dm3assets pages
  - Feature to share with clients showing image resolution mismatches
  - Should include thumbnails, filenames, resolution received vs required resolution
  - User selected: Only show mismatched images (not all images)
  - User selected: Download as PDF report
  - User selected: Show as a new section below the layout
  - User selected: Branded report with 'Layout Factory' header, promo title and date

2026-06-10 14:52:
- User requested improvements to Resolution Report:
  - Remove the mismatch/status column
  - Remove "LAYOUT FACTORY" main title from header
  - Remove page name "DM 6 Assets" / "DM 3 Assets"
  - No brown color in header
  - Reduce filename so it's not clipped (truncate with extension preserved)
  - Remove Box 1, Box 2 references (client doesn't know about it)
  - Thumbnails should maintain original aspect ratio (proportional scaling)
  - Received resolution text should be red
  - Add image specifications (High Quality JPG/PNG, 72 DPI, sRGB)
  - Improve overall design to look premium (researched best practices)

2026-06-10 15:09:
- User requested further improvements to Resolution Report:
  - Move Required/Received columns to the right, give more space to Filename
  - Remove aspect ratio under resolutions
  - Rearrange header info into compact single line
  - Add "Please revise the images and resubmit" prominently in report
  - Make report compact to fit on one A4 landscape page when printed

2026-06-10 15:24:
- User requested:
  - Make thumbnails a bit bigger and keep the same width for all thumbnails
  - Remove the text "sRGB Color Profile" from specs
  - Provide 10 suggestions for improving the report
- User selected 5 of 10 suggestions to implement:
  - s4: Add 'px' unit label to resolution values for clarity
  - s5: Group table rows by required resolution type
  - s6: Show total image count vs mismatch count (e.g. "4 of 6")
  - s7: Add a red X status column for quick visual scanning
  - s8: Print-friendly light theme toggle (white background for browser printing)

2026-06-10 15:41:
- User requested 4 changes to Resolution Report:
  - Fix thumbnails: scale down with both x and y constraints (fixed 100x56px container)
  - Remove red X status column
  - Remove blue group header rows (resolution grouping)
  - Add "Resolution" subtitle under REQUIRED and RECEIVED column headers

2026-06-10 15:48:
- User requested:
  - Rename "PREVIEW" column header to "Artworks" (UI + PDF)
  - Light theme background colors too light for printout - strengthened all print-mode colors

2026-06-10 16:05:
- User requested 4 PDF changes:
  - Remove black line on top edge of paper (accent line)
  - Column header titles bigger, black text, blue background (#DBEAFE)
  - Specs box same blue background as column headers
  - "Please revise the sizes and resubmit" moved above footer line, changed from red to black

2026-07-02 10:04:
- User reported PDF file size too large (23MB for small thumbnails)
  - Root cause: full-resolution images embedded as-is (e.g. 2667x1500px)
  - Fix: downscale all thumbnails to 300px wide at 65% JPEG quality before embedding
  - Expected PDF size reduction from ~23MB to under 500KB