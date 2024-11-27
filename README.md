# URL Shortener API

## Overview

This project is a simple URL Shortener API that allows users to shorten URLs, retrieve the original URL, and track usage statistics. The application is built using Node.js, Express, and MongoDB.

## Features

- Shorten URLs and generate unique short IDs.
- Redirect to the original URL using the short ID.
- Track usage statistics, including total clicks and last accessed timestamp.
- Validate input URLs and handle errors gracefully.
- Rate limiting to control the number of requests per minute (bonus feature).

## Endpoints

### POST /shorten

- **Description**: Accepts a URL and returns a shortened URL.
- **Request**:
  ```json
  {
    "url": "https://example.com"
  }
  ```
- **Response**:
  ```json
  {
    "shortUrl": "http://yourdomain.com/abcd1234"
  }
  ```

### GET /:shortId

- **Description**: Redirects the user to the original URL when accessed with the shortId.
- **Response**: HTTP 302 redirect to the original URL.

### GET /stats/:shortId

- **Description**: Returns the usage statistics for a specific short URL.
- **Response**:
  ```json
  {
    "clicks": 42,
    "lastAccessed": "2024-11-26T12:34:56Z"
  }
  ```

## Database

- **Collections**: urls
- **Schema**:
  ```json
  {
    "_id": "ObjectId",
    "originalUrl": "https://example.com",
    "shortId": "abcd1234",
    "clicks": 42,
    "lastAccessed": "2024-11-26T12:34:56Z"
    "createdAt": "2024-11-27T04:00:54.583+00:00"
    "updatedAt": "2024-11-27T04:00:54.583+00:00"
  }
  ```

## Environment Configuration

- Use environment variables for database connection details and server configuration.
- Example **.env** file:
  ```
    PORT=8000
    MONGODB_URI=mongodb://localhost:27017/urlshortener
  ```

## Deployment

- The application is deployed on https://localhost:3000. Please visit the deployed URL to access the API.

## Getting Started

- Clone the repository:
  ```
    git clone https://github.com/yourusername/url-shortener.git
    cd url-shortener
  ```
- Install dependencies:
  ```
    pnpm install
  ```
- Run the application:
  ```
    pnpm start
  ```
- Run in development mode:
  ```
    pnpm run dev
  ```

## Evaluation Criteria

- Code Quality: Clean and modular code with appropriate use of middlewares.
- MongoDB Usage: Efficient schema design and use of indexes.
- Error Handling: Graceful handling of invalid inputs or server/database errors.
- Documentation: Clear API documentation.
