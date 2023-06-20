# Use the official Node.js 14 image as the base image
FROM node:14 AS base

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port on which the application is running (change if necessary)
EXPOSE 3000

# Start the application
CMD [ "node", "app.js" ]


# Multi-stage build for efficient image size

# Create a new build stage based on the base stage
FROM base AS build

# Set the production environment variable
ENV NODE_ENV=production

# Build the optimized production version of the application
RUN npm run build


# Create a final production stage
FROM base AS production

# Copy the built application from the build stage
COPY --from=build /app/build /app/build

# Start the application in production mode
CMD [ "node", "app.js" ]
