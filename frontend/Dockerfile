FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

FROM nginx:alpine

# Copy build output to nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose Nginx default port
EXPOSE 80

# Use default nginx command
CMD ["nginx", "-g", "daemon off;"]
