# Use Node.js latest version as the base image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to work directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the entire project to work directory
COPY . .

# Build the NestJS application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Command to start the NestJS server
CMD ["node", "dist/main.js"]
