import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import AITutor from '../../components/AITutor';
import type { RootState } from '../../store';

interface LessonDetailScreenProps {
  route: {
    params: {
      lessonId: string;
    };
  };
}

const LessonDetailScreen: React.FC<LessonDetailScreenProps> = ({ route }) => {
  const { lessonId } = route.params;
  const [showAITutor, setShowAITutor] = useState(false);
  const { currentLesson } = useSelector((state: RootState) => state.learning);

  // Mock lesson data - in real app, this would be fetched based on lessonId
  const lesson = {
    id: lessonId,
    title: 'Variables and Data Types',
    subject: 'JavaScript',
    content: `# Variables and Data Types in JavaScript

## What are Variables?

Variables are containers that store data values. In JavaScript, you can create variables using three keywords:

### 1. let
Use \`let\` for variables that can change:
\`\`\`javascript
let name = "Alice";
name = "Bob"; // This is allowed
\`\`\`

### 2. const
Use \`const\` for variables that should not change:
\`\`\`javascript
const PI = 3.14159;
// PI = 3.14; // This would cause an error
\`\`\`

### 3. var (avoid using)
\`var\` is the old way of creating variables. It has some quirky behaviors, so it's better to use \`let\` or \`const\`.

## Data Types

JavaScript has several built-in data types:

### Primitive Types:
1. **String**: Text data
   \`\`\`javascript
   let greeting = "Hello, World!";
   \`\`\`

2. **Number**: Numeric data
   \`\`\`javascript
   let age = 25;
   let price = 19.99;
   \`\`\`

3. **Boolean**: True or false
   \`\`\`javascript
   let isStudent = true;
   let isWorking = false;
   \`\`\`

4. **Undefined**: Variable declared but not assigned
   \`\`\`javascript
   let something;
   console.log(something); // undefined
   \`\`\`

5. **Null**: Intentionally empty value
   \`\`\`javascript
   let data = null;
   \`\`\`

## Practice Exercise

Try creating variables for:
- Your name (string)
- Your age (number)
- Whether you like programming (boolean)

Need help understanding any of these concepts? Ask the AI tutor! 🤖`,
    duration: '15 minutes',
    difficulty: 'Beginner',
    xpReward: 50,
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{lesson.title}</Text>
          <Text style={styles.subtitle}>{lesson.subject} • {lesson.duration}</Text>
        </View>
        <TouchableOpacity
          style={styles.aiTutorButton}
          onPress={() => setShowAITutor(true)}
        >
          <Text style={styles.aiTutorButtonText}>🤖 Ask AI Tutor</Text>
        </TouchableOpacity>
      </View>

      {/* Lesson Content */}
      <ScrollView style={styles.content}>
        <View style={styles.lessonCard}>
          <View style={styles.lessonMeta}>
            <View style={styles.difficultyBadge}>
              <Text style={styles.difficultyText}>{lesson.difficulty}</Text>
            </View>
            <Text style={styles.xpReward}>+{lesson.xpReward} XP</Text>
          </View>

          <Text style={styles.lessonContent}>{lesson.content}</Text>
        </View>

        {/* Quick Help Section */}
        <View style={styles.quickHelpCard}>
          <Text style={styles.quickHelpTitle}>Need Help? 🆘</Text>
          <Text style={styles.quickHelpText}>
            The AI tutor can explain concepts, provide examples, and answer your questions in multiple languages!
          </Text>
          <TouchableOpacity
            style={styles.quickHelpButton}
            onPress={() => setShowAITutor(true)}
          >
            <Text style={styles.quickHelpButtonText}>Get Help Now</Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.completeButton}>
            <Text style={styles.completeButtonText}>Mark as Complete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next Lesson →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* AI Tutor Modal */}
      <Modal
        visible={showAITutor}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>AI Tutor</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowAITutor(false)}
            >
              <Text style={styles.closeButtonText}>✕ Close</Text>
            </TouchableOpacity>
          </View>
          <AITutor
            subject={lesson.subject}
            currentLesson={lesson.title}
            userLanguage="English"
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  aiTutorButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  aiTutorButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  lessonCard: {
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
  lessonMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  difficultyBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#166534',
    fontSize: 12,
    fontWeight: '600',
  },
  xpReward: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '600',
  },
  lessonContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },
  quickHelpCard: {
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  quickHelpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 8,
  },
  quickHelpText: {
    fontSize: 14,
    color: '#92400e',
    marginBottom: 12,
    lineHeight: 20,
  },
  quickHelpButton: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  quickHelpButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  actionButtons: {
    gap: 12,
    paddingBottom: 20,
  },
  completeButton: {
    backgroundColor: '#10b981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  closeButton: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  closeButtonText: {
    color: '#64748b',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default LessonDetailScreen;
