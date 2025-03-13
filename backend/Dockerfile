FROM node:14-alpine

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your backend code
COPY . .

# Expose the port your app runs on (3001 in this case)
EXPOSE 3001

# Run the index.js script
CMD ["node", "src/index.js"]
