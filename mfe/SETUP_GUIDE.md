# Microfrontend Setup Guide

This guide explains how to set up and run the microfrontend portfolio project.

## Project Structure

```
portfolio-mfe/
├── apps/
│   ├── host/          # Vue 3 host application (port 3000)
│   ├── react-app/     # React microfrontend (port 3001)
│   └── job-search/    # Job Search microfrontend (port 3002)
├── packages/
│   └── sd-theme/      # Shared theme package
└── serve-remotes.js   # Static file server for remote apps
```

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd portfolio-mfe
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Development

### Start All Applications

```bash
npm run dev
```

This will start:
- Host app: http://localhost:3000
- React app: http://localhost:3001
- Job Search app: http://localhost:3002

### Individual App Development

```bash
npm run dev:host        # Host app only
npm run dev:react-app   # React app only
npm run dev:job-search  # Job Search app only
```

### Building for Production

```bash
npm run build
```

This builds all applications for production deployment.

### Individual App Building

```bash
npm run build:host      # Host app only
npm run build:react-app # React app only
npm run build:job-search # Job Search app only
```

### Preview Built Apps

```bash
npm run preview
```

This serves the built applications for testing.

## Module Federation Configuration

### Host App Configuration

The host app (apps/host/vite.config.ts) is configured to consume remote apps:

```typescript
federation({
  name: 'host',
  remotes: {
    'react-app': 'http://localhost:3001/assets/remoteEntry.js',
    'job-search': 'http://localhost:3002/assets/remoteEntry.js',
  },
  shared: ['vue', 'vue-router']
})
```

### React App Configuration

The React app (apps/react-app/vite.config.ts) exposes its App component:

```typescript
federation({
  name: 'react-app',
  filename: 'remoteEntry.js',
  exposes: {
    './App': './src/App.tsx',
  },
  shared: ['react', 'react-dom']
})
```

### Job Search App Configuration

The Job Search app (apps/job-search/vite.config.js) exposes its App component:

```javascript
federation({
  name: 'job-search',
  filename: 'remoteEntry.js',
  exposes: {
    './App': './src/App.vue',
  },
  shared: ['vue', 'vue-router']
})
```

## Navigation

1. **Main Navigation**: Use the host app navigation to switch between apps
2. **React Internal Navigation**: Once in the React app, use its internal navigation for Home/About pages
3. **Dynamic Loading**: Apps are loaded on-demand when navigating to their routes

## Troubleshooting

### Common Issues

1. **Port Conflicts**: Ensure ports 3000, 3001, and 3002 are available
2. **Module Federation**: Check that all apps are running before accessing remotes
3. **TypeScript Errors**: Run `npm install` in each app directory if needed
4. **Build Issues**: Clear node_modules and reinstall if needed

### Development Tips

1. **Start with Host**: Always start the host app first, then the remote apps
2. **Check Console**: Monitor browser console for Module Federation errors
3. **Network Tab**: Check network tab to ensure remote entries are loading
4. **Hot Reload**: Each app supports hot reload independently

## Production Deployment

### Building for Production

1. **Build all apps**:
   ```bash
   npm run build
   ```

2. **Serve with static server**:
   ```bash
   npm run preview
   ```

### Deployment Considerations

1. **Remote URLs**: Update remote URLs in host app for production
2. **CORS**: Ensure proper CORS configuration for cross-origin requests
3. **CDN**: Consider using a CDN for static assets
4. **Monitoring**: Set up monitoring for Module Federation loading

## Technology Stack

- **Build Tool**: Vite
- **Module Federation**: @originjs/vite-plugin-federation
- **Host Framework**: Vue 3 + Composition API
- **Remote Frameworks**: React 18, Vue 3
- **Routing**: Vue Router (host), React Router (React app)
- **Language**: TypeScript (host, react-app), JavaScript (job-search)
- **Styling**: CSS with modern features

## Future Enhancements

- Shared component library
- State management across apps
- Shared utilities and types
- Testing setup for each app
- CI/CD pipeline
- Docker containerization 