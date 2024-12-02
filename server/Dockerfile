# Base image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's files
COPY server/ .

# Copy the config.env file
COPY server/config.env ./config.env

# Expose environment variables (optional if using env files)
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Run the server
CMD ["npm", "start"]

# Expose port 5000
EXPOSE 5000
