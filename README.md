# A2 Developers - Modern Web Development Agency

A modern, responsive website for A2 Developers, showcasing our services and allowing potential clients to book demos. Built with React, Node.js, and MongoDB.

## 🌟 Features

- 🎨 Modern, responsive design using Tailwind CSS
- 📱 Mobile-first approach with hamburger menu
- 📝 Interactive demo booking form
- 🔄 Real-time form validation
- 📊 MongoDB integration for demo requests
- 🚀 Deployed on Vercel
- 🔒 Secure API endpoints
- 📈 Analytics ready

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB account (for database)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/deepanshu089/a2-developers.git
   cd a2-developers
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

4. Create environment files:

   Frontend (.env):
   ```
   VITE_API_URL=http://localhost:5000
   ```

   Backend (.env):
   ```
   MONGO_URI=your_mongodb_connection_string
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

### Development

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Project Structure

```
a2-developers/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── styles/        # Global styles
│   └── App.jsx        # Main app component
├── backend/
│   ├── server.js      # Express server
│   ├── models/        # MongoDB models
│   └── routes/        # API routes
├── public/            # Static assets
└── package.json       # Project dependencies
```

## 🚀 Deployment

### Backend Deployment (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel:
   - `MONGO_URI`
   - `NODE_ENV=production`
   - `FRONTEND_URL`

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables:
   - `VITE_API_URL` (your backend URL)

## 📚 API Documentation

### Endpoints

1. **Health Check**
   - `GET /api/health`
   - Returns server status

2. **Book Demo**
   - `POST /api/book-demo`
   - Books a new demo request

3. **List Demos**
   - `GET /api/demos`
   - Returns all demo requests

For detailed API documentation, see [backend/README.md](backend/README.md)

## 🔧 Environment Variables

### Frontend
- `VITE_API_URL`: Backend API URL

### Backend
- `MONGO_URI`: MongoDB connection string
- `NODE_ENV`: Environment (development/production)
- `FRONTEND_URL`: Frontend application URL

## 🧪 Testing

1. Test the health endpoint:
   ```bash
   curl http://localhost:5000/api/health
   ```

2. Test demo booking:
   ```bash
   curl -X POST http://localhost:5000/api/book-demo \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com"}'
   ```

## 🔍 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure CORS is properly configured in backend
   - Check frontend API URL configuration

2. **MongoDB Connection Issues**
   - Verify MongoDB connection string
   - Check network connectivity

3. **Environment Variables**
   - Ensure all required variables are set
   - Check for typos in variable names

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- Deepanshu - [GitHub](https://github.com/deepanshu089)

## 📞 Contact

Project Link: [https://github.com/deepanshu089/a2-developers](https://github.com/deepanshu089/a2-developers)

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Vercel](https://vercel.com/)
