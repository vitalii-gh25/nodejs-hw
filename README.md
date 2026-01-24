# Notes API

A simple RESTful API for managing notes, built with **Node.js**, **Express**, and **MongoDB** (via Mongoose).

### Features

- Create, read, update, and delete notes (CRUD operations)
- Notes have `title`, `content`, and `tag` fields
- Automatic timestamps (`createdAt` and `updatedAt`)
- Centralized error handling
- 404 handling for unknown routes
- HTTP request logging via `pino-http`

### Tech Stack

- Node.js
- Express
- MongoDB with Mongoose
- dotenv for environment variables
- pino-http for logging
- http-errors for standardized HTTP errors
- CORS enabled

### Running the Server

npm run dev
