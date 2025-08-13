# 🎵 Clever Music Player - Server

The backend server for Clever Music Player, built with Bun and webview-bun. This server provides desktop application functionality by wrapping the React frontend in a native webview window, enabling cross-platform desktop deployment.

## ✨ Features

### 🖥️ Desktop Application
- **Native Webview**: Cross-platform desktop app using webview-bun
- **Window Management**: Customizable window size and behavior
- **Development Tools**: Optional DevTools for debugging
- **Port Management**: Automatic or manual port configuration

### 🔌 Server Capabilities
- **Static File Serving**: Serves the built React application
- **Webview Integration**: Seamless integration between server and client
- **Environment Management**: Development and production mode support
- **Process Management**: Automatic cleanup and resource management

### 🚀 Performance
- **Bun Runtime**: Ultra-fast JavaScript runtime
- **Efficient File Serving**: Optimized static file delivery
- **Memory Management**: Automatic process cleanup
- **Fast Startup**: Quick application launch times

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) runtime (required)
- Built React client application
- Windows, macOS, or Linux

### Installation

1. **Navigate to the server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Build the client first**
   ```bash
   # From the server directory
   bun run buildClient
   
   # Or manually from client directory
   cd ../client
   bun run build
   cd ../server
   bun run copy
   ```

4. **Run the server**
   ```bash
   bun run dev    # Development mode with DevTools
   bun run prod   # Production mode
   ```

## 🔧 Development

### Available Scripts

```bash
# Environment Setup
bun run devEnv      # Set development environment
bun run prodEnv     # Set production environment

# Server Execution
bun run dev         # Run in development mode
bun run prod        # Run in production mode

# Client Integration
bun run copy        # Copy built client to server
bun run buildClient # Build client and copy to server
```

### Environment Modes

#### Development Mode (`bun run dev`)
- Enables DevTools for debugging
- Uses development client URL (`http://localhost:5173`)
- Verbose logging and error reporting
- Hot reload support (when client is running)

#### Production Mode (`bun run prod`)
- Disables DevTools for end users
- Serves built client from local server
- Optimized for performance
- Minimal logging

### Command Line Options

```bash
# Basic usage
bun run dev

# With custom port
bun run dev -- --port 8080

# With debug mode
bun run dev -- --debug

# Show help
bun run dev -- --help
```

#### Available Flags
- `--port, -p <port>`: Set custom port (default: random 10000-19999)
- `--debug, -d`: Enable DevTools in production mode
- `--help, -h`: Show usage information

## 🏗️ Architecture

### Server Structure
```
server/
├── index.ts           # Main server entry point
├── server.ts          # Server configuration (if separate)
├── env.ts             # Environment configuration (auto-generated)
├── package.json       # Dependencies and scripts
└── dist/              # Built client files (copied from client)
```

### Core Components

#### Main Server (`index.ts`)
- **Port Management**: Automatic or manual port assignment
- **Process Spawning**: Launches Bun server for static files
- **Webview Creation**: Creates and manages desktop window
- **Message Binding**: Handles client-server communication
- **Cleanup**: Proper process termination

#### Webview Integration
- **Window Creation**: Native desktop window with webview
- **Navigation**: Routes to development or production client
- **Message Handling**: Bidirectional communication with client
- **Window Management**: Size, title, and behavior control

#### Static File Server
- **Bun Server**: Lightweight HTTP server for static files
- **Port Assignment**: Dynamic port allocation
- **File Serving**: Delivers built React application
- **Process Management**: Automatic cleanup on exit

### Data Flow
```
Client (React) ←→ Webview ←→ Server (Bun) ←→ Static Files
     ↑              ↑           ↑
  Browser      Desktop App   File System
```

## 🔌 API Reference

### Server Endpoints
The server primarily serves static files, but includes:

- **Root (`/`)**: Main application entry point
- **Static Assets**: JavaScript, CSS, and media files
- **PWA Manifest**: Progressive Web App configuration
- **Service Worker**: Offline functionality

### Webview API
```typescript
// Send message from client to server
window["send-message"]("Hello from client").then(console.log);

// Server receives and responds to messages
webview.bind("send-message", (message) => {
    console.log(message);
    return `Server received: ${message}`;
});
```

### Environment Variables
```typescript
// Auto-generated in env.ts
export const B_PROD = true;  // Production mode
export const B_PROD = false; // Development mode
```

## 🎯 Configuration

### Window Settings
```typescript
webview.title = "Clever Music Player";
webview.size = { 
    width: 1280, 
    height: 720, 
    hint: SizeHint.NONE 
};
```

### Port Configuration
- **Default**: Random port between 10000-19999
- **Custom**: Use `--port` flag to specify exact port
- **Validation**: Ensures port is valid and available

### Development vs Production
- **Development**: Points to Vite dev server (`localhost:5173`)
- **Production**: Serves built files from local Bun server
- **Environment**: Automatically set via scripts

## 🚀 Deployment

### Desktop Application
1. **Build the client**
   ```bash
   cd client
   bun run build
   ```

2. **Copy to server**
   ```bash
   cd ../server
   bun run copy
   ```

3. **Run production server**
   ```bash
   bun run prod
   ```

### Distribution
- **Windows**: Package with webview-bun and Bun runtime
- **macOS**: Create `.app` bundle with native dependencies
- **Linux**: Package with system dependencies

### Build Process
```bash
# Complete build and package
cd client && bun run build
cd ../server && bun run copy
bun run prod
```

## 🧪 Testing

### Development Testing
- **DevTools**: Enable with `--debug` flag
- **Hot Reload**: Automatic updates during development
- **Error Handling**: Comprehensive error logging
- **Port Conflicts**: Automatic port resolution

### Production Testing
- **Static File Serving**: Verify all assets load correctly
- **PWA Features**: Test offline functionality
- **Window Behavior**: Validate desktop app behavior
- **Performance**: Monitor memory and CPU usage

## 📦 Dependencies

### Core Dependencies
- **webview-bun**: Desktop application framework
- **Bun**: JavaScript runtime and package manager

### Development Dependencies
- **@types/bun**: TypeScript definitions for Bun
- **TypeScript**: Type safety and compilation

### Runtime Requirements
- **Bun**: Must be installed on target system
- **System Libraries**: Webview dependencies vary by platform

## 🔍 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Use custom port
bun run dev -- --port 8080
```

#### DevTools Not Working
```bash
# Enable debug mode
bun run dev -- --debug
```

#### Client Not Found
```bash
# Ensure client is built and copied
bun run buildClient
```

#### Webview Not Opening
- Verify Bun installation
- Check system permissions
- Ensure display server is running (Linux)

### Debug Mode
```bash
# Enable comprehensive debugging
bun run dev -- --debug
```
This enables:
- DevTools in production mode
- Verbose logging
- Error stack traces
- Performance monitoring

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Install Bun runtime
3. Set up client and server
4. Make your changes
5. Test with both dev and prod modes
6. Submit a pull request

### Code Style
- Use TypeScript for type safety
- Follow Bun best practices
- Maintain clear error handling
- Add proper documentation

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Bun](https://bun.sh/) for exceptional performance
- Desktop integration via [webview-bun](https://github.com/webview/webview)
- Cross-platform compatibility and native feel

---

**Built with ❤️ using Bun and webview-bun**
