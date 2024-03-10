# Use a node image to build the React app
FROM node:18.12.1 AS frontend-builder

# Set the working directory in the container
WORKDIR /app/frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the built React app (optional, for production)
#FROM nginx:alpine AS frontend-production

# Copy the built React app from the frontend-builder stage to the nginx server
#COPY --from=frontend-builder /app/frontend/build /usr/share/nginx/html

# Expose port 3000
EXPOSE 3000