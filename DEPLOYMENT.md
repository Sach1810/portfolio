# Deployment Guide

## GitHub Pages Deployment

### Setting up Environment Variables

To make the `VITE_SOCKET_URL` environment variable available during GitHub Pages deployment:

1. **Go to your GitHub repository**
2. **Navigate to Settings > Secrets and variables > Actions**
3. **Click "New repository secret"**
4. **Add the secret:**
   - **Name**: `VITE_SOCKET_URL`
   - **Value**: `https://server.sachadavid.dev`

### Environment Variables by Environment

| Environment | VITE_SOCKET_URL |
|-------------|-----------------|
| Development | `http://localhost:3000` |
| Production  | `https://server.sachadavid.dev` |

### How it Works

- **Development**: Uses `.env.development` file with localhost URL
- **Production**: Uses GitHub secret `VITE_SOCKET_URL` with production server URL
- **Build Process**: GitHub Actions passes the secret as an environment variable during build

### Alternative: Hardcode for Production

If you prefer not to use GitHub secrets, you can create a `.env.production` file:

```bash
# Create .env.production file
echo "VITE_SOCKET_URL=https://server.sachadavid.dev" > client/.env.production
```

**Note**: This file will be committed to your repository, so the production URL will be visible in your code.

### Testing the Deployment

1. Push your changes to trigger the GitHub Actions workflow
2. Check the Actions tab to ensure the build succeeds
3. Visit your GitHub Pages URL to test the socket connection

### Troubleshooting

- **Build fails**: Check that the GitHub secret is set correctly
- **Socket connection fails**: Verify your server is running at `https://server.sachadavid.dev`
- **CORS errors**: Ensure your server's CORS settings allow your GitHub Pages domain 