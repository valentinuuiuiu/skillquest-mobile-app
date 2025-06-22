import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

// Configuration - in production, this would come from environment variables
const config = {
  OPENROUTER_API_KEY: 'sk-or-v1-demo-key-for-testing',
  API_BASE_URL: 'https://openrouter.ai/api/v1',
};

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  language?: string;
}

interface AITutorProps {
  subject?: string;
  currentLesson?: string;
  userLanguage?: string;
}

const AITutor: React.FC<AITutorProps> = ({ 
  subject = 'JavaScript', 
  currentLesson = 'Variables and Data Types',
  userLanguage = 'English'
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(userLanguage);
  const scrollViewRef = useRef<ScrollView>(null);
  const { user } = useSelector((state: RootState) => state.auth);

  // Available languages for learning
  const languages = [
    'English', 'Spanish', 'French', 'German', 'Portuguese', 'Italian', 
    'Russian', 'Japanese', 'Korean', 'Chinese', 'Arabic', 'Hindi'
  ];

  useEffect(() => {
    // Initial greeting message
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: `Hello ${user?.username || 'there'}! 👋 I'm your AI tutor for ${subject}. I can help you learn "${currentLesson}" in ${selectedLanguage}. What would you like to know?`,
      isUser: false,
      timestamp: new Date(),
      language: selectedLanguage,
    };
    setMessages([welcomeMessage]);
  }, [subject, currentLesson, selectedLanguage, user?.username]);

  const callOpenRouter = async (userMessage: string): Promise<string> => {
    try {
      // OpenRouter API configuration
      const API_KEY = config.OPENROUTER_API_KEY || 'sk-or-v1-demo-key-for-testing';
      const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

      const systemPrompt = `You are an expert ${subject} tutor. You are currently teaching "${currentLesson}".

Key instructions:
1. Respond in ${selectedLanguage} language
2. Be encouraging and patient
3. Use simple, clear explanations
4. Provide practical examples
5. Ask follow-up questions to ensure understanding
6. If the student seems confused, offer different explanations
7. Celebrate their progress and achievements
8. Adapt your teaching style to their questions

Current lesson context: ${currentLesson}
Student's native language: ${selectedLanguage}
Subject: ${subject}

Make learning fun and engaging! Use emojis and analogies when helpful.`;

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://skillquest.app',
          'X-Title': 'SkillQuest AI Tutor',
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3.5-sonnet', // High-quality model for education
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage },
          ],
          temperature: 0.7,
          max_tokens: 500,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'I apologize, but I had trouble processing your question. Could you please try again?';
    } catch (error) {
      console.error('OpenRouter API error:', error);
      
      // Fallback responses for different topics
      const fallbackResponses = {
        'Variables and Data Types': `Great question about ${currentLesson}! Let me explain in ${selectedLanguage}:

Variables are like containers that store data. In JavaScript:
- let: for values that can change
- const: for values that stay the same
- var: older way (avoid using)

Example:
let name = "Alice"; // String
const age = 25; // Number
let isStudent = true; // Boolean

Would you like me to explain any specific data type? 🤔`,

        'Functions': `Functions in ${subject} are like recipes! 📝

They take ingredients (parameters) and create something new (return value).

function greet(name) {
  return "Hello, " + name + "!";
}

This function takes a name and returns a greeting. Try creating your own function! What would you like to build? 🚀`,

        default: `I understand you're learning about ${currentLesson}. Even though I can't connect to the AI service right now, I'm here to help! 

Could you ask me a specific question about ${subject}? I'll do my best to explain it clearly in ${selectedLanguage}. 😊`
      };

      return fallbackResponses[currentLesson as keyof typeof fallbackResponses] || fallbackResponses.default;
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const aiResponse = await callOpenRouter(userMessage.text);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
        language: selectedLanguage,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Failed to get response from AI tutor. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    `Can you explain ${currentLesson} with a simple example?`,
    'What are the most common mistakes beginners make?',
    'Can you give me a practice exercise?',
    'How is this used in real projects?',
    'What should I learn next?',
  ];

  const renderMessage = (message: Message) => (
    <View
      key={message.id}
      style={[
        styles.messageContainer,
        message.isUser ? styles.userMessage : styles.aiMessage,
      ]}
    >
      {!message.isUser && (
        <View style={styles.aiAvatar}>
          <Text style={styles.aiAvatarText}>🤖</Text>
        </View>
      )}
      <View style={[
        styles.messageBubble,
        message.isUser ? styles.userBubble : styles.aiBubble,
      ]}>
        <Text style={[
          styles.messageText,
          message.isUser ? styles.userText : styles.aiText,
        ]}>
          {message.text}
        </Text>
        <Text style={styles.timestamp}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
      {message.isUser && (
        <View style={styles.userAvatar}>
          <Text style={styles.userAvatarText}>
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>AI Tutor - {subject}</Text>
          <Text style={styles.headerSubtitle}>{currentLesson}</Text>
        </View>
        <View style={styles.languageSelector}>
          <Text style={styles.languageLabel}>🌍 {selectedLanguage}</Text>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map(renderMessage)}
        
        {isLoading && (
          <View style={styles.loadingContainer}>
            <View style={styles.aiAvatar}>
              <Text style={styles.aiAvatarText}>🤖</Text>
            </View>
            <View style={styles.loadingBubble}>
              <Text style={styles.loadingText}>Thinking...</Text>
              <View style={styles.typingIndicator}>
                <View style={[styles.dot, styles.dot1]} />
                <View style={[styles.dot, styles.dot2]} />
                <View style={[styles.dot, styles.dot3]} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Suggested Questions */}
      {messages.length <= 1 && (
        <ScrollView 
          horizontal 
          style={styles.suggestionsContainer}
          showsHorizontalScrollIndicator={false}
        >
          {suggestedQuestions.map((question, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionButton}
              onPress={() => setInputText(question)}
            >
              <Text style={styles.suggestionText}>{question}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={`Ask me anything about ${currentLesson}...`}
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={isLoading || !inputText.trim()}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    paddingTop: 60,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  languageSelector: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  languageLabel: {
    fontSize: 12,
    color: '#6366f1',
    fontWeight: '500',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  aiMessage: {
    justifyContent: 'flex-start',
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  aiAvatarText: {
    fontSize: 16,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  userAvatarText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: 16,
    padding: 12,
  },
  userBubble: {
    backgroundColor: '#6366f1',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#ffffff',
  },
  aiText: {
    color: '#1e293b',
  },
  timestamp: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 4,
    opacity: 0.7,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  loadingBubble: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  loadingText: {
    fontSize: 16,
    color: '#64748b',
    marginRight: 8,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6366f1',
    marginHorizontal: 1,
  },
  dot1: {
    opacity: 0.4,
  },
  dot2: {
    opacity: 0.7,
  },
  dot3: {
    opacity: 1,
  },
  suggestionsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  suggestionButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  suggestionText: {
    fontSize: 14,
    color: '#6366f1',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  sendButtonDisabled: {
    backgroundColor: '#cbd5e1',
  },
  sendButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default AITutor;
