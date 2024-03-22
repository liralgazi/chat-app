# Stage 1: Prepare the backend
FROM node:16 as backend-setup
WORKDIR /backend

# Clone the backend repository and install dependencies
RUN git clone https://github.com/liralgazi/chat-app-server.git .
RUN npm install

# Stage 2: Build the frontend
FROM node:16 as frontend-build
WORKDIR /frontend

# Clone the frontend repository, install dependencies, and build the project
RUN git clone https://github.com/liralgazi/chat-app.git .
RUN npm install
RUN npm run build

# Stage 3: Setup the production environment
FROM node:16
WORKDIR /app

# Copy the backend setup (including node_modules)
COPY --from=backend-setup /backend ./backend

# Copy the frontend build output
COPY --from=frontend-build /frontend/dist ./frontend/public

# Expose the backend port
EXPOSE 3002

# Start the backend server using ts-node for TypeScript execution
CMD ["npx", "ts-node", "/app/backend/src/index.ts"]
