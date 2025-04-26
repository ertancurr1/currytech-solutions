# CurryTech Solutions - Full Stack Business Website

A modern, responsive website for CurryTech Solutions, a fictional tech startup offering various IT services.

## Features

- Responsive design with mobile-first approach
- Dynamic content loading via API
- User authentication (register/login)
- Contact form with validation
- Blog section with dynamic articles
- Testimonials section
- Dark mode toggle
- And more!

## Tech Stack

- **Frontend**: React.js, React Router, Styled Components
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **API Integration**: Fetch API, Axios

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Setup Instructions

1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/currytech-solutions.git
cd currytech-solutions
```

2. Install dependencies for root, frontend, and backend

`npm run install-all`

3. Set up environment variables

- Create a `.env` file in the `backend` directory and add:

````PORT=5000
MONGO_URI=mongodb://localhost:27017/currytech
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
NODE_ENV=development```
- Create a `.env` file in the `frontend` directory and add:
```REACT_APP_API_URL=http://localhost:5000/api```

4. Start the development server (frontend & backend concurrently)

```npm run dev```

5. Access the application
- Frontend: `https://localhost:3000`
- Backend API: ```https://localhost:5000/api`

## Project Structure

- `/frontend` - React.js frontend application
- `/backend` - Node.js/Express backend API

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Contact

- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin only)
- `GET /api/contact/:id` - Get single contact (admin only)
- `PUT /api/contact/:id` - Update contact (admin only)
- `DELETE /api/contact/:id` - Delete contact (admin only)

### Testimonials

- `GET /api/testimonials` - Get all approved testimonials
- `GET /api/testimonials/:id` - Get single testimonial
- `POST /api/testimonials` - Create new testimonial (protected)
- `PUT /api/testimonials/:id` - Update testimonial (owner/admin)
- `DELETE /api/testimonials/:id` - Delete testimonial (owner/admin)
- `GET /api/testimonials/admin` - Get all testimonials (admin only)
- `PUT /api/testimonials/:id/approve` - Approve testimonial (admin only)

## License

MIT
````
