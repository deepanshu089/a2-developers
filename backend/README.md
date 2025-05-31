# A2 Developers Backend

The backend server for A2 Developers website, handling demo bookings and API requests.

## Features

- 🔒 Secure API endpoints
- 📊 MongoDB integration
- 🔄 CORS configuration
- 📝 Request logging
- 🏥 Health check endpoint
- 🚀 Serverless deployment ready

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

## API Documentation

### Endpoints

1. **Health Check**
   - `GET /api/health`
   - Returns server status and MongoDB connection state
   - Response:
     ```json
     {
       "status": "ok",
       "timestamp": "2024-03-14T12:00:00.000Z",
       "mongodb": "connected",
       "environment": "production"
     }
     ```

2. **Book Demo**
   - `POST /api/book-demo`
   - Books a new demo request
   - Request Body:
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "company": "Example Corp",
       "message": "Interested in your services"
     }
     ```
   - Response:
     ```json
     {
       "message": "Demo booked successfully!",
       "demo": {
         "id": "demo_id",
         "name": "John Doe",
         "email": "john@example.com",
         "company": "Example Corp",
         "createdAt": "2024-03-14T12:00:00.000Z"
       }
     }
     ```

3. **List Demos**
   - `GET /api/demos`
   - Returns all demo requests
   - Response:
     ```json
     {
       "count": 1,
       "demos": [
         {
           "id": "demo_id",
           "name": "John Doe",
           "email": "john@example.com",
           "company": "Example Corp",
           "createdAt": "2024-03-14T12:00:00.000Z"
         }
       ]
     }
     ```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file:
   ```
   MONGO_URI=your_mongodb_connection_string
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## Deployment

### Vercel Deployment

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Configure environment variables in Vercel dashboard:
   - `MONGO_URI`
   - `NODE_ENV=production`
   - `FRONTEND_URL`

## Environment Variables

- `MONGO_URI`: MongoDB connection string
- `NODE_ENV`: Environment (development/production)
- `FRONTEND_URL`: Frontend application URL

## Error Handling

The server includes comprehensive error handling:
- 400: Bad Request (missing required fields)
- 404: Not Found
- 500: Internal Server Error

## Logging

The server logs:
- All incoming requests
- Request headers and body
- MongoDB connection status
- Error details
- Environment configuration

## Security

- CORS enabled with specific origins
- Request validation
- Error message sanitization
- Environment variable protection

## Development

1. Start development server:
   ```bash
   npm run dev
   ```

2. Server will run on `http://localhost:5000`

## Testing

1. Test health endpoint:
   ```bash
   curl http://localhost:5000/api/health
   ```

2. Test demo booking:
   ```bash
   curl -X POST http://localhost:5000/api/book-demo \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com"}'
   ```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License. 