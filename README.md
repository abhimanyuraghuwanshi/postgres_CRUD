# Crud setup with elephantsql(postgres)

#start with nodemon use =>  npm start 


#Features
Nested Routing
Organize your API routes efficiently with nested routing for better path management.

ZOD Middleware for Validation
Implement middleware to handle request validation, ensuring data integrity and security.

Common Response Components
Maintain a consistent and standardized response format for improved API clarity.

Epoch/Unix Time
Utilize epoch/unix time for secure timestamping, preventing time alteration.

Multer for File Handling
Easily handle file uploads and management with Multer.

JWT Authentication
Implement JSON Web Tokens for user authentication, ensuring a single login per user.

Postgres Database
Use PostgreSQL as a reliable database with SQL injection checks in place.

CORS Protection
Enhance security by preventing external API calls with CORS configuration.

API Rate Limiting
Implement rate limiting to thwart brute force attacks and enhance security.

Morgan Logs
Leverage Morgan logs for effective backtracking and debugging.

/*
For .env setup :-

PORT = number
JWTSECRETKEY= string
JWTSECRETKEYADMIN= string
JWTSESSIONTIMEOUT= 24h
JWTSESSIONTIMEOUTFORAPP= 365d
POSTGRESURL= string
ALLOWED_ORIGINS= http://localhost:3000,http://localhost:3001,http://localhost:3002

*/
# postgres_CRUD
