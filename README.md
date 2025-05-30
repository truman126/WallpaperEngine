
# Truman's Wallpaper Engine

Transform your images into stunning wallpapers with effortless elegance! Truman's Wallpaper Engine is a full stack web app designed for seamless image uploads and automatic color-matching framing. Each image is beautifully framed with a background that blends the average color of itself, ensuring a harmonious and visually appealing aesthetic.

\
Utilizes ReactJS, NodeJS, Mongo, Express. Containerized in Docker. Optional AWS S3 image storage and automatic lambda thumbnail generation.


## Examples

[Example 1](https://imgur.com/60h5z6e) \
[Example 2](https://imgur.com/VMabLJW)


## Installation
These instructions assume the usage of the local filesystem for image storage. AWS setup instructions will be coming soon.

Dependencies: \
\
[Docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/) \
OR\
[Docker Desktop](https://www.docker.com/products/docker-desktop/)


Fill out the client and server .env files

/client/.env
```env

  # Server URL, example: http://localhost:8000
  VITE_BASE_URL=

  # Enable if using Google Recaptcha, disabled by default. 
  # (true | false)
  VITE_USE_RECAPTCHA=false
```

/server/.env
```bash
# Replace with desired root user
ROOT_USER_EMAIL=root@example.com

# Mongo database url
# example <mongodb://mongo_c:27017/wallpaper_engine_db>
MONGO_URI=

# Server Port, default 8000
PORT=8000

# Secret JWT key
SECRET=exampleexampleexample

# Enables Google Recaptcha middleware, disabled by default
USE_RECAPTCHA=false

# Google Recaptcha secret key, ignored if not using recaptcha
RECAPTCHA_SECRET_KEY=

# Data storage type, (LOCAL | AWS), LOCAL by default
# AWS Keys required if using AWS
DAO_TYPE=LOCAL

# AWS Keys
AWS_S3_BUCKET_NAME=
AWS_S3_ACCESS_KEY_ID=
AWS_S3_SECRET_ACCESS_KEY=
AWS_S3_BUCKET_NAME_RESIZED=
```

While in the root folder where docker-compose.yml is located.

Run ```docker compose up```

Everything should build and be fully functional!