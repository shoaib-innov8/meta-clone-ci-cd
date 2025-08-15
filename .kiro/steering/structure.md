# Project Structure

## Directory Organization

```
metaverse-BE/
├── index.js              # Main application entry point
├── package.json          # Dependencies and scripts
├── seed.js               # Database seeding script
├── docker-compose.yml    # Container orchestration
├── Dockerfile           # Container build instructions
├── models/              # Mongoose data models
│   └── User.js          # User schema with pre-save hooks
├── routes/              # Express route handlers
│   └── userRoutes.js    # User CRUD operations
├── middleware/          # Custom middleware functions
│   └── auth.js          # JWT authentication middleware
└── utils/               # Utility functions
    └── s3Upload.js      # AWS S3 file upload helper
```

## Architecture Patterns

### MVC Structure
- **Models**: Mongoose schemas in `/models/` with validation and pre-save hooks
- **Routes**: Express routers in `/routes/` handling HTTP endpoints
- **Middleware**: Authentication and validation logic in `/middleware/`

### Code Conventions
- Use `async/await` for asynchronous operations
- Always exclude passwords from API responses using `.select('-password')`
- Handle errors with try/catch blocks and return appropriate HTTP status codes
- Use destructuring for request body parameters
- Apply middleware at route level rather than globally where possible

### File Naming
- Use camelCase for JavaScript files
- Model files should be singular and capitalized (e.g., `User.js`)
- Route files should be plural with "Routes" suffix (e.g., `userRoutes.js`)
- Utility files should be descriptive of their function (e.g., `s3Upload.js`)

### Database Patterns
- Use Mongoose schemas with timestamps enabled
- Implement password hashing in pre-save hooks
- Use unique constraints for email fields
- Mark required vs optional fields explicitly in schema definitions