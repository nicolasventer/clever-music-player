# 🎵 Clever Music Player

A **cross-platform intelligent music player** that learns from your listening habits to provide personalized music recommendations and smart playlist management. Built with React, TypeScript, and NW.js for both desktop and web experiences.

## ✨ Features

### 🎵 Intelligent Music Playback
- **Smart Skip Prediction**: AI-powered analysis of your listening patterns to predict which songs you'll skip
- **Adaptive Learning**: Continuously improves recommendations based on your behavior
- **Volume Memory**: Remembers your volume preferences across sessions
- **Keyboard Shortcuts**: Full keyboard navigation and media controls

### 📁 Advanced File Management
- **Local File Support**: Play music directly from your computer's file system
- **Smart Folder Scanning**: Automatically indexes and organizes your music library
- **Metadata Extraction**: Reads ID3 tags, album art, and audio file information
- **Cross-Platform**: Works on Windows, macOS, and Linux

### 🎯 Smart Features
- **Danger Zone**: Identifies songs with high skip probability for cleanup
- **Performance Analytics**: Comprehensive dashboard showing listening statistics
- **Skip Pattern Analysis**: Tracks which songs you skip to build preference models
- **Dynamic Playlists**: Generates playlists based on your actual listening behavior

### 🎨 Modern User Interface
- **Tabbed Navigation**: Player, Playlist, Dashboard, and Danger Zone views
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Themes**: Customizable appearance
- **PWA Support**: Installable as a web app with offline capabilities

## 🚀 Getting Started

### Prerequisites
- **Desktop App**: No additional requirements - download and run
- **Web Client**: Modern web browser with ES2020+ support
- **Development**: [Bun](https://bun.sh/) (recommended) or Node.js 18+

### Quick Start

#### Desktop App (Recommended)
1. Download the latest release for your platform
2. Extract and run the executable
3. Add your music folders and start listening!

#### Web Client
1. Clone the repository
2. Navigate to the client directory: `cd react-src`
3. Install dependencies: `bun install`
4. Start development: `bun run dev`
5. Open `http://localhost:5173` in your browser

## 🏗️ Architecture

### Desktop Application
- **NW.js Framework**: Cross-platform desktop app wrapper using Chromium and Node.js
- **Native File Access**: Direct file system integration through Node.js APIs
- **Local Storage**: Persistent settings and preferences
- **Window Management**: Resizable, customizable interface with native OS integration

### Web Client
- **React 19**: Modern React with concurrent features
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server
- **PWA**: Progressive Web App capabilities

### State Management
- **Custom Store System**: Reactive state containers
- **Action Dispatcher**: Centralized state change management
- **Local Storage**: Persistent state across sessions
- **Real-time Updates**: Automatic UI synchronization

## 📱 Supported Platforms

### Desktop
- **Windows**: 10/11 (x64)
- **macOS**: 10.15+ (Intel/Apple Silicon)
- **Linux**: Ubuntu 18.04+, Debian 10+, Fedora 30+

### Web Browsers
- **Chrome/Edge**: 90+ (Full PWA support)
- **Firefox**: 88+ (Full PWA support)
- **Safari**: 14+ (Limited PWA support)
- **Mobile**: iOS Safari, Chrome Mobile

## 🔧 Development

### Project Structure
```
clever-music-player/
├── react-src/           # Web client application
│   ├── src/
│   │   ├── actions/     # State management
│   │   ├── components/  # React components
│   │   ├── utils/       # Utility functions
│   │   └── globalState.ts
│   ├── package.json     # Dependencies and scripts
│   ├── vite.config.ts   # Build configuration
│   └── _toCopy/         # NW.js desktop app files
├── neutralino.config.json # Legacy config (project now uses NW.js)
└── README.md            # This file
```

### Available Scripts

```bash
# Development
bun run dev          # Start development server
bun run preview      # Preview production build
bun run build        # Build for production
bun run buildDeploy  # Build and deploy to docs folder

# Code Quality
bun run lint         # Run ESLint checks
```

### Key Components

#### Player Component
- Audio playback controls with keyboard shortcuts
- Volume and mute management
- Current song display and metadata
- Skip probability indicators

#### Playlist Component
- Song list with real-time filtering
- Skip probability visualization
- Drag and drop reordering
- Search and filter functionality

#### Dashboard Component
- Listening statistics and analytics
- Skip pattern analysis
- Performance metrics
- Smart recommendations

#### Danger Zone Component
- High-skip-probability song identification
- Bulk deletion with safety confirmations
- Threshold management
- Cleanup recommendations

## 🎨 User Experience

### Smart Learning
The player analyzes your listening behavior to:
- Calculate skip probabilities for each song
- Identify patterns in your music preferences
- Suggest songs you're likely to enjoy
- Help you discover new music

### File Management
- **Automatic Organization**: Groups songs by artist, album, and title
- **Metadata Reading**: Extracts ID3 tags, album art, and audio information
- **Folder Scanning**: Recursively scans music directories
- **Performance Optimization**: Efficient indexing for large libraries

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **High Contrast**: Accessible color schemes
- **Screen Reader**: Compatible with assistive technologies
- **Responsive Design**: Works on all screen sizes

## 🔌 Technical Features

### Audio Processing
- **Multiple Formats**: MP3, FLAC, WAV, OGG, and more
- **Metadata Extraction**: Comprehensive audio file information
- **Streaming**: Efficient audio streaming and buffering
- **Cross-fade**: Smooth transitions between songs

### Performance
- **Lazy Loading**: Loads songs on-demand
- **Memory Management**: Efficient resource usage
- **Background Processing**: Non-blocking file operations
- **Caching**: Smart caching for frequently accessed files

### Security
- **Local Processing**: All audio processing happens locally
- **No Cloud Dependencies**: Your music stays on your device
- **Privacy First**: No data collection or tracking
- **Secure Storage**: Local file system access only

## 📊 Use Cases

### Personal Music Library
- Organize and play your local music collection
- Discover hidden gems in your library
- Create smart playlists based on preferences
- Clean up songs you don't enjoy

### Music Discovery
- Find similar songs to your favorites
- Explore your library by mood and style
- Get recommendations based on listening history
- Identify patterns in your music taste

### Library Management
- Bulk organize and categorize music
- Remove low-quality or unwanted tracks
- Optimize your music collection
- Maintain clean, organized folders

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Install dependencies: `bun install`
4. Make your changes
5. Run tests: `bun run lint`
6. Submit a pull request

### Code Style
- Follow existing TypeScript patterns
- Use functional components with hooks
- Maintain component separation of concerns
- Add proper TypeScript types
- Include tests for new features

### Areas for Contribution
- **UI/UX Improvements**: Better designs and interactions
- **Performance Optimization**: Faster loading and processing
- **New Features**: Additional music analysis capabilities
- **Platform Support**: More operating system compatibility
- **Documentation**: Better guides and examples

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team**: For the amazing framework
- **NW.js**: For cross-platform desktop capabilities
- **Music Metadata**: For audio file parsing
- **Open Source Community**: For all the amazing libraries

## 📞 Support

- **Issues**: Report bugs and request features on GitHub
- **Discussions**: Join community discussions
- **Documentation**: Check the [docs folder](react-src/docs/) for detailed guides
- **Contributing**: See the contributing guidelines above

---

**Built with ❤️ for music lovers everywhere**

*Clever Music Player - Where AI meets your music library*
