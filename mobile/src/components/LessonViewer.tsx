import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Lesson } from '../data/learningContent';

interface LessonViewerProps {
  lesson: Lesson;
  onComplete?: () => void;
}

const LessonViewer: React.FC<LessonViewerProps> = ({ lesson, onComplete }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [showTranscript, setShowTranscript] = useState(false);

  const handleCompleteLesson = async () => {
    const xpEarned = lesson.duration * 2; // 2 XP per minute
    
    Alert.alert(
      'Lesson Completed! 🎉',
      `You earned ${xpEarned} XP! Keep up the great work!`,
      [{ text: 'Continue', onPress: onComplete }]
    );
  };

  const runCode = () => {
    Alert.alert(
      'Code Executed! ✅',
      'Great job! Your code ran successfully. In a real app, this would execute in a sandbox.',
      [{ text: 'OK' }]
    );
  };

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Lesson not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Lesson Header */}
      <View style={styles.header}>
        <Text style={styles.lessonTitle}>{lesson.title}</Text>
        <Text style={styles.lessonDescription}>{lesson.description}</Text>
        <View style={styles.lessonMeta}>
          <Text style={styles.duration}>⏱️ {lesson.duration} min</Text>
          <Text style={styles.lessonType}>📚 {lesson.type}</Text>
          {lesson.isCompleted && <Text style={styles.completed}>✅ Completed</Text>}
        </View>
      </View>

      {/* Video Section */}
      {lesson.type === 'video' && (
        <View style={styles.videoContainer}>
          <View style={styles.videoPlaceholder}>
            <Text style={styles.videoIcon}>▶️</Text>
            <Text style={styles.videoText}>Video Player</Text>
            <Text style={styles.videoSubtext}>In a real app, this would be a video player</Text>
          </View>
          <TouchableOpacity
            style={styles.transcriptButton}
            onPress={() => setShowTranscript(!showTranscript)}
          >
            <Text style={styles.transcriptButtonText}>
              {showTranscript ? 'Hide' : 'Show'} Transcript
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Transcript */}
      {showTranscript && lesson.content.transcript && (
        <View style={styles.transcriptContainer}>
          <Text style={styles.sectionTitle}>📝 Transcript</Text>
          <Text style={styles.transcriptText}>{lesson.content.transcript}</Text>
        </View>
      )}

      {/* Lesson Summary */}
      <View style={styles.summaryContainer}>
        <Text style={styles.sectionTitle}>📋 Summary</Text>
        <Text style={styles.summaryText}>{lesson.content.summary}</Text>
      </View>

      {/* Code Examples */}
      {lesson.content.codeExamples && lesson.content.codeExamples.length > 0 && (
        <View style={styles.codeSection}>
          <Text style={styles.sectionTitle}>💻 Code Examples</Text>
          {lesson.content.codeExamples.map((example, index) => (
            <View key={example.id} style={styles.codeExample}>
              <Text style={styles.codeTitle}>{example.title}</Text>
              <Text style={styles.codeLanguage}>{example.language}</Text>
              
              <View style={styles.codeContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <Text style={styles.codeText}>{example.code}</Text>
                </ScrollView>
              </View>
              
              <Text style={styles.codeExplanation}>{example.explanation}</Text>
              
              {example.isRunnable && (
                <TouchableOpacity style={styles.runButton} onPress={runCode}>
                  <Text style={styles.runButtonText}>▶️ Run Code</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Interactive Exercises */}
      {lesson.content.exercises && lesson.content.exercises.length > 0 && (
        <View style={styles.exerciseSection}>
          <Text style={styles.sectionTitle}>🧩 Practice Exercise</Text>
          {lesson.content.exercises.map((exercise, index) => (
            <View key={exercise.id} style={styles.exercise}>
              <Text style={styles.exerciseTitle}>{exercise.title}</Text>
              <Text style={styles.exerciseDescription}>{exercise.description}</Text>
              
              {exercise.type === 'code' && (
                <View style={styles.codeEditor}>
                  <Text style={styles.editorLabel}>Code Editor:</Text>
                  <TextInput
                    style={styles.codeInput}
                    multiline
                    placeholder="Write your code here..."
                    value={userCode}
                    onChangeText={setUserCode}
                  />
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => Alert.alert('Code Submitted!', 'Great job! Your solution has been submitted.')}
                  >
                    <Text style={styles.submitButtonText}>Submit Solution</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Exercise Hints */}
              {exercise.hints && exercise.hints.length > 0 && (
                <View style={styles.hintsContainer}>
                  <Text style={styles.hintsTitle}>💡 Hints:</Text>
                  {exercise.hints.map((hint, hintIndex) => (
                    <Text key={hintIndex} style={styles.hint}>• {hint}</Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Resources */}
      {lesson.content.resources && lesson.content.resources.length > 0 && (
        <View style={styles.resourcesSection}>
          <Text style={styles.sectionTitle}>📚 Additional Resources</Text>
          {lesson.content.resources.map((resource, index) => (
            <TouchableOpacity key={resource.id} style={styles.resource}>
              <Text style={styles.resourceIcon}>
                {resource.type === 'video' ? '🎥' : 
                 resource.type === 'article' ? '📄' : 
                 resource.type === 'documentation' ? '📖' : '🔗'}
              </Text>
              <View style={styles.resourceInfo}>
                <Text style={styles.resourceTitle}>{resource.title}</Text>
                <Text style={styles.resourceDescription}>{resource.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Complete Lesson Button */}
      {!lesson.isCompleted && (
        <TouchableOpacity style={styles.completeButton} onPress={handleCompleteLesson}>
          <Text style={styles.completeButtonText}>Complete Lesson ✅</Text>
        </TouchableOpacity>
      )}

      {/* Already Completed */}
      {lesson.isCompleted && (
        <View style={styles.completedContainer}>
          <Text style={styles.completedText}>🎉 Lesson Completed!</Text>
          <Text style={styles.completedSubtext}>Great job! You can review this lesson anytime.</Text>
        </View>
      )}

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
    textAlign: 'center',
    marginTop: 100,
  },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  lessonDescription: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
    marginBottom: 16,
  },
  lessonMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  duration: {
    fontSize: 14,
    color: '#64748b',
  },
  lessonType: {
    fontSize: 14,
    color: '#64748b',
  },
  completed: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '600',
  },
  videoContainer: {
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  videoPlaceholder: {
    height: 200,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  videoText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 4,
  },
  videoSubtext: {
    fontSize: 12,
    color: '#94a3b8',
  },
  transcriptButton: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
  },
  transcriptButtonText: {
    fontSize: 16,
    color: '#6366f1',
    fontWeight: '600',
  },
  transcriptContainer: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transcriptText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
  },
  summaryContainer: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  codeSection: {
    margin: 16,
  },
  codeExample: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  codeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  codeLanguage: {
    fontSize: 12,
    color: '#6366f1',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  codeContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  codeText: {
    fontFamily: 'Courier New',
    fontSize: 12,
    color: '#f1f5f9',
    lineHeight: 18,
  },
  codeExplanation: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 12,
  },
  runButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  runButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  exerciseSection: {
    margin: 16,
  },
  exercise: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 16,
  },
  codeEditor: {
    marginBottom: 16,
  },
  editorLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  codeInput: {
    backgroundColor: '#1e293b',
    color: '#f1f5f9',
    fontFamily: 'Courier New',
    fontSize: 12,
    padding: 16,
    borderRadius: 8,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  hintsContainer: {
    backgroundColor: '#fef3c7',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  hintsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 8,
  },
  hint: {
    fontSize: 13,
    color: '#92400e',
    marginBottom: 4,
  },
  resourcesSection: {
    margin: 16,
  },
  resource: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resourceIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  completeButton: {
    backgroundColor: '#10b981',
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completeButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  completedContainer: {
    backgroundColor: '#dcfce7',
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  completedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 4,
  },
  completedSubtext: {
    fontSize: 14,
    color: '#166534',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 40,
  },
});

export default LessonViewer;
