# Fly.io Deployment Guide

## Issues Fixed

1. **SSL Certificate Handling**: Added try-catch block to handle missing SSL certificates gracefully
2. **CORS Configuration**: Updated to include Fly.io domains and added regex support
3. **Dockerfile**: Fixed WORKDIR directive and added NODE_ENV environment variable
4. **Health Checks**: Added proper health check configuration in fly.toml
5. **Environment Variables**: Set NODE_ENV=production in Dockerfile and fly.toml

## Deployment Steps

1. **Deploy to Fly.io**:
   ```bash
   cd server
   fly deploy
   ```

2. **Check deployment status**:
   ```bash
   fly status
   ```

3. **View logs**:
   ```bash
   fly logs
   ```

## Common Issues and Solutions

### Issue: SSL Certificate Errors
- **Solution**: The server now gracefully falls back to HTTP if SSL certificates are missing

### Issue: CORS Errors
- **Solution**: Updated CORS configuration to include Fly.io domains and added regex support

### Issue: Environment Variables Not Set
- **Solution**: Added NODE_ENV=production to Dockerfile and fly.toml

### Issue: Health Check Failures
- **Solution**: Added proper health check configuration pointing to /health-check endpoint

## Testing the Deployment

1. **Health Check**: Visit `https://your-app.fly.dev/health-check`
2. **Main Endpoint**: Visit `https://your-app.fly.dev/`
3. **WebSocket**: Test WebSocket connections from your frontend

## Troubleshooting

If deployment still fails:

1. Check logs: `fly logs`
2. Verify app status: `fly status`
3. Check if the app is running: `fly ssh console`
4. Test locally with production settings: `NODE_ENV=production node index.js` 