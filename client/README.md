# 🎵 Clever Music Player - Client

The frontend application for Clever Music Player, built with React 19, TypeScript, and Vite. This is a Progressive Web App (PWA) that provides an intelligent music player interface with machine learning capabilities.

## ✨ Features

### 🎵 Music Player
- **Intelligent Playback**: Learns from your listening habits to improve recommendations
- **Skip Pattern Analysis**: Tracks which songs you skip to build a preference model
- **Volume Control**: Persistent volume settings with mute functionality
- **Keyboard Shortcuts**: Full keyboard navigation and media controls

### 📁 File Management
- **Local File Support**: Play music directly from your computer's file system
- **Folder Scanning**: Automatically scans and indexes music folders
- **Metadata Extraction**: Reads ID3 tags and audio file information
- **Smart Organization**: Groups songs by artist, album, and title

### 🎯 Smart Features
- **Skip Prediction**: AI-powered skip probability calculation
- **Danger Zone**: Identifies songs that are likely to be skipped
- **Performance Analytics**: Dashboard showing listening statistics
- **Adaptive Playlists**: Dynamic playlist generation based on preferences

### 🎨 User Interface
- **Modern Design**: Clean, responsive interface with dark/light themes
- **Tabbed Navigation**: Player, Playlist, Dashboard, and Danger Zone views
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **PWA Support**: Installable as a desktop/mobile app

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Modern web browser with ES2020+ support

### Installation

1. **Navigate to the client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Start development server**
   ```bash
   bun run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Development

### Available Scripts

```bash
# Development
bun run dev          # Start development server with hot reload
bun run preview      # Preview production build locally

# Building
bun run build        # Build for production
bun run buildDeploy  # Build and deploy to docs folder

# Code Quality
bun run lint         # Run ESLint checks
```

### Development Server
The development server runs on `http://localhost:5173` with:
- Hot Module Replacement (HMR)
- Fast refresh for React components
- TypeScript compilation
- ESLint integration

### Building for Production
```bash
bun run build
```
This creates a `dist/` folder with:
- Optimized and minified JavaScript
- Processed CSS
- Static assets
- PWA manifest and service worker

## 🏗️ Architecture

### Component Structure
```
src/
├── actions/           # Application state management
│   ├── actions.ts    # Main action dispatcher
│   ├── app.ts        # App-level actions
│   ├── browser.ts    # File browser actions
│   ├── dashboard.ts  # Dashboard actions
│   ├── player.ts     # Music player actions
│   ├── playlist.ts   # Playlist management
│   └── utils/        # Action utilities
├── components/        # React components
│   ├── app/          # App-level components
│   ├── dashboard/    # Dashboard components
│   ├── dangerZone/   # Danger zone components
│   ├── player/       # Music player components
│   ├── playlist/     # Playlist components
│   └── ui/           # Reusable UI components
├── utils/             # Utility functions and hooks
└── globalState.ts     # Global state management
```

### State Management
The application uses a custom state management system with:
- **Actions**: Centralized action dispatcher for state changes
- **Stores**: Reactive state containers with automatic updates
- **Local Storage**: Persistent state across browser sessions

### Key Components

#### Player Component
- Audio playback controls
- Volume and mute management
- Keyboard shortcuts
- Current song display

#### Playlist Component
- Song list with filtering
- Skip probability indicators
- Drag and drop reordering
- Search functionality

#### Dashboard Component
- Listening statistics
- Skip pattern analysis
- Performance metrics
- Song recommendations

#### Danger Zone Component
- High-skip-probability songs
- Bulk deletion options
- Threshold management
- Safety confirmations

## 🎨 Styling

### CSS Framework
- **Custom CSS**: Tailwind-inspired utility classes
- **Component-based**: Scoped styles for each component
- **Responsive**: Mobile-first design approach
- **Themes**: Dark/light mode support

### Key Styling Features
- **CSS Variables**: Dynamic theming
- **Flexbox/Grid**: Modern layout systems
- **Animations**: Smooth transitions and micro-interactions
- **Accessibility**: High contrast and keyboard navigation

## 🔌 PWA Features

### Service Worker
- **Offline Support**: Cache music files for offline playback
- **Background Sync**: Sync data when connection is restored
- **Push Notifications**: Real-time updates and alerts

### App Manifest
- **Installable**: Add to home screen on mobile/desktop
- **App-like Experience**: Full-screen mode and native feel
- **Icons**: Multiple sizes for different devices

## 📱 Browser Support

### Supported Browsers
- **Chrome/Edge**: 90+ (Full PWA support)
- **Firefox**: 88+ (Full PWA support)
- **Safari**: 14+ (Limited PWA support)
- **Mobile**: iOS Safari, Chrome Mobile

### Required Features
- ES2020+ support
- File System Access API (for local files)
- Web Audio API
- Service Worker support (for PWA features)

## 🧪 Testing

### Code Quality
- **ESLint**: Code style and best practices
- **TypeScript**: Type safety and IntelliSense
- **Prettier**: Code formatting (via ESLint)

### Testing Strategy
- **Component Testing**: Individual component validation
- **Integration Testing**: Component interaction testing
- **E2E Testing**: Full user journey testing

## 📦 Dependencies

### Core Dependencies
- **React 19**: Modern React with concurrent features
- **TypeScript**: Type-safe JavaScript development
- **Vite**: Fast build tool and dev server

### UI Libraries
- **Lucide React**: Beautiful, customizable icons
- **React Hot Toast**: Toast notifications
- **Clsx**: Conditional CSS class names

### Audio Processing
- **Music Metadata**: Audio file metadata extraction
- **Path Browserify**: Path utilities for browser environment

### Development Tools
- **ESLint**: Code linting and formatting
- **Vite PWA**: Progressive Web App support
- **Workbox**: Service worker utilities

## 🚀 Deployment

### Build Process
1. **TypeScript Compilation**: Convert TS to JS
2. **Vite Build**: Bundle and optimize assets
3. **PWA Generation**: Create service worker and manifest
4. **Asset Optimization**: Minify and compress files

### Deployment Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: CloudFlare, AWS CloudFront
- **Self-hosted**: Nginx, Apache

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Install dependencies with `bun install`
4. Make your changes
5. Run tests with `bun run lint`
6. Submit a pull request

### Code Style
- Follow existing TypeScript patterns
- Use functional components with hooks
- Maintain component separation of concerns
- Add proper TypeScript types

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using React, TypeScript, and Vite**
