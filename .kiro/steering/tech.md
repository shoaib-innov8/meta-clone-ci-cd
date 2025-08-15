# Technology Stack

## Runtime & Framework
- **Node.js** with **Express.js** framework
- **MongoDB** with **Mongoose** ODM
- **Docker** containerization with Docker Compose

## Key Dependencies
- **Authentication**: JWT (jsonwebtoken), bcrypt for password hashing
- **File Upload**: multer for multipart form handling
- **Cloud Storage**: AWS SDK v2 for S3 uploads
- **Development**: nodemon for auto-restart during development
- **Security**: CORS enabled with wildcard origin

## Environment Variables
Required environment variables:
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token signing
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `AWS_S3_BUCKET` - AWS S3 configuration

## Common Commands

### Development
```bash
npm start          # Start development server with nodemon
npm run seed       # Populate database with test data
```

### Docker Operations
```bash
docker-compose up --build -d    # Build and start containers
docker compose run --rm app npm run seed    # Run seed script in container
```

### Server Configuration
- Default port: 4000
- API base path: `/api/users`
- CORS: Enabled for all origins (`*`)