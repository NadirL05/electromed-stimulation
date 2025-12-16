# Use Node.js 20
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source files
COPY . .

# Expose port
ENV PORT=3000
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
