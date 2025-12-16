# Use Node.js 20
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm ci

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Expose port (Railway will inject $PORT)
ENV PORT=4173
EXPOSE 4173

# Start the application
CMD ["npm", "run", "start"]
