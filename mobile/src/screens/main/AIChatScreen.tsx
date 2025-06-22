import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import AITutor from '../../components/AITutor';
import type { RootState } from '../../store';

const AIChatScreen: React.FC = () => {
  const { currentCourse, currentLesson } = useSelector((state: RootState) => state.learning);
  const currentSubject = currentCourse?.title || 'Programming';
  const currentLessonTitle = currentLesson?.title || 'Introduction';

  return (
    <View style={styles.container}>
      <AITutor
        subject={currentSubject}
        currentLesson={currentLessonTitle}
        userLanguage="English"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
});

export default AIChatScreen;
