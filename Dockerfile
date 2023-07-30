# Pull Docker Hub base image
FROM node:14-alpine
# Set working directory
WORKDIR /src/app

COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app to container
COPY . .

# Set the environment variable for the port number
ENV APP_PORT 3000

ENV GOOGLE_APPLICATION_CREDENTIALS=gcp.json

# Expose the port number that the app listens on
EXPOSE $APP_PORT

# Run the "start" script in package.json
CMD ["npm", "run", "start"]


