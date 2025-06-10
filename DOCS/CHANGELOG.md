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
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   └── images/
│       ├── 6-assets.png
│       ├── card1.jpg
│       ├── card2.jpg
│       ├── DS-layout.png
│       └── facebook_icon.svg
├── src/
│   ├── app/
│   │   ├── dm6assets/
│   │   │   └── page.tsx
│   │   ├── dm3assets/
│   │   │   └── page.tsx
│   │   ├── ds/
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
│       ├── Hero.tsx
│       └── Typewriter.tsx
├── CHANGELOG.md
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
- Enhanced mobile menu design and animations:
  - Moved menu to top-right with rounded corners
  - Added slide-up animations for menu items
  - Added icons next to mobile menu links
  - Improved menu positioning and styling
  - Added staggered animations for better UX
- Improved mobile responsiveness:
  - Fixed alignment of "Layout Creation" text and typewriter effect
  - Added proper padding for mobile view
  - Ensured consistent left alignment in mobile view
  - Removed unnecessary margins in mobile layout

### Added
- New mobile menu features:
  - Rounded corners on both top and bottom left
  - Icons for each menu item
  - Smooth slide-up animations
  - Improved hover effects
  - Better spacing and visual hierarchy

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

## [0.1.7] - 2024-04-27

### Added
- Implemented social sharing functionality
  - Added OpenGraph and Twitter Card meta tags for better social sharing
  - Configured global sharing card using card1.jpg
  - Added Google Analytics tracking for share events
  - Added share tracking functionality
  - Implemented English-only metadata for sharing

### Technical Details
- Updated Next.js metadata configuration in layout.tsx with:
  - OpenGraph meta tags
  - Twitter Card meta tags
  - Share tracking scripts
  - Google Analytics integration
- Configured sharing card dimensions (1200x630)
- Added share event tracking through Google Analytics

### Configuration Changes
- Added metadataBase URL configuration
- Added social sharing meta tags
- Added Google Analytics tracking code
- Updated site title and description for sharing

## [0.1.8] - 2024-04-27

### Changed
- Removed Google Analytics integration
- Simplified share tracking to use console.log
- Updated TypeScript types to remove GA-related definitions

### Technical Details
- Removed Google Analytics script and measurement ID from layout.tsx
- Simplified share tracking function
- Removed unused type definitions from global.d.ts

## [0.1.9] - 2024-04-27

### Added
- Created ShareButton component for testing social sharing functionality
  - Added loading state handling
  - Implemented error handling
  - Added customizable styling through className prop
  - Added TypeScript types for props

### Technical Details
- Created new ShareButton.tsx component
- Added client-side functionality with 'use client' directive
- Implemented share handling with loading states
- Added error boundary for share failures

## [0.2.0] - 2024-04-27

### Removed
- Removed ShareButton component and related functionality
- Simplified sharing implementation to use native sharing only

## [0.2.1] - 2024-04-27

### Fixed
- Updated social sharing image path to use existing card1.jpg instead of non-existent social-share-card.jpg
- Fixed OpenGraph and Twitter Card image references

## [Latest Updates] - 2024-03-27

### Design System Page Updates
- Enhanced Box2 with full interactivity matching DM3Assets:
  - Added drag and drop functionality for images
  - Implemented image preview with proper sizing
  - Added hover effects and visual feedback
  - Included size information display and warnings
  - Added "Click to Change" tooltip
  - Implemented smooth transitions and animations
- Improved layout structure:
  - Removed scroll bars for cleaner appearance
  - Added overflow hidden to prevent unwanted scrolling
  - Fixed width containers for precise positioning
- Maintained basic page structure with:
  - White background
  - Container layout
  - Clean slate for new content

### Footer Improvements
- Added link to Design System page through footer logo
- Enhanced logo interaction with hover effects:
  - Smooth scale animation on hover
  - Text color transition
  - Improved visual feedback

### Navigation Improvements
- Added active link indication in desktop and mobile navigation:
  - Desktop: Active links show in white with permanent underline
  - Mobile: Active links have semi-transparent white background with rounded corners
  - Improved visual feedback for current page location
  - Added smooth transitions between active states
  - Implemented using Next.js usePathname hook for route tracking
- Extended active link indication to footer Quick Links:
  - Matching header navigation style
  - White text and permanent underline for active links
  - Gray text with hover effects for inactive links
  - Consistent visual feedback across all navigation elements

### DesignStudio Component Updates
- Adjusted editable text box positioning in Box3:
  - Increased text box width to 350px for more character space
  - Set fixed height to 40px for single-line text display
  - Positioned text box 10px up from bottom edge of Box3
  - Maintained right alignment with flex layout
  - Added white-space: nowrap and overflow handling for better text containment
  - Optimized padding (5px vertical, 15px horizontal)

### Enhanced
- Advertisement Number functionality
  - Refined default position in lower right corner of Box3
  - Optimized visual feedback:
    - Maintained subtle hover scale effect
    - Removed dragging scale transform
    - Enhanced position guide visibility
    - Improved border contrast
  - Added reset position button
  - Maintains position during image capture
- Footer improvements
  - Added clickable mailto link for email address
  - Added hover effect for better user feedback
  - Improved text styling and spacing

## [Unreleased]

### Enhanced
- Improved favicon implementation
  - Moved favicon files to root public directory for proper serving
  - Removed redundant manual link tags
  - Using Next.js metadata API exclusively for favicon configuration
  - Added shortcut icon and Apple touch icon support

### Added
- Added favicons and social media icons
  - Added favicon-16x16.png for small favicon
  - Added favicon-32x32.png for standard favicon
  - Added facebook_icon.svg for social media links
  - Improved site branding and social media integration
  - Properly linked favicons in HTML head and Next.js metadata

### Fixed
- Updated Design Studio navigation links
  - Changed desktop navigation link from `/designstudio` to `/ds`
  - Changed mobile navigation link from `/designstudio` to `/ds`
  - Updated active link highlighting for `/ds` route
  - Updated card3 link in homepage to point to `/ds`
- Completely removed background from Advertisement Number in captured JPG
  - Created separate display and capture versions of the Advertisement Number
  - Ensured absolutely no background or visual effects appear in the final image
  - Maintained normal interactive features during regular use

## [Unreleased] - 2024-06-09
### Changed
- Added icons to all navbar links (desktop and mobile).
- Added Copy and Share buttons to each location card on Locations page.
- Fixed Locations page to be a Client Component by adding 'use client' directive.
- Investigated '__Nc' error; determined it is not from project codebase but likely from a third-party script or browser extension.

## 2024-06-09
- Created DOCS folder and initialized PROGRESS.md, CHANGELOG.md, and INPUTS.md as per project rules.
- Baseline project directory structure:

```
dfre/
  public/
    images/
  src/
    app/
      dm3assets/
      dm6assets/
      ds/
    components/
    types/
    utils/
  CHANGELOG.md
  netlify.toml
  package-lock.json
  package.json
  postcss.config.js
  README.md
  tailwind.config.js
  tsconfig.json
``` 