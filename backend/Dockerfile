FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your app runs on (e.g., 3001)
EXPOSE 3001

# Use the correct entry point; adjust if necessary
CMD ["node", "src/index.js"]
