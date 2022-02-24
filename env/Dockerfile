FROM node:17-alpine

# Create bot workdir
WORKDIR /usr/ethanwinters

# Copy source to container
COPY ../* ./

# Install npm dependencies
RUN npm install

# Install system dependencies
RUN apk add ffmpeg

# Expose ports and run app
EXPOSE 3000
CMD [ "node", "src/index.js" ]
