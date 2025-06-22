# AI-Powered Learning Integration

## Overview

SkillQuest now includes an AI-powered tutoring system that provides personalized, multilingual learning support. The AI tutor uses OpenRouter to access high-quality language models for educational assistance.

## Features

### 🤖 AI Tutor
- **Real-time chat interface** with context-aware responses
- **Multilingual support** - learn in your preferred language
- **Personalized explanations** based on current lesson content
- **Interactive Q&A** with follow-up questions
- **Fallback responses** when API is unavailable

### 🌍 Language Support
- English, Spanish, French, German, Portuguese, Italian
- Russian, Japanese, Korean, Chinese, Arabic, Hindi
- Dynamic language switching within conversations

### 📚 Educational Context
- Lesson-aware responses based on current study material
- Subject-specific explanations and examples
- Progressive difficulty adaptation
- Code examples and practical exercises

## Implementation

### Components Added

1. **AITutor Component** (`src/components/AITutor.tsx`)
   - Main chat interface with message history
   - OpenRouter API integration
   - Multilingual capabilities
   - Suggested questions for engagement

2. **AIChatScreen** (`src/screens/main/AIChatScreen.tsx`)
   - Dedicated screen for AI tutoring
   - Context from current course/lesson
   - Added to main navigation tabs

3. **LessonDetailScreen** (`src/screens/main/LessonDetailScreen.tsx`)
   - Enhanced lesson view with AI integration
   - Modal-based AI tutor access
   - Contextual help suggestions

### API Integration

#### OpenRouter Setup
```typescript
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const model = 'anthropic/claude-3.5-sonnet'; // High-quality educational model
```

#### Environment Configuration
- `.env` file for API key management
- TypeScript declarations for environment variables
- Babel configuration for React Native environment support

## Getting Started

### 1. Get OpenRouter API Key
1. Visit [OpenRouter.ai](https://openrouter.ai/)
2. Create a free account
3. Generate an API key
4. Add credits to your account (starts from $1)

### 2. Configure Environment
```bash
# Copy example environment file
cp mobile/.env.example mobile/.env

# Edit .env file and add your API key
OPENROUTER_API_KEY=your_actual_api_key_here
```

### 3. Available Models
- `anthropic/claude-3.5-sonnet` - Recommended for education (high quality)
- `openai/gpt-4` - Excellent for tutoring
- `openai/gpt-3.5-turbo` - Fast and cost-effective
- `meta-llama/llama-3.1-8b-instruct` - Open source option

### 4. Pricing (OpenRouter)
- Claude 3.5 Sonnet: ~$3 per 1M input tokens, ~$15 per 1M output tokens
- GPT-4: ~$30 per 1M input tokens, ~$60 per 1M output tokens
- GPT-3.5 Turbo: ~$0.50 per 1M input tokens, ~$1.50 per 1M output tokens

## Usage

### Access AI Tutor
1. **From Navigation**: Tap "AI Tutor" in bottom navigation
2. **From Lesson**: Tap "🤖 Ask AI Tutor" button in any lesson
3. **Quick Help**: Use "Get Help Now" in lesson quick help section

### Best Practices
- Ask specific questions about the current lesson
- Request examples in your preferred language
- Use follow-up questions for deeper understanding
- Try different explanation styles if confused

### Example Interactions

**Student**: "Can you explain JavaScript variables with a simple example?"

**AI Tutor**: "Great question! Variables in JavaScript are like labeled containers that store data. Here's a simple example:

```javascript
let myName = "Alice";
let myAge = 25;
let isStudent = true;
```

Think of variables like boxes:
- `myName` box contains the text "Alice"
- `myAge` box contains the number 25  
- `isStudent` box contains true/false

Would you like me to explain the difference between `let`, `const`, and `var`? 🤔"

## Technical Architecture

### State Management
- Redux integration for current course/lesson context
- Message history stored in component state
- User preferences and language settings

### Error Handling
- Graceful fallbacks when API is unavailable
- Subject-specific fallback responses
- Network error recovery
- Rate limiting awareness

### Performance
- Streaming responses for better UX
- Message pagination for long conversations
- Optimized re-renders with React.memo
- Background API calls with loading states

## Customization

### Changing AI Model
Edit `AITutor.tsx`:
```typescript
model: 'openai/gpt-4', // Change this line
```

### Adding Languages
Edit the `languages` array in `AITutor.tsx`:
```typescript
const languages = [
  'English', 'Spanish', 'French', // ... add more
];
```

### Custom System Prompts
Modify the `systemPrompt` in `callOpenRouter` function to adjust AI behavior.

## Future Enhancements

### Planned Features
- **Voice Integration**: Speech-to-text and text-to-speech
- **Visual Learning**: AI-generated diagrams and explanations  
- **Progress Tracking**: AI-aware learning path optimization
- **Collaborative Learning**: Peer-to-peer AI-mediated sessions
- **Assessment Integration**: AI-generated quizzes and exercises

### Advanced AI Features
- **Code Review**: AI analysis of student code submissions
- **Adaptive Difficulty**: Dynamic lesson difficulty based on AI assessment
- **Learning Style Detection**: AI-powered learning preference analysis
- **Emotional Support**: Encouraging and motivational AI responses

## Troubleshooting

### Common Issues

**"Cannot connect to AI service"**
- Check internet connection
- Verify OpenRouter API key
- Check API credit balance

**"Responses are too generic"**
- Ensure current lesson context is set
- Try more specific questions
- Check system prompt configuration

**"App crashes when opening AI chat"**
- Clear app cache
- Restart development server
- Check TypeScript errors in console

### Debug Mode
Enable debug logging by setting:
```typescript
const DEBUG_AI = true; // In AITutor.tsx
```

## Security Considerations

- API keys stored securely in environment variables
- No sensitive user data sent to AI services
- Rate limiting to prevent abuse
- Input sanitization for safety

## Contributing

When adding AI features:
1. Follow existing patterns in `AITutor.tsx`
2. Add proper TypeScript types
3. Include fallback behavior
4. Test with various languages
5. Update documentation

---

The AI integration transforms SkillQuest from a static learning platform into an intelligent, adaptive tutoring system that can provide personalized help in multiple languages, making education more accessible and effective for learners worldwide.
