// Real course data with comprehensive learning paths
export interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  prerequisites: string[];
  skills: string[];
  courses: Course[];
  completion: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number; // in minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  studentsCount: number;
  lessons: Lesson[];
  quizzes: Quiz[];
  projects: Project[];
  completion: number;
  thumbnail: string;
  tags: string[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'text' | 'interactive' | 'code';
  duration: number;
  content: LessonContent;
  isCompleted: boolean;
  isLocked: boolean;
}

export interface LessonContent {
  videoUrl?: string;
  transcript?: string;
  codeExamples?: CodeExample[];
  exercises?: Exercise[];
  summary: string;
  resources: Resource[];
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  timeLimit?: number; // in seconds
  passingScore: number;
  attempts: number;
  maxAttempts: number;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'code' | 'fill-blank';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  requirements: string[];
  deliverables: string[];
  resources: Resource[];
  isCompleted: boolean;
}

export interface CodeExample {
  id: string;
  title: string;
  language: string;
  code: string;
  explanation: string;
  isRunnable: boolean;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  type: 'code' | 'quiz' | 'project';
  difficulty: number; // 1-10
  solution?: string;
  hints: string[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'documentation' | 'tool' | 'book';
  url: string;
  description: string;
}

// Real learning paths with comprehensive content
export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'mobile-dev-mastery',
    title: 'Mobile Development Mastery',
    description: 'Complete journey from beginner to expert mobile developer. Master React Native, Flutter, and native development.',
    difficulty: 'Beginner',
    estimatedHours: 120,
    prerequisites: [],
    skills: ['React Native', 'JavaScript', 'TypeScript', 'Mobile UI/UX', 'API Integration', 'State Management'],
    completion: 35,
    courses: [
      {
        id: 'js-fundamentals',
        title: 'JavaScript Fundamentals',
        description: 'Master modern JavaScript from basics to advanced concepts',
        instructor: 'SkillQuest AI',
        duration: 480, // 8 hours
        difficulty: 'Beginner',
        rating: 4.8,
        studentsCount: 12450,
        completion: 75,
        thumbnail: 'https://example.com/js-thumb.jpg',
        tags: ['JavaScript', 'Programming', 'Web Development'],
        lessons: [
          {
            id: 'js-intro',
            title: 'Introduction to JavaScript',
            description: 'Understanding what JavaScript is and why it\'s essential',
            type: 'video',
            duration: 15,
            isCompleted: true,
            isLocked: false,
            content: {
              summary: 'JavaScript is the programming language of the web, enabling interactive and dynamic websites.',
              transcript: `Welcome to JavaScript Fundamentals! 

JavaScript is one of the most popular programming languages in the world, and for good reason. It's the language that brings websites to life, making them interactive and dynamic.

Originally created in just 10 days by Brendan Eich at Netscape in 1995, JavaScript has evolved into a powerful, versatile language that runs not just in browsers, but also on servers, mobile apps, and even desktop applications.

Key features of JavaScript:
- Dynamic typing: Variables can hold different types of data
- Interpreted language: No compilation step needed
- Event-driven: Responds to user interactions
- Prototype-based object orientation
- First-class functions: Functions can be assigned to variables

In this course, we'll start with the basics and build up to advanced concepts. By the end, you'll be writing clean, efficient JavaScript code and understanding how modern web applications work.

Let's begin our journey!`,
              codeExamples: [
                {
                  id: 'hello-world',
                  title: 'Hello World in JavaScript',
                  language: 'javascript',
                  code: `// Your first JavaScript program
console.log("Hello, World!");

// Variables and basic operations
let name = "JavaScript";
let year = 2024;
console.log(\`Welcome to \${name} in \${year}!\`);`,
                  explanation: 'This shows the basic syntax for output and variables in JavaScript.',
                  isRunnable: true
                }
              ],
              exercises: [
                {
                  id: 'first-variables',
                  title: 'Create Your First Variables',
                  description: 'Create variables for your name, age, and favorite programming language. Display them using console.log.',
                  type: 'code',
                  difficulty: 2,
                  hints: [
                    'Use let or const to declare variables',
                    'Use template literals with backticks for string interpolation',
                    'console.log() displays output to the console'
                  ]
                }
              ],
              resources: [
                {
                  id: 'mdn-js-intro',
                  title: 'MDN JavaScript Introduction',
                  type: 'documentation',
                  url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction',
                  description: 'Official Mozilla documentation on JavaScript basics'
                }
              ]
            }
          },
          {
            id: 'variables-datatypes',
            title: 'Variables and Data Types',
            description: 'Learn about different ways to store and manipulate data',
            type: 'interactive',
            duration: 25,
            isCompleted: true,
            isLocked: false,
            content: {
              summary: 'Understanding JavaScript data types: strings, numbers, booleans, objects, and more.',
              codeExamples: [
                {
                  id: 'data-types',
                  title: 'JavaScript Data Types',
                  language: 'javascript',
                  code: `// Primitive types
let message = "Hello World";        // String
let count = 42;                     // Number
let isActive = true;                // Boolean
let data = null;                    // Null
let value;                          // Undefined

// Complex types
let person = {                      // Object
  name: "Alice",
  age: 25
};

let colors = ["red", "green", "blue"]; // Array

// Type checking
console.log(typeof message);        // "string"
console.log(typeof count);          // "number"
console.log(typeof isActive);       // "boolean"`,
                  explanation: 'JavaScript has several built-in data types for different kinds of information.',
                  isRunnable: true
                }
              ],
              exercises: [
                {
                  id: 'type-practice',
                  title: 'Working with Different Types',
                  description: 'Create variables of each data type and practice type conversion.',
                  type: 'code',
                  difficulty: 3,
                  hints: [
                    'Use typeof operator to check variable types',
                    'Try converting between strings and numbers',
                    'Experiment with array methods like push() and pop()'
                  ]
                }
              ],
              resources: []
            }
          }
        ],
        quizzes: [
          {
            id: 'js-basics-quiz',
            title: 'JavaScript Basics Quiz',
            description: 'Test your understanding of JavaScript fundamentals',
            timeLimit: 300,
            passingScore: 80,
            attempts: 0,
            maxAttempts: 3,
            questions: [
              {
                id: 'q1',
                type: 'multiple-choice',
                question: 'Which of the following is the correct way to declare a variable in JavaScript?',
                options: ['var name = "John";', 'variable name = "John";', 'v name = "John";', 'declare name = "John";'],
                correctAnswer: 'var name = "John";',
                explanation: 'Variables in JavaScript are declared using var, let, or const keywords.',
                points: 10
              },
              {
                id: 'q2',
                type: 'true-false',
                question: 'JavaScript is a statically typed language.',
                correctAnswer: 'false',
                explanation: 'JavaScript is dynamically typed, meaning variable types are determined at runtime.',
                points: 10
              }
            ]
          }
        ],
        projects: [
          {
            id: 'calculator-project',
            title: 'Build a JavaScript Calculator',
            description: 'Create a functional calculator using HTML, CSS, and JavaScript',
            difficulty: 'Beginner',
            estimatedHours: 4,
            requirements: [
              'Basic arithmetic operations (+, -, *, /)',
              'Clear and equals functionality',
              'Display for numbers and results',
              'Handle decimal numbers',
              'Error handling for division by zero'
            ],
            deliverables: [
              'Working calculator with all basic operations',
              'Clean, readable code with comments',
              'Responsive design that works on mobile',
              'Screenshot or demo video'
            ],
            resources: [],
            isCompleted: false
          }
        ]
      }
    ]
  },
  {
    id: 'ai-ml-mastery',
    title: 'AI & Machine Learning Mastery',
    description: 'Complete artificial intelligence and machine learning curriculum from fundamentals to advanced applications.',
    difficulty: 'Intermediate',
    estimatedHours: 200,
    prerequisites: ['Python Fundamentals', 'Mathematics'],
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Data Science', 'Neural Networks', 'Deep Learning'],
    completion: 0,
    courses: [
      {
        id: 'python-for-ai',
        title: 'Python for AI and Data Science',
        description: 'Master Python libraries essential for AI: NumPy, Pandas, Matplotlib, and Scikit-learn',
        instructor: 'SkillQuest AI',
        duration: 720, // 12 hours
        difficulty: 'Intermediate',
        rating: 4.9,
        studentsCount: 8750,
        completion: 0,
        thumbnail: 'https://example.com/python-ai-thumb.jpg',
        tags: ['Python', 'AI', 'Data Science', 'NumPy', 'Pandas'],
        lessons: [],
        quizzes: [],
        projects: []
      }
    ]
  },
  {
    id: 'web3-blockchain',
    title: 'Web3 & Blockchain Development',
    description: 'Learn blockchain development, smart contracts, and decentralized applications (DApps).',
    difficulty: 'Advanced',
    estimatedHours: 150,
    prerequisites: ['JavaScript Fundamentals', 'Web Development'],
    skills: ['Solidity', 'Ethereum', 'Smart Contracts', 'DApp Development', 'Web3.js', 'Hardhat'],
    completion: 0,
    courses: []
  },
  {
    id: 'cybersecurity-expert',
    title: 'Cybersecurity Expert Path',
    description: 'Comprehensive cybersecurity training from ethical hacking to enterprise security.',
    difficulty: 'Advanced',
    estimatedHours: 180,
    prerequisites: ['Networking Basics', 'Linux Fundamentals'],
    skills: ['Penetration Testing', 'Network Security', 'Incident Response', 'Forensics', 'Compliance'],
    completion: 0,
    courses: []
  }
];

// Achievement system with real educational milestones
export const ACHIEVEMENTS = [
  {
    id: 'first-lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    rarity: 'common',
    points: 10,
    unlocked: true
  },
  {
    id: 'code-warrior',
    title: 'Code Warrior',
    description: 'Write and run 50 code examples',
    icon: '⚔️',
    rarity: 'rare',
    points: 100,
    unlocked: false
  },
  {
    id: 'quiz-master',
    title: 'Quiz Master',
    description: 'Score 100% on 10 quizzes',
    icon: '🧠',
    rarity: 'epic',
    points: 250,
    unlocked: false
  },
  {
    id: 'project-builder',
    title: 'Project Builder',
    description: 'Complete 5 practical projects',
    icon: '🏗️',
    rarity: 'legendary',
    points: 500,
    unlocked: false
  }
];

export default { LEARNING_PATHS, ACHIEVEMENTS };
