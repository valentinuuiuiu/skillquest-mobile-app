import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentCourse, startCourse } from '../../store/slices/learningSlice';
import type { RootState, AppDispatch } from '../../store';

const { width } = Dimensions.get('window');

const LearningPathScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { learningPaths, userProgress } = useSelector((state: RootState) => state.learning);

  const handleStartCourse = async (courseId: string) => {
    dispatch(setCurrentCourse(courseId));
    await dispatch(startCourse(courseId));
    // Navigate to course detail screen
  };

  const getCourseProgress = (courseId: string) => {
    if (userProgress.coursesCompleted.includes(courseId)) return 100;
    if (userProgress.coursesStarted.includes(courseId)) {
      // Calculate based on completed lessons
      return Math.min(75, userProgress.lessonsCompleted.length * 15);
    }
    return 0;
  };

  const renderCourse = (course: any, pathId: string) => {
    const progress = getCourseProgress(course.id);
    const isStarted = userProgress.coursesStarted.includes(course.id);
    const isCompleted = userProgress.coursesCompleted.includes(course.id);

    return (
      <TouchableOpacity
        key={course.id}
        style={[styles.courseCard, isStarted && styles.courseCardStarted]}
        onPress={() => handleStartCourse(course.id)}
      >
        <View style={styles.courseHeader}>
          <View style={styles.courseImageContainer}>
            <Text style={styles.courseEmoji}>
              {course.id === 'js-fundamentals' ? '📱' : '🤖'}
            </Text>
          </View>
          <View style={styles.courseInfo}>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.courseInstructor}>by {course.instructor}</Text>
            <View style={styles.courseMeta}>
              <Text style={styles.courseDuration}>{Math.floor(course.duration / 60)}h {course.duration % 60}m</Text>
              <Text style={styles.courseDifficulty}>{course.difficulty}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.courseDescription}>{course.description}</Text>

        <View style={styles.courseStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>⭐ {course.rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{course.studentsCount.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Students</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{course.lessons?.length || 0}</Text>
            <Text style={styles.statLabel}>Lessons</Text>
          </View>
        </View>

        {progress > 0 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{progress}% Complete</Text>
          </View>
        )}

        <View style={styles.courseFooter}>
          <View style={styles.tags}>
            {course.tags?.slice(0, 3).map((tag: string, index: number) => (
              <Text key={index} style={styles.tag}>#{tag}</Text>
            ))}
          </View>
          <TouchableOpacity
            style={[styles.actionButton, isCompleted && styles.completedButton]}
            onPress={() => handleStartCourse(course.id)}
          >
            <Text style={[styles.actionButtonText, isCompleted && styles.completedButtonText]}>
              {isCompleted ? 'Completed ✓' : isStarted ? 'Continue' : 'Start Course'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderLearningPath = (path: any) => (
    <View key={path.id} style={styles.pathContainer}>
      <View style={styles.pathHeader}>
        <Text style={styles.pathTitle}>{path.title}</Text>
        <Text style={styles.pathDifficulty}>{path.difficulty}</Text>
      </View>
      <Text style={styles.pathDescription}>{path.description}</Text>
      
      <View style={styles.pathMeta}>
        <Text style={styles.pathDuration}>🕒 {path.estimatedHours}h total</Text>
        <Text style={styles.pathCompletion}>📊 {path.completion}% complete</Text>
      </View>

      <View style={styles.skillsContainer}>
        <Text style={styles.skillsTitle}>Skills you'll learn:</Text>
        <View style={styles.skillsList}>
          {path.skills.slice(0, 4).map((skill: string, index: number) => (
            <Text key={index} style={styles.skill}>{skill}</Text>
          ))}
          {path.skills.length > 4 && (
            <Text style={styles.skill}>+{path.skills.length - 4} more</Text>
          )}
        </View>
      </View>

      <View style={styles.coursesContainer}>
        <Text style={styles.coursesTitle}>Courses in this path:</Text>
        {path.courses.map((course: any) => renderCourse(course, path.id))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Learning Paths</Text>
        <Text style={styles.subtitle}>Structured journeys to master new skills</Text>
      </View>

      <View style={styles.statsOverview}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{userProgress.coursesStarted.length}</Text>
          <Text style={styles.statText}>Courses Started</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{userProgress.lessonsCompleted.length}</Text>
          <Text style={styles.statText}>Lessons Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{Math.floor(userProgress.studyTimeMinutes / 60)}h</Text>
          <Text style={styles.statText}>Study Time</Text>
        </View>
      </View>

      <View style={styles.content}>
        {learningPaths.map(renderLearningPath)}
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  statsOverview: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
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
  statText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 24,
  },
  pathContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  pathHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  pathTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
    flex: 1,
  },
  pathDifficulty: {
    fontSize: 12,
    color: '#6366f1',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontWeight: '500',
  },
  pathDescription: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
    marginBottom: 16,
  },
  pathMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  pathDuration: {
    fontSize: 14,
    color: '#64748b',
  },
  pathCompletion: {
    fontSize: 14,
    color: '#64748b',
  },
  skillsContainer: {
    marginBottom: 20,
  },
  skillsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skill: {
    fontSize: 12,
    color: '#6366f1',
    backgroundColor: '#ede9fe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  coursesContainer: {
    marginTop: 8,
  },
  coursesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  courseCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  courseCardStarted: {
    borderColor: '#6366f1',
    backgroundColor: '#fafbff',
  },
  courseHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  courseImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  courseEmoji: {
    fontSize: 24,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  courseMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  courseDuration: {
    fontSize: 12,
    color: '#64748b',
  },
  courseDifficulty: {
    fontSize: 12,
    color: '#64748b',
  },
  courseDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 12,
  },
  courseStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e8f0',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  statLabel: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 2,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
  },
  progressText: {
    fontSize: 12,
    color: '#6366f1',
    fontWeight: '500',
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tags: {
    flexDirection: 'row',
    flex: 1,
    gap: 4,
  },
  tag: {
    fontSize: 10,
    color: '#64748b',
  },
  actionButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  completedButton: {
    backgroundColor: '#10b981',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  completedButtonText: {
    color: '#ffffff',
  },
});

export default LearningPathScreen;
