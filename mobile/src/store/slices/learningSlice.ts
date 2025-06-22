import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { LEARNING_PATHS, Course, Lesson, Quiz, Project, LearningPath } from '../../data/learningContent';

interface CourseState {
  learningPaths: LearningPath[];
  currentCourse: Course | null;
  currentLesson: Lesson | null;
  userProgress: UserProgress;
  achievements: Achievement[];
  loading: boolean;
  error: string | null;
}

interface UserProgress {
  coursesStarted: string[];
  coursesCompleted: string[];
  lessonsCompleted: string[];
  quizzesPassed: string[];
  projectsCompleted: string[];
  totalXpEarned: number;
  currentStreak: number;
  longestStreak: number;
  studyTimeMinutes: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  unlocked: boolean;
  unlockedAt?: string;
}

const initialState: CourseState = {
  learningPaths: LEARNING_PATHS,
  currentCourse: null,
  currentLesson: null,
  userProgress: {
    coursesStarted: ['js-fundamentals'],
    coursesCompleted: [],
    lessonsCompleted: ['js-intro', 'variables-datatypes'],
    quizzesPassed: [],
    projectsCompleted: [],
    totalXpEarned: 150,
    currentStreak: 3,
    longestStreak: 7,
    studyTimeMinutes: 45
  },
  achievements: [
    {
      id: 'first-lesson',
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: '🎯',
      rarity: 'common',
      points: 10,
      unlocked: true,
      unlockedAt: new Date().toISOString()
    },
    {
      id: 'early-bird',
      title: 'Early Bird',
      description: 'Study for 3 days in a row',
      icon: '🌅',
      rarity: 'common',
      points: 25,
      unlocked: true,
      unlockedAt: new Date().toISOString()
    }
  ],
  loading: false,
  error: null,
};

// Async thunks for course operations
export const startCourse = createAsyncThunk(
  'courses/startCourse',
  async (courseId: string, { getState }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return { courseId, startedAt: new Date().toISOString() };
  }
);

export const completeLesson = createAsyncThunk(
  'courses/completeLesson',
  async ({ lessonId, xpEarned }: { lessonId: string; xpEarned: number }, { getState, dispatch }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Check for achievements
    const state = getState() as { courses: CourseState };
    const completedLessons = [...state.courses.userProgress.lessonsCompleted, lessonId];
    
    // Achievement logic
    let newAchievements: Achievement[] = [];
    
    if (completedLessons.length === 5) {
      newAchievements.push({
        id: 'lesson-explorer',
        title: 'Lesson Explorer',
        description: 'Complete 5 lessons',
        icon: '🗺️',
        rarity: 'common',
        points: 50,
        unlocked: true,
        unlockedAt: new Date().toISOString()
      });
    }
    
    if (completedLessons.length === 25) {
      newAchievements.push({
        id: 'dedicated-learner',
        title: 'Dedicated Learner',
        description: 'Complete 25 lessons',
        icon: '📚',
        rarity: 'rare',
        points: 150,
        unlocked: true,
        unlockedAt: new Date().toISOString()
      });
    }
    
    return { 
      lessonId, 
      xpEarned, 
      completedAt: new Date().toISOString(),
      newAchievements 
    };
  }
);

export const submitQuizAttempt = createAsyncThunk(
  'courses/submitQuizAttempt',
  async ({ quizId, answers, score }: { quizId: string; answers: any; score: number }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const passed = score >= 80; // 80% passing score
    const xpEarned = passed ? score : Math.floor(score / 2);
    
    return {
      quizId,
      score,
      passed,
      xpEarned,
      completedAt: new Date().toISOString()
    };
  }
);

export const completeProject = createAsyncThunk(
  'courses/completeProject',
  async ({ projectId, submissionData }: { projectId: string; submissionData: any }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const xpEarned = 200; // Projects give substantial XP
    
    return {
      projectId,
      xpEarned,
      completedAt: new Date().toISOString(),
      submissionData
    };
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCurrentCourse: (state, action: PayloadAction<string>) => {
      const courseId = action.payload;
      for (const path of state.learningPaths) {
        const course = path.courses.find(c => c.id === courseId);
        if (course) {
          state.currentCourse = course;
          break;
        }
      }
    },
    
    setCurrentLesson: (state, action: PayloadAction<string>) => {
      const lessonId = action.payload;
      if (state.currentCourse) {
        const lesson = state.currentCourse.lessons.find(l => l.id === lessonId);
        if (lesson) {
          state.currentLesson = lesson;
        }
      }
    },
    
    updateStudyTime: (state, action: PayloadAction<number>) => {
      state.userProgress.studyTimeMinutes += action.payload;
    },
    
    updateStreak: (state) => {
      state.userProgress.currentStreak += 1;
      if (state.userProgress.currentStreak > state.userProgress.longestStreak) {
        state.userProgress.longestStreak = state.userProgress.currentStreak;
      }
    },
    
    resetStreak: (state) => {
      state.userProgress.currentStreak = 0;
    },
    
    unlockAchievement: (state, action: PayloadAction<Achievement>) => {
      const existingIndex = state.achievements.findIndex(a => a.id === action.payload.id);
      if (existingIndex === -1) {
        state.achievements.push(action.payload);
        state.userProgress.totalXpEarned += action.payload.points;
      }
    }
  },
  
  extraReducers: (builder) => {
    builder
      // Start Course
      .addCase(startCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startCourse.fulfilled, (state, action) => {
        state.loading = false;
        const { courseId } = action.payload;
        if (!state.userProgress.coursesStarted.includes(courseId)) {
          state.userProgress.coursesStarted.push(courseId);
        }
      })
      .addCase(startCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to start course';
      })
      
      // Complete Lesson
      .addCase(completeLesson.pending, (state) => {
        state.loading = true;
      })
      .addCase(completeLesson.fulfilled, (state, action) => {
        state.loading = false;
        const { lessonId, xpEarned, newAchievements } = action.payload;
        
        if (!state.userProgress.lessonsCompleted.includes(lessonId)) {
          state.userProgress.lessonsCompleted.push(lessonId);
          state.userProgress.totalXpEarned += xpEarned;
        }
        
        // Add new achievements
        newAchievements.forEach(achievement => {
          if (!state.achievements.find(a => a.id === achievement.id)) {
            state.achievements.push(achievement);
            state.userProgress.totalXpEarned += achievement.points;
          }
        });
        
        // Update lesson completion in current course
        if (state.currentCourse) {
          const lesson = state.currentCourse.lessons.find(l => l.id === lessonId);
          if (lesson) {
            lesson.isCompleted = true;
          }
        }
      })
      
      // Submit Quiz
      .addCase(submitQuizAttempt.fulfilled, (state, action) => {
        const { quizId, passed, xpEarned } = action.payload;
        
        if (passed && !state.userProgress.quizzesPassed.includes(quizId)) {
          state.userProgress.quizzesPassed.push(quizId);
          state.userProgress.totalXpEarned += xpEarned;
        }
      })
      
      // Complete Project
      .addCase(completeProject.fulfilled, (state, action) => {
        const { projectId, xpEarned } = action.payload;
        
        if (!state.userProgress.projectsCompleted.includes(projectId)) {
          state.userProgress.projectsCompleted.push(projectId);
          state.userProgress.totalXpEarned += xpEarned;
        }
      });
  },
});

export const {
  setCurrentCourse,
  setCurrentLesson,
  updateStudyTime,
  updateStreak,
  resetStreak,
  unlockAchievement
} = coursesSlice.actions;

export default coursesSlice.reducer;
