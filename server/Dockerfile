# Use the official Node.js image as the base image
FROM node:18.0.0-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json from the server directory
COPY /package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code from the server directory
COPY . .

# Expose the port that the application listens on
EXPOSE 3000

# Run the application
CMD ["sh", "-c", "npm install && nsode index.js"]