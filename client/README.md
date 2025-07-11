# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

## Environment Setup

### Socket.io Configuration

The app connects to a Socket.io server. You need to set the `VITE_SOCKET_URL` environment variable:

#### Development
Create a `.env.development` file:
```
VITE_SOCKET_URL=http://localhost:3000
```

#### Production
Create a `.env.production` file:
```
VITE_SOCKET_URL=https://server.sachadavid.dev
```

### Running the App

1. Install dependencies: `npm install`
2. Set up environment variables (see above)
3. Start development server: `npm run dev`
4. Build for production: `npm run build`
