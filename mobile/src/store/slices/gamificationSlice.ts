import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  unlockedAt?: string;
}

export interface SkillProgress {
  skillId: string;
  skillName: string;
  level: number;
  xp: number;
  xpToNext: number;
  totalXp: number;
}

interface GamificationState {
  level: number;
  totalXp: number;
  xpToNext: number;
  skillCoins: number;
  streak: number;
  lastActivityDate: string | null;
  achievements: Achievement[];
  skillProgress: SkillProgress[];
  dailyChallengeCompleted: boolean;
  weeklyProgress: {
    lessonsCompleted: number;
    target: number;
  };
}

const initialState: GamificationState = {
  level: 1,
  totalXp: 0,
  xpToNext: 100,
  skillCoins: 0,
  streak: 0,
  lastActivityDate: null,
  achievements: [],
  skillProgress: [],
  dailyChallengeCompleted: false,
  weeklyProgress: {
    lessonsCompleted: 0,
    target: 7,
  },
};

const gamificationSlice = createSlice({
  name: 'gamification',
  initialState,
  reducers: {
    addXp: (state, action: PayloadAction<{ amount: number; skillId?: string }>) => {
      const { amount, skillId } = action.payload;
      
      // Add to total XP
      state.totalXp += amount;
      
      // Check for level up
      while (state.totalXp >= state.xpToNext) {
        state.totalXp -= state.xpToNext;
        state.level += 1;
        state.xpToNext = Math.floor(state.xpToNext * 1.2); // Increase XP requirement by 20%
        state.skillCoins += state.level * 10; // Bonus coins for leveling up
      }
      
      // Update skill-specific progress if skillId provided
      if (skillId) {
        const skillIndex = state.skillProgress.findIndex(skill => skill.skillId === skillId);
        if (skillIndex !== -1) {
          const skill = state.skillProgress[skillIndex];
          skill.totalXp += amount;
          skill.xp += amount;
          
          // Check for skill level up
          while (skill.xp >= skill.xpToNext) {
            skill.xp -= skill.xpToNext;
            skill.level += 1;
            skill.xpToNext = Math.floor(skill.xpToNext * 1.15);
          }
        }
      }
    },
    
    addSkillCoins: (state, action: PayloadAction<number>) => {
      state.skillCoins += action.payload;
    },
    
    spendSkillCoins: (state, action: PayloadAction<number>) => {
      if (state.skillCoins >= action.payload) {
        state.skillCoins -= action.payload;
      }
    },
    
    updateStreak: (state, action: PayloadAction<string>) => {
      const today = action.payload;
      const lastDate = state.lastActivityDate;
      
      if (!lastDate) {
        state.streak = 1;
      } else {
        const daysDiff = Math.floor((new Date(today).getTime() - new Date(lastDate).getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 1) {
          state.streak += 1;
        } else if (daysDiff > 1) {
          state.streak = 1;
        }
        // If daysDiff === 0, keep current streak (same day)
      }
      
      state.lastActivityDate = today;
    },
    
    unlockAchievement: (state, action: PayloadAction<Achievement>) => {
      const achievement = { ...action.payload, unlockedAt: new Date().toISOString() };
      state.achievements.push(achievement);
      state.skillCoins += achievement.points;
    },
    
    addSkillProgress: (state, action: PayloadAction<Omit<SkillProgress, 'totalXp'>>) => {
      const newSkill = {
        ...action.payload,
        totalXp: 0,
      };
      state.skillProgress.push(newSkill);
    },
    
    completeDailyChallenge: (state) => {
      state.dailyChallengeCompleted = true;
    },
    
    resetDailyChallenge: (state) => {
      state.dailyChallengeCompleted = false;
    },
    
    updateWeeklyProgress: (state, action: PayloadAction<{ completed: number; target?: number }>) => {
      state.weeklyProgress.lessonsCompleted = action.payload.completed;
      if (action.payload.target) {
        state.weeklyProgress.target = action.payload.target;
      }
    },
    
    resetWeeklyProgress: (state) => {
      state.weeklyProgress.lessonsCompleted = 0;
    },
  },
});

export const {
  addXp,
  addSkillCoins,
  spendSkillCoins,
  updateStreak,
  unlockAchievement,
  addSkillProgress,
  completeDailyChallenge,
  resetDailyChallenge,
  updateWeeklyProgress,
  resetWeeklyProgress,
} = gamificationSlice.actions;

export default gamificationSlice.reducer;
