# SkillQuest Mobile App 🎯

A full-stack, gamified learning mobile application built with React Native + Expo (frontend) and Node.js + Express (backend). Features real learning paths, AI-powered chat integration, and multilingual support.

## 🚀 Features

### ✅ Completed Features
- **Cross-platform mobile app** (iOS, Android, Web) using React Native + Expo
- **Full-stack architecture** with TypeScript throughout
- **Redux state management** with comprehensive slices
- **Real learning content** with structured courses, lessons, and quizzes
- **AI-powered tutor** with OpenRouter integration for personalized learning
- **Gamification system** with XP, achievements, and progress tracking
- **User authentication** with JWT tokens
- **Responsive navigation** with tab and stack navigators
- **REST API backend** with Express.js and middleware
- **Comprehensive documentation** and setup guides

### 🎯 Core Functionality
- **Learning Paths**: Structured courses from beginner to advanced
- **Interactive Lessons**: Video, text, code examples, and exercises
- **Quizzes & Assessments**: Multiple choice, coding challenges, projects
- **AI Chat Tutor**: Multilingual support with context-aware responses
- **Progress Tracking**: XP system, streaks, and completion tracking
- **User Profiles**: Achievements, certificates, and learning statistics

## 🏗️ Architecture

```
skillquest-mobile-app/
├── mobile/                 # React Native + Expo frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── screens/        # Screen components
│   │   ├── navigation/     # Navigation setup
│   │   ├── store/          # Redux store and slices
│   │   ├── data/           # Static data and content
│   │   └── types/          # TypeScript type definitions
│   ├── package.json
│   └── app.json
├── backend/                # Node.js + Express API
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   └── config.ts       # Configuration
│   └── package.json
├── docs/                   # Documentation
└── README.md
```

## 🛠️ Tech Stack

### Frontend (Mobile)
- **React Native** + **Expo** - Cross-platform mobile development
- **TypeScript** - Type safety and better developer experience
- **Redux Toolkit** - State management
- **React Navigation** - Navigation between screens

### Backend (API)
- **Node.js** + **Express.js** - REST API server
- **TypeScript** - Full-stack type safety
- **CORS** - Cross-origin resource sharing
- **JWT** - Authentication tokens
- **OpenRouter** - AI integration for chat tutor

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (macOS) or Android Studio/Emulator

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/skillquest-mobile-app.git
cd skillquest-mobile-app
```

### 2. Install Dependencies
```bash
# Install mobile app dependencies
cd mobile
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 3. Environment Setup
```bash
# Mobile app environment (.env file already configured)
cd mobile
# OPENROUTER_API_KEY is set to demo value

# Backend runs on port 3002 to avoid conflicts
cd ../backend
# No additional environment setup needed for demo
```

### 4. Start Development Servers
```bash
# Terminal 1: Start backend server
cd backend
npm run dev
# Server runs on http://localhost:3002

# Terminal 2: Start mobile app
cd mobile
npx expo start
# Choose platform: iOS (i), Android (a), or Web (w)
```

### 5. Test the Application
- **Web**: Open the Expo development server URL (usually http://localhost:8081)
- **Mobile**: Scan QR code with Expo Go app
- **Test Login**: Use `test@example.com` / `password`

## 📱 Current Status

### ✅ Working Features
- Mobile app launches on web, iOS, and Android
- Backend API running on port 3002
- User authentication with test credentials
- Complete navigation between all screens
- Redux state management working
- Learning content data structure implemented
- AI chat component ready (with demo API key)

### 🔧 Recently Fixed
- All TypeScript compilation errors resolved
- Fixed import paths in learning slice
- Updated API configuration to use port 3002
- Replaced environment variable imports with config objects
- All screens and components properly connected

## 📚 Learning Content Available

### 1. Web Development Fundamentals
- HTML & CSS Fundamentals
- JavaScript Programming
- Interactive lessons with code examples
- Quizzes and practical projects

### 2. React Native Mobile Development
- Environment setup and basics
- Component development
- Navigation and state management

### 3. AI & Machine Learning (Structure Ready)
- Python fundamentals for AI
- Machine learning concepts
- Neural networks and deep learning

## 🤖 AI Integration

The app includes an AI tutor component that:
- Provides personalized learning assistance
- Supports multiple languages
- Offers context-aware responses based on current lesson
- Uses OpenRouter API for chat completions

## 🎮 Gamification System

- **XP Points**: Earned through completing lessons and quizzes
- **Achievements**: Unlocked for various learning milestones
- **Progress Tracking**: Visual progress bars and completion stats
- **Streaks**: Daily learning streak tracking
- **Leaderboards**: Compare progress with other learners

## 🧪 Testing

### Backend API Endpoints
```bash
# Health check
curl http://localhost:3002/

# Test login
curl -X POST http://localhost:3002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# Get courses
curl http://localhost:3002/api/courses
```

### Mobile App
- Launch on web browser for quick testing
- Use Expo Go app for mobile device testing
- Test navigation between all screens
- Verify login functionality

## 📁 Key Files

### Mobile App
- `mobile/App.tsx` - Main app component
- `mobile/src/navigation/` - Navigation setup
- `mobile/src/store/` - Redux store and slices
- `mobile/src/data/learningContent.ts` - Learning content data
- `mobile/src/components/AITutor.tsx` - AI chat component

### Backend
- `backend/src/index.ts` - Main server file
- `backend/src/routes/` - API route definitions
- `backend/src/middleware/` - Express middleware

## 🚀 Next Steps

### Immediate Enhancements
1. Add database integration (MongoDB/PostgreSQL)
2. Implement real user registration
3. Add more interactive lesson types
4. Expand learning content library
5. Enhance AI tutor with better context awareness

### Future Features
1. Offline learning support
2. Social features (study groups, forums)
3. Live coding sessions
4. Certification system
5. Corporate training modules

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Expo team for the excellent development platform
- React Native community for continuous innovation
- OpenRouter for AI integration capabilities

---

**SkillQuest** - Making quality education accessible to everyone, everywhere. 🌍📚
