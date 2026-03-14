export interface Lesson {
  id: string
  title: string
  duration: string
  content: { heading?: string; text: string; type: 'paragraph' | 'heading' | 'example' | 'keypoint' }[]
  relatedTopics: string[]
}

export interface QuizQuestion {
  id: string
  text: string
  options: string[]
  correct: number
  explanation: string
}

export interface Course {
  id: string
  title: string
  subject: string
  grade: string
  lessons: Lesson[]
  quiz: QuizQuestion[]
}

export const FRACTIONS_COURSE: Course = {
  id: 'fractions-division',
  title: 'Fractions & Division',
  subject: 'Mathematics',
  grade: 'Primary 4',

  lessons: [
    {
      id: 'l1',
      title: 'What is a Fraction?',
      duration: '5 min',
      relatedTopics: ['Whole Numbers', 'Equal Parts', 'Division', 'Number Line'],
      content: [
        { type: 'paragraph', text: 'Imagine you have an orange and you want to share it equally with a friend. You cut it into 2 equal pieces. Each person gets one piece out of two — we write this as the fraction 1/2.' },
        { type: 'heading', text: 'A fraction describes a part of a whole.' },
        { type: 'paragraph', text: 'The whole must be divided into equal parts. If Amara cuts a cassava into 4 equal pieces and eats 1 piece, she has eaten 1/4 of the cassava.' },
        { type: 'keypoint', text: 'A fraction only makes sense when all parts are equal in size.' },
        { type: 'paragraph', text: 'We see fractions everywhere in daily life — half a cup of water, a quarter of an hour (15 minutes), three-quarters of a field planted with maize.' },
        { type: 'example', text: 'If a field is divided into 5 equal plots and 3 plots have crops, the fraction of the field with crops is 3/5.' },
        { type: 'paragraph', text: 'The number on top shows how many parts we are talking about. The number on the bottom shows how many equal parts the whole was divided into.' },
      ],
    },
    {
      id: 'l2',
      title: 'Numerator and Denominator',
      duration: '6 min',
      relatedTopics: ['Proper Fractions', 'Improper Fractions', 'Mixed Numbers', 'Simplifying'],
      content: [
        { type: 'paragraph', text: 'Every fraction has two numbers separated by a line. Each number has a special name and meaning.' },
        { type: 'heading', text: 'The Denominator — the bottom number' },
        { type: 'paragraph', text: 'The denominator tells you how many equal parts the whole has been divided into. If a mango is cut into 8 equal slices, the denominator is 8.' },
        { type: 'keypoint', text: 'Denominator comes from the Latin word for "name" — it names the size of each part.' },
        { type: 'heading', text: 'The Numerator — the top number' },
        { type: 'paragraph', text: 'The numerator tells you how many of those parts you have. If you take 3 slices out of 8, the numerator is 3, and the fraction is 3/8.' },
        { type: 'example', text: 'In the fraction 5/6: the denominator is 6 (the whole is cut into 6 equal parts) and the numerator is 5 (we have 5 of those parts).' },
        { type: 'paragraph', text: 'A fraction where the numerator is smaller than the denominator is called a proper fraction — it represents less than one whole. 3/4, 1/2, and 7/10 are all proper fractions.' },
        { type: 'keypoint', text: 'When numerator = denominator (like 4/4), the fraction equals exactly 1 whole.' },
      ],
    },
    {
      id: 'l3',
      title: 'Adding Fractions with the Same Denominator',
      duration: '8 min',
      relatedTopics: ['Subtracting Fractions', 'Common Denominator', 'Simplifying Fractions', 'Mixed Numbers'],
      content: [
        { type: 'paragraph', text: 'Adding fractions is straightforward when they share the same denominator — the same sized pieces. Think of it like counting: if you have 3 slices of a pizza and your friend has 2 slices of the same pizza, together you have 5 slices.' },
        { type: 'heading', text: 'The rule: add the numerators, keep the denominator' },
        { type: 'example', text: '2/7 + 3/7 = (2+3)/7 = 5/7\nThe pieces are the same size (sevenths), so we just count them up.' },
        { type: 'paragraph', text: 'The denominator does not change because the size of each piece did not change. You are just counting how many pieces you now have in total.' },
        { type: 'keypoint', text: 'Never add the denominators together. 1/4 + 1/4 = 2/4, not 2/8.' },
        { type: 'example', text: 'Kofi drank 1/6 of a bottle of water in the morning and 3/6 in the afternoon.\nTotal: 1/6 + 3/6 = 4/6 of the bottle.' },
        { type: 'paragraph', text: 'Sometimes your answer can be simplified. 4/6 can be simplified to 2/3, because both 4 and 6 can be divided by 2. But simplifying is optional — 4/6 is still a correct answer.' },
        { type: 'keypoint', text: 'If the sum equals a whole (like 3/3 or 5/5), the answer is simply 1.' },
      ],
    },
  ],

  quiz: [
    {
      id: 'q1',
      text: 'In the fraction 3/8, what is the denominator?',
      options: ['3', '8', '11', '5'],
      correct: 1,
      explanation: 'The denominator is the bottom number — 8. It tells us the whole was divided into 8 equal parts.',
    },
    {
      id: 'q2',
      text: 'A loaf of bread is cut into 6 equal slices. Emmanuel eats 2 slices. What fraction of the bread did he eat?',
      options: ['2/8', '6/2', '2/6', '4/6'],
      correct: 2,
      explanation: '2 slices out of 6 total slices = 2/6. Emmanuel ate 2/6 of the bread.',
    },
    {
      id: 'q3',
      text: 'What is 3/10 + 4/10?',
      options: ['7/20', '7/10', '12/10', '1/10'],
      correct: 1,
      explanation: 'Same denominator — just add the numerators: 3 + 4 = 7. Keep the denominator: 7/10.',
    },
    {
      id: 'q4',
      text: 'Which of these is a proper fraction?',
      options: ['8/3', '5/5', '3/7', '10/4'],
      correct: 2,
      explanation: 'A proper fraction has a numerator smaller than the denominator. Only 3/7 fits — 3 is less than 7.',
    },
    {
      id: 'q5',
      text: 'Fatima planted crops in 4/9 of her field on Monday and 3/9 on Tuesday. How much of the field has crops now?',
      options: ['7/18', '1/9', '7/9', '4/9'],
      correct: 2,
      explanation: '4/9 + 3/9 = 7/9. Same denominator, so add the numerators: 4 + 3 = 7.',
    },
  ],
}
