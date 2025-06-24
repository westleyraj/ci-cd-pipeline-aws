# Step 1: Build React App
FROM node:16 as build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Step 3: Inject Nginx config directly
RUN echo 'server {\n\
  listen 80;\n\
  server_name localhost;\n\
  root /usr/share/nginx/html;\n\
  index index.html;\n\
  location / {\n\
    try_files $uri /index.html;\n\
  }\n\
}' > /etc/nginx/conf.d/default.conf
