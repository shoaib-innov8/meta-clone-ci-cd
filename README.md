# metaverse-BE

## Description
This is the backend for the Metaverse project. It provides APIs for user management, including registration, login, and CRUD operations.

## Prerequisites
- Docker
- Docker Compose

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/shoaib-innov8/metaverse-BE
   cd metaverse-BE
   ```

2. Build and start the Docker containers:
   ```bash
   docker-compose up --build -d
   ```

3. Seed the database (optional):
   ```bash
   docker compose run --rm app npm run seed
   ```
   This will populate the database with initial data for testing purposes.

4. The server will run at `http://localhost:4000`.

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
    "age": 25,
    "company": "TechCorp",
    "department": "Engineering",
    "specification": "Backend Developer",
    "about": "Experienced in building scalable APIs."
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
      "company": "TechCorp",
      "department": "Engineering",
      "specification": "Backend Developer",
      "about": "Experienced in building scalable APIs.",
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
      "age": 25,
      "company": "TechCorp",
      "department": "Engineering",
      "specification": "Backend Developer",
      "about": "Experienced in building scalable APIs."
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
    "age": 25,
    "company": "TechCorp",
    "department": "Engineering",
    "specification": "Backend Developer",
    "about": "Experienced in building scalable APIs."
  }
  ```

#### 5. Update User
- **URL:** `/:id`
- **Method:** `PUT`
- **Body:** (example)
  ```json
  {
    "name": "John Updated",
    "company": "NewTechCorp"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "userId",
    "name": "John Updated",
    "email": "john@example.com",
    "age": 25,
    "company": "NewTechCorp",
    "department": "Engineering",
    "specification": "Backend Developer",
    "about": "Experienced in building scalable APIs."
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
- Use a tool like Postman or cURL to test the APIs.
- Ensure Docker and Docker Compose are installed and running on your system.