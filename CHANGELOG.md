# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2024-04-25

### Added
- Initial project setup with Next.js and Tailwind CSS
- Created basic layout with Header, Hero, and Footer components
- Added three feature cards to the Hero section:
  - Dubai Municipality - 6 Assets
  - Dubai Municipality - 3 Assets
  - DFRE Schedule
- Created reusable FeatureCard component
- Added images for all cards
- Implemented responsive design for all components
- Created public/images directory for asset organization
- Added detailed page for Dubai Municipality - 6 Assets
- Implemented card navigation functionality
- Created DMBoxLayout component for image layout management
- Added interactive image upload functionality
- Implemented dynamic date display
- Added background color customization

### Changed
- Updated Hero section to include feature cards
- Modified layout to accommodate new components
- Added Dubai Municipality logo images for all cards
- Enhanced FeatureCard component with improved image handling and hover effects
- Corrected image path to use proper public/images directory structure
- Increased image container height and adjusted padding for better image display
- Updated card descriptions and content
- Replaced placeholder images with actual Dubai Municipality logos
- Added click interaction and navigation to the first card
- Enhanced card hover effects with smooth transitions
- Transformed Dubai Municipality 6 Assets page into an interactive layout tool

### Technical Details
- Used Next.js 14.1.0
- Implemented TypeScript for type safety
- Used Tailwind CSS for styling
- Created modular components for better maintainability
- Optimized image loading with Next.js Image component
- Implemented client-side navigation using Next.js router
- Added client-side image processing and layout management

## [0.1.1] - 2024-04-26

### Changed
- Updated the navigation for the first card on the home page to take the user to the DM6Assets page.
- Removed the unused page at `/dubai-municipality-6-assets`.
- Updated DM6Assets page to use DM6AssetsHeroLayout component for proper layout display.
- Updated Header and Footer components to use dark background color rgb(9,36,57).
- Improved text contrast in Header and Footer for better readability.
- Enhanced DM6AssetsHeroLayout:
  - Added white border around background in captured image
  - Moved date under input text
  - Improved control visibility during capture
  - Removed character limit for input text
  - Updated captured image filename to prefix with 'DM_Approval_'
  - Added interactive hover effects to boxes:
    - Scale transformation on hover
    - Blue glow effect
    - Subtle dark overlay for images
    - Smooth transitions for all effects
    - Enhanced overlay effects:
      - Gradient overlay for images
      - "Click to Change" tooltip for images
      - Subtle blue gradient for empty boxes
      - Increased glow intensity
      - Improved transition animations
- Simplified feature cards by removing assets list
- Updated card titles and descriptions for better clarity

### Fixed
- Corrected the component import in DM6Assets page to properly display the layout.
- Fixed type error in Hero component by adding proper TypeScript interface for hideButtons prop.
- Fixed text centering in DM6AssetsHeroLayout boxes
- Configured Git to handle line endings consistently across different operating systems

### Added
- Added Netlify deployment configuration with netlify.toml
- Added .gitattributes file for consistent line ending handling

### Current Folder Structure
```├── .next/
├── .git/
├── .cursor/
├── node_modules/
├── public/
│   └── images/
│       ├── 6-assets.png
│       └── DS-layout.png
├── src/
│   ├── app/
│   │   ├── dm6assets/
│   │   │   └── page.tsx
│   │   ├── DMBoxLayout-test/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── DM6AssetsHeroLayout.tsx
│       ├── DMBoxLayout.tsx
│       ├── FeatureCard.tsx
│       ├── Footer.tsx
│       ├── Header.tsx
│       └── Hero.tsx
├── CHANGELOG.md
├── DM 6 boxes.html
├── .gitignore
├── next-env.d.ts
├── netlify.toml
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

## [0.1.2] - 2024-04-26
### Added
- Image size warning feature in DM6Assets page
  - Shows warning when dropped image size doesn't match box dimensions
  - Displays required box size for reference
  - Warning appears below the image size display
  - Visual indicator with warning emoji and red text

### Changed
- Enhanced image size display in DM6Assets page
  - Added semi-transparent background for better visibility
  - Improved positioning and spacing
  - Added border radius for better aesthetics

## [0.1.3] - 2024-04-27
### Changed
- Updated first card on home page to use card1.jpg image.
- Reduced image padding to zero and set content padding to p-3 (then p-4) for FeatureCard on home page.
- Added sizes prop to Next.js Image component in FeatureCard to resolve warning and improve performance.
- Renamed About link in navbar to 'DM 6 Assets' and linked it to /dm6assets.

## Project Structure, Pages, and Components

### Pages
- **Home Page (`src/app/page.tsx`)**: Displays the main landing content, including the Hero section with feature cards for navigation to key tools and layouts.
- **DM 6 Assets Page (`src/app/dm6assets/page.tsx`)**: Hosts the DM6AssetsHeroLayout component, providing an interactive layout for uploading, previewing, and validating images for Dubai Municipality 6 Assets approval.
- **Root Layout (`src/app/layout.tsx`)**: Wraps all pages with the Header, Footer, and main content area, applying global styles and structure.

### Components
- **Header (`src/components/Header.tsx`)**: Navigation bar at the top of the site. Contains links to Home, DM 6 Assets, Services, and Contact. Usage: Included in the root layout for site-wide navigation.
- **Footer (`src/components/Footer.tsx`)**: Footer section with company info, quick links, contact details, and social media. Usage: Included in the root layout for site-wide consistency.
- **Hero (`src/components/Hero.tsx`)**: Main hero section on the home page, featuring a welcome message and a grid of FeatureCards for navigation. Usage: Used in the home page.
- **FeatureCard (`src/components/FeatureCard.tsx`)**: Reusable card component for displaying a feature with an image, title, and description. Used in the Hero section for navigation to tools/pages. Accepts props: title, description, imageUrl, href.
- **DM6AssetsHeroLayout (`src/components/DM6AssetsHeroLayout.tsx`)**: Advanced interactive layout for the DM 6 Assets page. Allows users to drag and drop images, see size/aspect ratio warnings, and capture the layout as a JPG. Usage: Used in the DM 6 Assets page.

## [0.1.4] - 2024-04-27

### Added
- Created DM 3 Assets page at /dm3assets by duplicating DM 6 Assets page for independent editing.

### Changed
- Updated navbar: 'Services' is now 'DM 3 Assets' and links to /dm3assets; 'Contact' is now 'Design Studio'.
- Improved footer social icons: now use official SVGs, consistent sizing, and color-invert hover effect.
- Added custom tooltips to all social icons in the footer, showing instantly with white text on a dark background.

### Notes
- DM 3 Assets and DM 6 Assets pages are now independent.
- Footer and navigation are visually and functionally improved for better UX.

## [0.1.5] - 2024-04-27

### Changed
- DM3Assets page layout width reduced to 2000px, boxes reduced to 3 and centered horizontally.
- Controls overlay in DM3Assets moved to bottom right corner.
- Home page card2 (DM - 3 Assets - Arabic only) now uses card2.jpg as its image.

## [0.1.6] - 2024-04-27

### Changed
- Updated burger menu styling:
  - Changed background to gradient (red-orange-yellow)
  - Updated menu links to white color with yellow hover effect
  - Centered menu links
  - Added semi-transparent white dividers
  - Applied matching gradient to burger menu lines
