# Use a specific version of node:18-alpine to ensure consistency across builds
FROM node:20-alpine

ARG NEXT_PUBLIC_FIREBASE_API_KEY
ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID
ARG NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ARG NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ARG NEXT_PUBLIC_FIREBASE_APP_ID
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_GCS_BUCKET_PUBLIC_URL
ARG NEXT_PUBLIC_MESHMELL_GITHUB_REPOSITORY
ARG NEXT_PUBLIC_NUM_OF_MODEL_BY_PAGE
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID
ARG FIREBASE_ADMIN_PROJECT_ID
ARG FIREBASE_ADMIN_CLIENT_EMAIL
ARG FIREBASE_ADMIN_PRIVATE_KEY
ARG FIREBASE_ADMIN_DATABASE_URL
ARG GCS_BUCKET_NAME
ARG GCS_TYPE
ARG GCS_CLIENT_ID
ARG GCS_PROJECT_ID
ARG GCS_CLIENT_EMAIL
ARG GCS_PRIVATE_KEY
ARG NEXT_PUBLIC_ENV_STATUS

ENV NEXT_PUBLIC_FIREBASE_API_KEY ${NEXT_PUBLIC_FIREBASE_API_KEY}
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ${NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID ${NEXT_PUBLIC_FIREBASE_PROJECT_ID}
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ${NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ${NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}
ENV NEXT_PUBLIC_FIREBASE_APP_ID ${NEXT_PUBLIC_FIREBASE_APP_ID}
ENV NEXT_PUBLIC_BASE_URL ${NEXT_PUBLIC_BASE_URL}
ENV NEXT_PUBLIC_GCS_BUCKET_PUBLIC_URL ${NEXT_PUBLIC_GCS_BUCKET_PUBLIC_URL}
ENV NEXT_PUBLIC_MESHMELL_GITHUB_REPOSITORY ${NEXT_PUBLIC_MESHMELL_GITHUB_REPOSITORY}
ENV NEXT_PUBLIC_NUM_OF_MODEL_BY_PAGE ${NEXT_PUBLIC_NUM_OF_MODEL_BY_PAGE}
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID ${NEXT_PUBLIC_GA_MEASUREMENT_ID}
ENV FIREBASE_ADMIN_PROJECT_ID ${FIREBASE_ADMIN_PROJECT_ID}
ENV FIREBASE_ADMIN_CLIENT_EMAIL ${FIREBASE_ADMIN_CLIENT_EMAIL}
ENV FIREBASE_ADMIN_PRIVATE_KEY ${FIREBASE_ADMIN_PRIVATE_KEY}
ENV FIREBASE_ADMIN_DATABASE_URL ${FIREBASE_ADMIN_DATABASE_URL}
ENV GCS_BUCKET_NAME ${GCS_BUCKET_NAME}
ENV GCS_TYPE ${GCS_TYPE}
ENV GCS_CLIENT_ID ${GCS_CLIENT_ID}
ENV GCS_PROJECT_ID ${GCS_PROJECT_ID}
ENV GCS_CLIENT_EMAIL ${GCS_CLIENT_EMAIL}
ENV GCS_PRIVATE_KEY ${GCS_PRIVATE_KEY}
ENV NEXT_PUBLIC_ENV_STATUS ${NEXT_PUBLIC_ENV_STATUS}

# Set the working directory inside the container
WORKDIR /app

# Copying package.json and package-lock.json first to leverage Docker cache
# This helps avoid re-installing all node modules when there are no changes in these files
COPY package.json package-lock.json ./

# Installing dependencies
# It's usually not recommended to install packages globally that are specific to a project
# If you need `next` specifically for your project, it should be included in your package.json
RUN npm install

# Copying the rest of your application code to the container
COPY . .

# No need to create the .next/cache/images directory manually
# Next.js will handle it. Also, using VOLUME for cache directories in Dockerfiles is not recommended,
# as it can lead to non-deterministic behavior when building images.
# The cache should be stored outside of the container, e.g., in a volume mounted at runtime.

# Build the app
RUN npm run build

# Exposing port 3000 for the app
EXPOSE 3000

# Setting environment variables
# HOST 0.0.0.0 is usually used to ensure your application is reachable from outside the docker container
ENV PORT=3000 HOST=0.0.0.0

# Define the command to run your app using CMD which provides defaults for an executing container.
# Here: using npm start, make sure your package.json has a "start" script.
CMD ["npm", "start"]