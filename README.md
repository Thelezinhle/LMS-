# iNurture Learning Management System

A comprehensive Learning Management System (LMS) built for educational institutions to manage courses, assessments, and student progress.

## Overview

iNurture LMS is a full-stack web application designed to facilitate online learning and course management. It provides features for students, instructors, and administrators to interact within an educational environment.

## Features

### For Students
- Dashboard with personalized learning overview
- Course enrollment and progress tracking
- Assessment and quiz submission
- Grade viewing and analytics
- Direct messaging with instructors
- Calendar for assignment deadlines
- Certificate generation upon course completion

### For Instructors
- Course creation and management
- Assessment and quiz creation
- Student progress monitoring
- Resource upload and management
- Grade assignment and feedback
- Student communication tools

### For Administrators
- Institution management
- User management
- Analytics and reporting
- System configuration

## Technology Stack

### Backend
- **API Server**: Node.js with Express.js
- **AI Services**: Python with Flask
- **Database**: MongoDB (configured via environment)
- **File Storage**: Google Cloud Storage
- **Authentication**: JWT-based authentication

### Frontend
- **Framework**: Vanilla JavaScript (ES6 Modules)
- **Styling**: CSS3 with custom design system
- **Architecture**: Component-based modular structure

## Project Structure

```
LMS/
├── API/                    # Node.js backend server
│   ├── config/             # Database and cloud storage configuration
│   ├── models/             # MongoDB models
│   ├── routes/             # API route handlers
│   ├── uploads/            # File upload directories
│   ├── Utils/              # Utility functions
│   └── app.js              # Main server entry point
│
├── AI/                     # Python AI services
│   ├── app.py              # Flask AI server
│   └── auth.py             # AI authentication
│
├── UI/                     # Frontend application
│   ├── Dashboard/          # Main dashboard application
│   │   ├── Components/     # Reusable UI components
│   │   ├── styles/         # CSS stylesheets
│   │   ├── utils/          # JavaScript utilities
│   │   ├── Home/           # Home tab module
│   │   ├── Courses/        # Course management module
│   │   ├── Assessments/    # Assessment module
│   │   ├── Messages/       # Messaging module
│   │   ├── Calendar/       # Calendar module
│   │   └── Profile/        # User profile module
│   ├── Login/              # Authentication pages
│   └── images/             # Static images
│
└── Documents/              # Documentation
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- MongoDB instance
- Google Cloud Storage account (for file uploads)

### Backend Setup

1. Navigate to the API directory:
   ```bash
   cd API
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GCS_BUCKET=your_gcs_bucket_name
   ```

4. Start the server:
   ```bash
   npm start
   ```

### AI Service Setup

1. Navigate to the AI directory:
   ```bash
   cd AI
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the AI server:
   ```bash
   python app.py
   ```

### Frontend Setup

The frontend is a static application. Serve the UI folder using any web server:

```bash
npx serve UI
```

Or open `UI/Dashboard/InternDashboard.html` directly in a browser for development.

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Password recovery

### Courses
- `GET /api/courses` - List all courses
- `POST /api/courses` - Create new course
- `GET /api/courses/:id` - Get course details
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Assessments
- `GET /api/assessments` - List assessments
- `POST /api/assessments` - Create assessment
- `POST /api/submissions` - Submit assessment

### Resources
- `GET /api/resources` - List resources
- `POST /api/resources` - Upload resource

## Frontend Components

The frontend includes a modular component system:

- **Notification.js** - Toast notification system
- **Modal.js** - Dialog and modal components
- **Loading.js** - Loading spinners and skeleton screens
- **Cards.js** - Reusable card components
- **formValidation.js** - Form validation utilities
- **helpers.js** - Common utility functions
- **responsive.js** - Responsive design utilities

## Configuration

### Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `GCS_BUCKET` | Google Cloud Storage bucket name |
| `PORT` | Server port (default: 3000) |

## Development

### Code Style
- ES6+ JavaScript syntax
- Modular component architecture
- CSS custom properties for theming

### Adding New Components
1. Create component file in `UI/Dashboard/Components/`
2. Export component functions
3. Import in main dashboard file

## License

This project is proprietary software developed for iNurture educational platform.

## Contact

For questions or support, please contact the development team.

---

Developed by Thelezinhle
