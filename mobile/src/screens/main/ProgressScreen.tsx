import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

const ProgressScreen: React.FC = () => {
  const { level, totalXp, xpToNext, skillCoins, streak } = useSelector((state: RootState) => state.gamification);
  const { skillProgress } = useSelector((state: RootState) => state.gamification);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Progress</Text>
        <Text style={styles.subtitle}>Track your learning journey</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.overallStats}>
          <Text style={styles.sectionTitle}>Overall Progress</Text>
          <View style={styles.levelCard}>
            <View style={styles.levelInfo}>
              <Text style={styles.levelNumber}>Level {level}</Text>
              <Text style={styles.xpText}>{totalXp} XP</Text>
            </View>
            <View style={styles.xpProgress}>
              <View style={styles.xpBar}>
                <View 
                  style={[
                    styles.xpFill, 
                    { width: `${((totalXp % 1000) / 1000) * 100}%` }
                  ]} 
                />
              </View>
              <Text style={styles.xpToNext}>{xpToNext} XP to next level</Text>
            </View>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{skillCoins}</Text>
              <Text style={styles.statLabel}>Skill Coins</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{streak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
          </View>
        </View>

        <View style={styles.skillsSection}>
          <Text style={styles.sectionTitle}>Skills Progress</Text>
          {skillProgress.map((skill) => (
            <View key={skill.skillId} style={styles.skillCard}>
              <View style={styles.skillHeader}>
                <Text style={styles.skillName}>{skill.skillName}</Text>
                <Text style={styles.skillLevel}>Level {skill.level}</Text>
              </View>
              <View style={styles.skillProgress}>
                <View style={styles.skillProgressBar}>
                  <View 
                    style={[
                      styles.skillProgressFill, 
                      { width: `${(skill.xp / skill.xpToNext) * 100}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.skillXp}>
                  {skill.xp} / {skill.xpToNext} XP
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  content: {
    padding: 24,
  },
  overallStats: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  levelCard: {
    backgroundColor: '#6366f1',
    padding: 24,
    borderRadius: 16,
    marginBottom: 16,
  },
  levelInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  xpText: {
    fontSize: 18,
    color: '#e0e7ff',
  },
  xpProgress: {
    gap: 8,
  },
  xpBar: {
    height: 8,
    backgroundColor: '#4f46e5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    backgroundColor: '#ffffff',
  },
  xpToNext: {
    fontSize: 14,
    color: '#e0e7ff',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  skillsSection: {
    gap: 12,
  },
  skillCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  skillName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  skillLevel: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '500',
  },
  skillProgress: {
    gap: 8,
  },
  skillProgressBar: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  skillProgressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
  },
  skillXp: {
    fontSize: 12,
    color: '#64748b',
  },
});

export default ProgressScreen;
