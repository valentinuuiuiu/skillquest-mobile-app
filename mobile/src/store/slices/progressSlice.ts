import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LessonProgress {
  lessonId: string;
  courseId: string;
  completed: boolean;
  score?: number;
  timeSpent: number; // in minutes
  completedAt?: string;
}

interface QuizResult {
  quizId: string;
  lessonId: string;
  courseId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  completedAt: string;
  timeSpent: number;
}

interface ProgressState {
  lessonProgress: LessonProgress[];
  quizResults: QuizResult[];
  dailyStats: {
    date: string;
    lessonsCompleted: number;
    timeSpent: number;
    xpEarned: number;
  }[];
  weeklyStats: {
    week: string;
    lessonsCompleted: number;
    timeSpent: number;
    xpEarned: number;
  }[];
  monthlyStats: {
    month: string;
    lessonsCompleted: number;
    timeSpent: number;
    xpEarned: number;
  }[];
  loading: boolean;
  error: string | null;
}

const initialState: ProgressState = {
  lessonProgress: [],
  quizResults: [],
  dailyStats: [],
  weeklyStats: [],
  monthlyStats: [],
  loading: false,
  error: null,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    addLessonProgress: (state, action: PayloadAction<LessonProgress>) => {
      const existing = state.lessonProgress.findIndex(
        p => p.lessonId === action.payload.lessonId
      );
      
      if (existing !== -1) {
        state.lessonProgress[existing] = action.payload;
      } else {
        state.lessonProgress.push(action.payload);
      }
    },
    
    addQuizResult: (state, action: PayloadAction<QuizResult>) => {
      state.quizResults.push(action.payload);
    },
    
    updateDailyStats: (state, action: PayloadAction<{
      date: string;
      lessonsCompleted?: number;
      timeSpent?: number;
      xpEarned?: number;
    }>) => {
      const { date, lessonsCompleted = 0, timeSpent = 0, xpEarned = 0 } = action.payload;
      const existing = state.dailyStats.findIndex(s => s.date === date);
      
      if (existing !== -1) {
        const stats = state.dailyStats[existing];
        stats.lessonsCompleted += lessonsCompleted;
        stats.timeSpent += timeSpent;
        stats.xpEarned += xpEarned;
      } else {
        state.dailyStats.push({
          date,
          lessonsCompleted,
          timeSpent,
          xpEarned,
        });
      }
    },
    
    updateWeeklyStats: (state, action: PayloadAction<{
      week: string;
      lessonsCompleted?: number;
      timeSpent?: number;
      xpEarned?: number;
    }>) => {
      const { week, lessonsCompleted = 0, timeSpent = 0, xpEarned = 0 } = action.payload;
      const existing = state.weeklyStats.findIndex(s => s.week === week);
      
      if (existing !== -1) {
        const stats = state.weeklyStats[existing];
        stats.lessonsCompleted += lessonsCompleted;
        stats.timeSpent += timeSpent;
        stats.xpEarned += xpEarned;
      } else {
        state.weeklyStats.push({
          week,
          lessonsCompleted,
          timeSpent,
          xpEarned,
        });
      }
    },
    
    updateMonthlyStats: (state, action: PayloadAction<{
      month: string;
      lessonsCompleted?: number;
      timeSpent?: number;
      xpEarned?: number;
    }>) => {
      const { month, lessonsCompleted = 0, timeSpent = 0, xpEarned = 0 } = action.payload;
      const existing = state.monthlyStats.findIndex(s => s.month === month);
      
      if (existing !== -1) {
        const stats = state.monthlyStats[existing];
        stats.lessonsCompleted += lessonsCompleted;
        stats.timeSpent += timeSpent;
        stats.xpEarned += xpEarned;
      } else {
        state.monthlyStats.push({
          month,
          lessonsCompleted,
          timeSpent,
          xpEarned,
        });
      }
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    clearProgress: (state) => {
      state.lessonProgress = [];
      state.quizResults = [];
      state.dailyStats = [];
      state.weeklyStats = [];
      state.monthlyStats = [];
    },
  },
});

export const {
  addLessonProgress,
  addQuizResult,
  updateDailyStats,
  updateWeeklyStats,
  updateMonthlyStats,
  setLoading,
  setError,
  clearProgress,
} = progressSlice.actions;

export default progressSlice.reducer;
