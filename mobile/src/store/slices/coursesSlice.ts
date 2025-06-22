import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  type: 'video' | 'text' | 'quiz' | 'code' | 'interactive';
  duration: number; // in minutes
  xpReward: number;
  order: number;
  completed: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number; // in hours
  price: number;
  isPremium: boolean;
  lessons: Lesson[];
  progress: number; // 0-100
  enrolled: boolean;
  completed: boolean;
  rating: number;
  totalRatings: number;
  instructor: {
    id: string;
    name: string;
    avatar: string;
  };
  thumbnail: string;
  tags: string[];
}

interface CoursesState {
  courses: Course[];
  enrolledCourses: Course[];
  featuredCourses: Course[];
  categories: string[];
  selectedCategory: string | null;
  searchQuery: string;
  loading: boolean;
  error: string | null;
}

const initialState: CoursesState = {
  courses: [],
  enrolledCourses: [],
  featuredCourses: [],
  categories: [],
  selectedCategory: null,
  searchQuery: '',
  loading: false,
  error: null,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
    setEnrolledCourses: (state, action: PayloadAction<Course[]>) => {
      state.enrolledCourses = action.payload;
    },
    setFeaturedCourses: (state, action: PayloadAction<Course[]>) => {
      state.featuredCourses = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    enrollInCourse: (state, action: PayloadAction<string>) => {
      const courseId = action.payload;
      const course = state.courses.find(c => c.id === courseId);
      if (course) {
        course.enrolled = true;
        state.enrolledCourses.push(course);
      }
    },
    updateCourseProgress: (state, action: PayloadAction<{ courseId: string; progress: number }>) => {
      const { courseId, progress } = action.payload;
      const course = state.enrolledCourses.find(c => c.id === courseId);
      if (course) {
        course.progress = progress;
        if (progress >= 100) {
          course.completed = true;
        }
      }
    },
    completeLessons: (state, action: PayloadAction<{ courseId: string; lessonId: string }>) => {
      const { courseId, lessonId } = action.payload;
      const course = state.enrolledCourses.find(c => c.id === courseId);
      if (course) {
        const lesson = course.lessons.find(l => l.id === lessonId);
        if (lesson) {
          lesson.completed = true;
          
          // Update course progress
          const completedLessons = course.lessons.filter(l => l.completed).length;
          course.progress = Math.round((completedLessons / course.lessons.length) * 100);
          
          if (course.progress >= 100) {
            course.completed = true;
          }
        }
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCourses,
  setEnrolledCourses,
  setFeaturedCourses,
  setCategories,
  setSelectedCategory,
  setSearchQuery,
  enrollInCourse,
  updateCourseProgress,
  completeLessons,
  setLoading,
  setError,
} = coursesSlice.actions;

export default coursesSlice.reducer;
