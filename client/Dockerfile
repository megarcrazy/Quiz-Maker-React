FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build React app
RUN npm run build

# Serve build using serve
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start", "build", "-l", "3000"]
