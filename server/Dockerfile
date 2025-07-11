# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the server files
COPY . .

# Expose port
EXPOSE 3000

# Set NODE_ENV to production for Fly.io
ENV NODE_ENV=production

# Start the server
CMD ["node", "index.js"] 