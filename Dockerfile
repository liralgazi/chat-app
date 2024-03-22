# Stage 1: Build the backend
FROM node:16 as backend-build
WORKDIR /backend

# Clone the backend repository
RUN git clone https://github.com/liralgazi/chat-app-server.git .

# Install backend dependencies and build the TypeScript project
RUN npm install
RUN npm run build

# Stage 2: Build the frontend
FROM node:16 as frontend-build
WORKDIR /frontend

# Clone the frontend repository
RUN git clone https://github.com/liralgazi/chat-app.git .

# Install frontend dependencies and build the project
RUN npm install
RUN npm run build

# Stage 3: Setup the production environment
FROM node:16
WORKDIR /app

# Copy the backend build output
COPY --from=backend-build /backend/dist ./backend
COPY --from=backend-build /backend/node_modules ./backend/node_modules
COPY --from=backend-build /backend/package.json ./backend/package.json

# Copy the frontend build output
COPY --from=frontend-build /frontend/dist ./frontend

# Expose the backend port
EXPOSE 3002

# Start the backend server
# Adjust the start command according to your project's requirements
CMD ["node", "/app/backend/index.js"]
