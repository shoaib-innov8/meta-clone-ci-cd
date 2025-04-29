# metaverse-BE

## Description
This is the backend for the Metaverse project. It provides APIs for user management, including registration, login, and CRUD operations.

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd metaverse-BE
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```
   JWT_SECRET=yourSecretKey
   MONGO_URI=yourMongoDBConnectionString
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. The server will run at `http://localhost:4000`.

## API Endpoints

### Base URL
`http://localhost:4000/api/users`

### Endpoints

#### 1. Register a User
- **URL:** `/register`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "age": 25
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "name": "John Doe",
      "email": "john@example.com",
      "age": 25,
      "_id": "userId"
    }
  }
  ```

#### 2. Login a User
- **URL:** `/login`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "user": {
      "name": "John Doe",
      "email": "john@example.com",
      "age": 25,
      "_id": "userId"
    },
    "token": "jwtToken"
  }
  ```

#### 3. Get All Users
- **URL:** `/`
- **Method:** `GET`
- **Response:**
  ```json
  [
    {
      "_id": "userId",
      "name": "John Doe",
      "email": "john@example.com",
      "age": 25
    }
  ]
  ```

#### 4. Get User by ID
- **URL:** `/:id`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "_id": "userId",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25
  }
  ```

#### 5. Update User
- **URL:** `/:id`
- **Method:** `PUT`
- **Body:** (example)
  ```json
  {
    "name": "John Updated"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "userId",
    "name": "John Updated",
    "email": "john@example.com",
    "age": 25
  }
  ```

#### 6. Delete User
- **URL:** `/:id`
- **Method:** `DELETE`
- **Response:**
  ```json
  {
    "message": "User deleted successfully"
  }
  ```

## Notes
- Replace `yourSecretKey` and `yourMongoDBConnectionString` in the `.env` file with your actual values.
- Use a tool like Postman or cURL to test the APIs.