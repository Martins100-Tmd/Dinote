# Use official Node.js image as base
FROM node:18-slim

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Install Prisma CLI
RUN npm install prisma @prisma/client

# Copy the rest of the app's code
COPY . .

# Run Prisma migrations and start the app
CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]
