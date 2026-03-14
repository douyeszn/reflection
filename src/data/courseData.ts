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

export const ALL_COURSES: Course[] = [] // populated below

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

// ── Long Division ─────────────────────────────────────────────────────────────
export const LONG_DIVISION_COURSE: Course = {
  id: 'long-division',
  title: 'Long Division',
  subject: 'Mathematics',
  grade: 'Primary 4',

  lessons: [
    {
      id: 'div-l1',
      title: 'What is Division?',
      duration: '5 min',
      relatedTopics: ['Multiplication', 'Equal Groups', 'Fractions', 'Sharing'],
      content: [
        { type: 'paragraph', text: 'Imagine you have 12 mangoes and want to share them equally among 3 friends. How many does each friend get? Division answers exactly this kind of question.' },
        { type: 'heading', text: 'Division means splitting into equal groups.' },
        { type: 'paragraph', text: 'We write it as 12 ÷ 3 = 4. This reads as "12 divided by 3 equals 4." Each friend gets 4 mangoes.' },
        { type: 'keypoint', text: 'The number being divided is called the dividend. The number you divide by is the divisor. The answer is the quotient.' },
        { type: 'example', text: '84 ÷ 4 = ?\nHere, 84 is the dividend and 4 is the divisor.\nWe need to find the quotient.' },
        { type: 'paragraph', text: 'Division is the opposite of multiplication. If 4 × 3 = 12, then 12 ÷ 3 = 4 and 12 ÷ 4 = 3. Knowing your times tables makes division much easier.' },
        { type: 'keypoint', text: 'Division fact: if a × b = c, then c ÷ a = b and c ÷ b = a.' },
      ],
    },
    {
      id: 'div-l2',
      title: 'The Long Division Steps',
      duration: '9 min',
      relatedTopics: ['Place Value', 'Multiplication Tables', 'Estimation', 'Remainders'],
      content: [
        { type: 'paragraph', text: 'When numbers are too large to divide in your head, we use long division — a step-by-step method that breaks the problem into smaller pieces.' },
        { type: 'heading', text: 'The four steps: Divide · Multiply · Subtract · Bring down' },
        { type: 'paragraph', text: 'Remember the four steps with this phrase: "Does McDonald\'s Sell Burgers?" — Divide, Multiply, Subtract, Bring down.' },
        { type: 'example', text: 'Let\'s work through 84 ÷ 4:\n\nStep 1 — DIVIDE: How many times does 4 go into 8? → 2\nStep 2 — MULTIPLY: 2 × 4 = 8. Write 8 below.\nStep 3 — SUBTRACT: 8 − 8 = 0.\nStep 4 — BRING DOWN: Bring down the 4. Now divide 04 by 4.\n\nRepeat: 4 ÷ 4 = 1. Multiply: 1 × 4 = 4. Subtract: 4 − 4 = 0.\n\nAnswer: 84 ÷ 4 = 21' },
        { type: 'keypoint', text: 'Write neatly and keep digits in columns. Most errors in long division come from misaligned digits.' },
        { type: 'paragraph', text: 'The method works for any size number. Once you know the four steps, you can divide 3-digit or 4-digit numbers just as easily.' },
        { type: 'keypoint', text: 'Always check your answer by multiplying: 21 × 4 = 84. If you get back the original number, you\'re correct.' },
      ],
    },
    {
      id: 'div-l3',
      title: 'Remainders',
      duration: '7 min',
      relatedTopics: ['Fractions', 'Rounding', 'Modulo', 'Real-World Problems'],
      content: [
        { type: 'paragraph', text: 'Sometimes a number does not divide exactly. The amount left over is called the remainder.' },
        { type: 'heading', text: 'When things don\'t divide evenly.' },
        { type: 'example', text: '17 ÷ 5 = ?\n5 goes into 17 three times (3 × 5 = 15).\n17 − 15 = 2 left over.\nAnswer: 3 remainder 2, written as 3 R2.' },
        { type: 'paragraph', text: 'Samuel has 17 exercise books to distribute equally to 5 students. Each student gets 3 books, and 2 books are left over. The remainder is 2.' },
        { type: 'keypoint', text: 'The remainder is always smaller than the divisor. If your remainder is bigger than the divisor, your quotient is too small — go back and increase it.' },
        { type: 'example', text: 'Check: 3 R2 means (3 × 5) + 2 = 15 + 2 = 17. ✓\nAlways verify: (quotient × divisor) + remainder = dividend.' },
        { type: 'paragraph', text: 'In real life, how you handle a remainder depends on the question. If sharing sweets, you might keep the extras. If calculating how many full buses are needed for 53 students with 10 seats per bus, you round up — you need 6 buses even though the last one won\'t be full.' },
      ],
    },
  ],

  quiz: [
    {
      id: 'div-q1',
      text: 'In the division 72 ÷ 8 = 9, which number is the dividend?',
      options: ['8', '9', '72', '1'],
      correct: 2,
      explanation: 'The dividend is the number being divided — 72. The divisor is 8 and the quotient (answer) is 9.',
    },
    {
      id: 'div-q2',
      text: 'What are the four steps of long division in order?',
      options: [
        'Divide, Add, Subtract, Bring down',
        'Divide, Multiply, Subtract, Bring down',
        'Multiply, Divide, Subtract, Add',
        'Bring down, Divide, Multiply, Subtract',
      ],
      correct: 1,
      explanation: 'Divide, Multiply, Subtract, Bring down — remember "Does McDonald\'s Sell Burgers?"',
    },
    {
      id: 'div-q3',
      text: 'What is 96 ÷ 4?',
      options: ['22', '26', '24', '28'],
      correct: 2,
      explanation: '9 ÷ 4 = 2 remainder 1. Bring down 6 → 16 ÷ 4 = 4. Answer: 24. Check: 24 × 4 = 96. ✓',
    },
    {
      id: 'div-q4',
      text: 'Aline has 23 pencils to share equally among 4 students. How many does each student get, and how many are left over?',
      options: ['6 R1', '5 R3', '4 R7', '6 R2'],
      correct: 1,
      explanation: '4 × 5 = 20. 23 − 20 = 3 left over. Each student gets 5 pencils with 3 remaining. Check: (5 × 4) + 3 = 23. ✓',
    },
    {
      id: 'div-q5',
      text: 'The remainder must always be __ the divisor.',
      options: ['equal to', 'greater than', 'smaller than', 'double'],
      correct: 2,
      explanation: 'The remainder is always smaller than the divisor. If the remainder were equal to or larger than the divisor, you could divide at least one more time.',
    },
  ],
}

// ── Word Problems ─────────────────────────────────────────────────────────────
export const WORD_PROBLEMS_COURSE: Course = {
  id: 'word-problems',
  title: 'Word Problems',
  subject: 'Mathematics',
  grade: 'Primary 4',

  lessons: [
    {
      id: 'wp-l1',
      title: 'Finding the Hidden Question',
      duration: '6 min',
      relatedTopics: ['Reading Comprehension', 'Number Sentences', 'Key Words', 'Planning'],
      content: [
        { type: 'paragraph', text: 'Word problems hide a mathematical question inside a story. Your first job is not to calculate — it is to understand what is being asked.' },
        { type: 'heading', text: 'Read three times. Every time.' },
        { type: 'paragraph', text: 'First read: understand the story. Who is in it? What is happening? Second read: circle all the numbers. Third read: underline the question — usually at the end.' },
        { type: 'example', text: 'Fatima sells tomatoes at the market. On Monday she sold 48 tomatoes. On Tuesday she sold 35 tomatoes. How many tomatoes did she sell in total?\n\nNumbers: 48, 35.\nQuestion: How many in total? → This means ADD.' },
        { type: 'keypoint', text: 'The question sentence is your target. Everything else is information to help you answer it.' },
        { type: 'paragraph', text: 'Sometimes a problem gives you more information than you need. Do not use every number in every calculation — only use what the question asks for.' },
        { type: 'keypoint', text: 'Underline the question word: "how many", "how much", "what is", "how many more". This tells you what your answer should look like.' },
      ],
    },
    {
      id: 'wp-l2',
      title: 'Choosing the Right Operation',
      duration: '8 min',
      relatedTopics: ['Addition', 'Subtraction', 'Multiplication', 'Division'],
      content: [
        { type: 'paragraph', text: 'Once you know the question, you need to choose the correct operation. Certain key words are strong clues.' },
        { type: 'heading', text: 'Key word guide' },
        { type: 'example', text: 'ADD when you see: total, altogether, combined, in all, sum, more than\nSUBTRACT when you see: left, remaining, difference, fewer, less, how many more\nMULTIPLY when you see: each, per, every, times, groups of\nDIVIDE when you see: share equally, split, each person gets, how many groups' },
        { type: 'paragraph', text: 'Jean-Pierre buys 6 notebooks at 150 francs each. How much does he pay in total? The word "each" and the context of repeated equal amounts tells you to multiply: 6 × 150 = 900 francs.' },
        { type: 'keypoint', text: 'Key words are hints, not rules. Always check: does the operation make sense for the story?' },
        { type: 'example', text: 'A class of 36 students is split into equal groups of 4.\nHow many groups are there?\n"Split into equal groups" → divide.\n36 ÷ 4 = 9 groups.' },
        { type: 'paragraph', text: 'Some problems need two steps. Solve the first step, write down the answer, then use it in the second step. Never try to do everything at once in your head.' },
      ],
    },
    {
      id: 'wp-l3',
      title: 'Checking if Your Answer Makes Sense',
      duration: '6 min',
      relatedTopics: ['Estimation', 'Reasonableness', 'Units', 'Inverse Operations'],
      content: [
        { type: 'paragraph', text: 'Getting a number is not the same as getting the right answer. After every word problem, ask yourself: does this answer make sense in real life?' },
        { type: 'heading', text: 'The three-question check.' },
        { type: 'example', text: 'Question 1: Is the size reasonable?\nIf 3 children share 12 sweets, each should get a few — not 1000 and not a fraction of one.\n\nQuestion 2: Does the unit match?\nIf the question asks "how many students", your answer should be a whole number — you cannot have 4.5 students.\n\nQuestion 3: Can I work backwards?\nMultiply your quotient by the divisor. Add back any remainder. Do you get the original number?' },
        { type: 'keypoint', text: 'Estimation is your friend. Round the numbers first and get an approximate answer. If your precise answer is far from your estimate, something went wrong.' },
        { type: 'paragraph', text: 'Claudine scores 245 on a test. The maximum is 100. This is impossible — a score over 100 tells you an error was made somewhere. Always match your answer to the story.' },
        { type: 'keypoint', text: 'Write your answer as a full sentence: "Each student gets 4 pencils." This forces you to check the unit and re-read the question one more time.' },
      ],
    },
  ],

  quiz: [
    {
      id: 'wp-q1',
      text: 'In a word problem, what should you do FIRST before calculating anything?',
      options: [
        'Write the number sentence',
        'Guess the answer',
        'Read the problem carefully and identify the question',
        'Multiply all the numbers together',
      ],
      correct: 2,
      explanation: 'Always read the problem carefully first. Identify what is being asked before choosing an operation or writing anything.',
    },
    {
      id: 'wp-q2',
      text: 'Nakato has 54 stickers. She gives 18 to her sister. How many stickers does Nakato have left?',
      options: ['72', '36', '18', '46'],
      correct: 1,
      explanation: '"Have left" is a key word for subtraction. 54 − 18 = 36 stickers remaining.',
    },
    {
      id: 'wp-q3',
      text: 'A school orders 8 boxes of chalk. Each box has 25 pieces. How many pieces of chalk in total?',
      options: ['33', '17', '200', '125'],
      correct: 2,
      explanation: '"Each box has" signals multiplication. 8 × 25 = 200 pieces of chalk.',
    },
    {
      id: 'wp-q4',
      text: 'You calculate that 4 students share 30 books equally, and each gets 8 books. Which check shows this is wrong?',
      options: [
        '8 + 4 = 12, not 30',
        '8 × 4 = 32, not 30',
        '30 − 8 = 22',
        '30 ÷ 8 = 3',
      ],
      correct: 1,
      explanation: 'Check by multiplying: quotient × divisor should equal the dividend. 8 × 4 = 32 ≠ 30, so the answer is wrong. The correct answer is 7 R2.',
    },
    {
      id: 'wp-q5',
      text: 'Which answer is UNREASONABLE for "How many whole buses are needed to carry 47 students if each bus holds 10?"',
      options: ['4 buses', '5 buses', '47 buses', '4.7 buses'],
      correct: 3,
      explanation: 'You cannot have 4.7 buses — buses are whole objects. The answer must be a whole number. 47 ÷ 10 = 4 R7, so you need 5 buses to carry everyone.',
    },
  ],
}

// Ordered list for the course selector
ALL_COURSES.push(FRACTIONS_COURSE, LONG_DIVISION_COURSE, WORD_PROBLEMS_COURSE)
