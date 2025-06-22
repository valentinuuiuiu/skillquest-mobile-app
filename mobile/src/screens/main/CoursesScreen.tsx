import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const CoursesScreen: React.FC = () => {
  const courses = [
    {
      id: '1',
      title: 'React Native Fundamentals',
      description: 'Learn the basics of React Native development',
      progress: 65,
      difficulty: 'Beginner',
      duration: '4 hours',
    },
    {
      id: '2',
      title: 'Advanced JavaScript',
      description: 'Master advanced JavaScript concepts',
      progress: 30,
      difficulty: 'Intermediate',
      duration: '6 hours',
    },
    {
      id: '3',
      title: 'UI/UX Design Principles',
      description: 'Create beautiful and user-friendly interfaces',
      progress: 0,
      difficulty: 'Beginner',
      duration: '3 hours',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Courses</Text>
        <Text style={styles.subtitle}>Continue your learning journey</Text>
      </View>

      <View style={styles.content}>
        {courses.map((course) => (
          <TouchableOpacity key={course.id} style={styles.courseCard}>
            <View style={styles.courseHeader}>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.courseDifficulty}>{course.difficulty}</Text>
            </View>
            <Text style={styles.courseDescription}>{course.description}</Text>
            <View style={styles.courseFooter}>
              <Text style={styles.courseDuration}>{course.duration}</Text>
              <Text style={styles.courseProgress}>
                {course.progress > 0 ? `${course.progress}% complete` : 'Not started'}
              </Text>
            </View>
            {course.progress > 0 && (
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${course.progress}%` }]} />
              </View>
            )}
          </TouchableOpacity>
        ))}
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
    gap: 16,
  },
  courseCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
  },
  courseDifficulty: {
    fontSize: 12,
    color: '#6366f1',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  courseDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
    lineHeight: 20,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  courseDuration: {
    fontSize: 14,
    color: '#64748b',
  },
  courseProgress: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '500',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
  },
});

export default CoursesScreen;
