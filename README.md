# 🎵 Clever Music Player

A smart, intelligent music player that learns from your listening habits and helps you discover music you'll actually enjoy. Built with modern web technologies and designed for both desktop and web use.

## ✨ Features

- **Intelligent Playlist Management**: The player learns from your skip patterns and adjusts recommendations accordingly
- **Smart Skip Prediction**: Uses machine learning to predict which songs you might skip
- **Multi-Platform Support**: Works as a desktop app (via webview) and web application
- **Modern UI**: Clean, responsive interface built with React and TypeScript
- **PWA Support**: Progressive Web App capabilities for mobile and desktop
- **Local File Support**: Play music directly from your local file system
- **Keyboard Shortcuts**: Full keyboard navigation and shortcuts for power users

## 🏗️ Architecture

This project consists of two main components:

- **Client** (`/client`): React-based frontend with TypeScript, Vite, and PWA support
- **Server** (`/server`): Bun-based backend with webview integration for desktop app functionality

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd clever-music-player
   ```

2. **Install dependencies**
   ```bash
   # Install client dependencies
   cd client
   bun install
   
   # Install server dependencies
   cd ../server
   bun install
   ```

3. **Run the application**
   ```bash
   # Terminal 1: Start the client
   cd client
   bun run dev
   
   # Terminal 2: Start the server (desktop app)
   cd server
   bun run dev
   ```

## 📱 Usage

### Web Application
- Open your browser and navigate to `http://localhost:5173`
- Add your music folder using the file browser
- Start playing and let the AI learn your preferences

### Desktop Application
- The server will automatically open a desktop window
- The app runs in a native webview for better performance
- Supports all the same features as the web version

## 🔧 Development

### Client Development
```bash
cd client
bun run dev          # Start development server
bun run build        # Build for production
bun run lint         # Run ESLint
bun run preview      # Preview production build
```

### Server Development
```bash
cd server
bun run dev          # Development mode with dev tools
bun run prod         # Production mode
bun run buildClient  # Build client and copy to server
```

### Available Scripts

#### Client
- `dev`: Start development server with hot reload
- `build`: Build for production
- `deploy`: Deploy to docs folder
- `buildDeploy`: Build and deploy in one command
- `lint`: Run ESLint checks
- `preview`: Preview production build

#### Server
- `devEnv`: Set development environment
- `prodEnv`: Set production environment
- `dev`: Run in development mode
- `prod`: Run in production mode
- `copy`: Copy built client to server
- `buildClient`: Build client and copy to server

## 🛠️ Technology Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **PWA** support with Workbox

### Backend
- **Bun** runtime for performance
- **Webview-bun** for desktop app functionality
- **TypeScript** for type safety

### Key Libraries
- **music-metadata**: Audio file metadata extraction
- **clsx**: Conditional CSS classes
- **react-hot-toast**: Toast notifications

## 📁 Project Structure

```
clever-music-player/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── actions/       # Application actions and state management
│   │   ├── components/    # React components
│   │   ├── utils/         # Utility functions and hooks
│   │   └── App.tsx        # Main application component
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── server/                 # Bun backend with webview
│   ├── index.ts           # Main server entry point
│   └── package.json       # Backend dependencies
└── README.md              # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Bun](https://bun.sh/) for exceptional performance
- Powered by [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- Icons from [Lucide](https://lucide.dev/)

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the existing issues
2. Create a new issue with detailed information
3. Include your operating system and version information

---

**Happy listening! 🎧**
