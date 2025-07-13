# Portfolio Microfrontend

A microfrontend portfolio built with Vue 3, React, and Module Federation.

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

## Features

- **Microfrontend Architecture**: Each app is independently deployable
- **Module Federation**: Dynamic loading of remote applications
- **Vue 3 + React**: Multiple frameworks in one portfolio
- **TypeScript Support**: Full type safety across the application
- **Vite Build System**: Fast development and optimized builds
- **Shared Theme**: Consistent design system across all apps

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development servers**:
   ```bash
   npm run dev
   ```

3. **Open the application**:
   - Host: http://localhost:3000
   - React App: http://localhost:3001
   - Job Search: http://localhost:3002

## Development

### Individual Apps

```bash
npm run dev:host        # Host app only
npm run dev:react-app   # React app only
npm run dev:job-search  # Job Search app only
```

### Building

```bash
npm run build           # Build all apps
npm run build:host      # Host app only
npm run build:react-app # React app only
npm run build:job-search # Job Search app only
```

### Preview

```bash
npm run preview         # Serve built apps
```

## Module Federation Configuration

### Host App (apps/host/vite.config.ts)
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

### React App (apps/react-app/vite.config.ts)
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

### Job Search App (apps/job-search/vite.config.js)
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

## Remote Loading

The host application dynamically loads remote apps using Module Federation:

```javascript
// Load React app
const ReactApp = await import('react-app/App')

// Load Job Search app
const JobSearchApp = await import('job-search/App')
```

## File Structure

```
apps/
├── host/
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   ├── router/
│   │   └── utils/
│   ├── vite.config.ts
│   └── package.json
├── react-app/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.tsx
│   ├── vite.config.ts
│   └── package.json
└── job-search/
    ├── src/
    │   ├── components/
    │   ├── views/
    │   └── App.vue
    ├── vite.config.js
    └── package.json
```

## Technologies Used

- **Vue 3**: Composition API, TypeScript support
- **React 18**: Hooks, TypeScript support
- **Vite**: Fast build tool and dev server
- **Module Federation**: Dynamic module loading
- **TypeScript**: Type safety across the application
- **SCSS**: Advanced CSS preprocessing
- **ESLint**: Code linting and formatting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details 