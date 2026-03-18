# CMU Learning Science Sources

Two sources reviewed: the CMU CS magazine article on African edtech, and the CMU LSFI Learning Principle Cards (partially accessible — the Framer site is JS-rendered, so the full card set was reconstructed from companion sources).

---

## Source 1 — CMU CS Magazine: "Empowering Futures"
*https://magazine.cs.cmu.edu/empowering-futures*

### What It Is
Documents the Mastercard Foundation EdTech Fellowship — a CMU partnership supporting edtech entrepreneurs across Sub-Saharan Africa (South Africa, Nigeria, Kenya). Led by Amy Ogan (HCII) and Christine Niyizamwiyitira (CMU Africa).

### Key Findings Relevant to Reflection

**1. Sequential knowledge building**
Mathematics and language require sequential skill acquisition. Small gaps compound into larger learning failures. The companies funded by this programme build diagnostic tools to find and close individual gaps before progression. This is the empirical case for Reflection's BKT/KC approach: you cannot teach fractions well to a student who hasn't mastered equal parts.

**2. Mobile-first, low-resource design**
Target classrooms have overcrowded settings, limited home computing, and variable connectivity. Solutions that work on phones and low-bandwidth connections reach the most students. Implication for Reflection: keep the student classroom UI lightweight, avoid heavy assets, and ensure the app works offline or near-offline (localStorage-first is correct).

**3. Diagnostic before prescription**
Effective edtech in this context identifies *where* a student's knowledge breaks down before presenting new content. This validates the pre-lesson retrieval prompt (test what you know before teaching new material).

**4. Expert-guided iteration over intuition**
Startups that partnered with CMU learning scientists significantly improved their products. The key lesson: product intuition alone does not reliably produce learning. Ground every feature in a specific learning mechanism.

**5. Africa as an innovation source, not just consumer**
The programme explicitly aims to establish African-led edtech innovation, not just deploy Western models. Implication: contextually relevant examples (Nigerian names, East African currency, local contexts) are not decoration — they are shown to reduce cognitive load and increase engagement. Reflection's lesson content already does this (Amara, Kofi, Emmanuel, Fatima — local examples).

**6. METALS capstone involvement**
CMU's Masters of Educational Technology and Applied Learning Science students engage with these companies as capstone partners. The research questions that arise — chatbots for adult ed, iPad games for early childhood, engagement analytics at scale — feed back into METALS curriculum. Reflection's data collection architecture (localStorage signals, session records) should eventually be designed for research export.

---

## Source 2 — LSFI Learning Principle Cards
*http://cmulearningprinciplecards.framer.website/*

The Framer site is JavaScript-rendered and not scrapeable directly. The principles were reconstructed from companion CMU sources: the Eberly Center learning principles, the OLI Student Cognition Toolbox, and LSFI course descriptions.

### Three Categories

| Category | Purpose |
|---|---|
| **Memory Formation** | Strengthen low-level cognitive processing — retain and quickly recall facts, concepts, associations |
| **Knowledge Refinement** | Correct misconceptions, improve how accurately and flexibly knowledge is applied in new situations |
| **Sensemaking** | Foster reflective thinking, practice reasoning skills, articulate new knowledge for deeper understanding |

---

### Memory Formation Cards

**1. Spaced Practice**
Distribute practice over time. Reviewing material at intervals (1 day, 3 days, 7 days, 21 days) dramatically outperforms massed practice. The forgetting curve makes spaced retrieval necessary for retention.
→ *Implemented in Reflection: `getLessonsForReview` with 24h threshold, review queue shown at session start.*

**2. Practice Quizzing (Retrieval Practice)**
Testing yourself on material — rather than re-reading — is the single most evidence-backed study strategy for retention (Roediger & Karpicke 2006). The act of retrieving strengthens the memory trace. Even failed retrieval attempts improve later recall.
→ *Partially in Reflection: end-of-course quiz exists. Missing: retrieval prompts at the start of each lesson (test what you know before teaching).*

**3. Interleaved Practice**
Mixing different problem types or topics during practice (rather than blocked, sequential practice) improves long-term retention and transfer, even though it feels harder. Students resist it because it reduces *apparent* performance — but the struggle is the mechanism.
→ *Not yet in Reflection: quiz questions are presented in fixed order. Shuffling them across KCs introduces interleaving.*

---

### Knowledge Refinement Cards

**4. Worked Examples**
Studying step-by-step solutions to problems before attempting them independently reduces cognitive load (Sweller) and builds accurate schemas. Critical: worked examples should precede practice problems, not follow them.
→ *In Reflection: lessons contain worked examples in amber blocks. Correct placement: examples come before practice.*

**5. Elaborative Interrogation**
Asking "why is this true?" forces students to connect new information to existing knowledge. More effective than passive reading. Turns declarative knowledge into explanatory knowledge.
→ *Not yet in Reflection: no "why?" prompts in lessons or quizzes.*

**6. Self-Explanation**
Prompting students to explain their reasoning aloud (or in writing) during problem-solving — even to themselves — improves understanding and identifies misconceptions. Works best when paired with worked examples.
→ *Not yet in Reflection: quiz feedback tells students the answer but doesn't ask them to articulate why.*

---

### Sensemaking Cards

**7. Metacognitive Monitoring**
Effective learners assess tasks, evaluate their own strengths and weaknesses, plan their approach, and adjust strategies based on feedback. Most students do not do this naturally — it must be explicitly prompted.
→ *In Reflection: SessionSummary shows students their own engagement signals. This is a scaffolded metacognition prompt ("this is what your teacher sees — does it match how you felt?").*

**8. Prior Knowledge Activation**
Students enter each lesson with existing knowledge that can help or hinder new learning. Activating accurate prior knowledge strengthens new learning; failing to surface inaccurate prior knowledge allows misconceptions to persist.
→ *Not yet in Reflection: no diagnostic pre-check before each lesson. A single recall question at lesson start (from previously mastered material) would activate accurate prior knowledge and double as retrieval practice.*

**9. Knowledge Organisation**
How students mentally organise concepts determines how well they can retrieve and apply them. Meaningful connections (concept maps, skill hierarchies) outperform isolated facts. The structure of knowledge matters as much as the knowledge itself.
→ *Partially in Reflection: `relatedTopics` links in lessons hint at the knowledge graph. Full implementation: show a concept map or skill dependency tree at course completion.*

---

## CMU Eberly Center — 7 Research-Based Learning Principles
*https://www.cmu.edu/teaching/principles/learning.html*

These are the foundational principles behind all CMU learning science work. Every Reflection feature should be traceable to at least one.

| # | Principle | Reflection Application |
|---|---|---|
| 1 | **Prior knowledge helps or hinders** | Pre-lesson retrieval prompt; misconception detection |
| 2 | **Knowledge organisation shapes application** | Skill DAG; relatedTopics links; concept maps |
| 3 | **Motivation directs learning behaviour** | Engagement score; curiosity probe; flow state detection |
| 4 | **Mastery = component skills + integration + application** | KC mastery tracker; multi-step word problems |
| 5 | **Goal-directed practice + targeted feedback** | KC label on wrong answers; elaborative explanation; spaced review |
| 6 | **Developmental context and course climate** | Positive feedback framing; age-appropriate language; local examples |
| 7 | **Metacognition enables self-direction** | SessionSummary signal reflection; "explored" curiosity counter |

---

## LSFI Course Modules (cmulearn.org)

Additional frameworks from the full LSFI curriculum relevant to Reflection:

| Course | Key Principle | Application |
|---|---|---|
| Intro to Learning Engineering | Clear learning goals → assessment → iteration | Every quiz question maps to a KC goal |
| Multimedia for e-Learning (Mayer) | Coherence principle: remove extraneous material; Segmenting principle: short chunks | Lessons are already chunked. Remove decorative content that doesn't aid understanding |
| Evidence to Action | Small evidence-informed adjustments drive meaningful engagement gains | A/B test feedback framing; track KC-level accuracy trends |
| Motivation by Design | Autonomy + competence + relatedness (SDT); progress visibility; growth mindset framing | Progress bar; "In Flow" badge; "Explored X topics" counter; reframe "Not quite" |
| Educational Game Design | Feedback loops; optional challenges; failure as learning signal | Quiz retry; curiosity problems; flow state detection |

---

## What to Implement Next (Prioritised)

These are the highest-leverage additions derivable directly from these two sources, scoped to what the current codebase can absorb:

| Priority | Feature | Source Principle | Effort |
|---|---|---|---|
| 1 | **Quiz question shuffling** for interleaved practice | Interleaved Practice (LSFI Memory Formation) | Low |
| 2 | **Growth-mindset feedback reframing** ("Not quite" → specific encouragement) | Motivation by Design; Course Climate (Eberly #6) | Low |
| 3 | **Pre-lesson retrieval prompt** — one recall question from previous lesson before new content | Retrieval Practice + Prior Knowledge Activation | Medium |
| 4 | **Mayer Multimedia**: add segmenting — break long lesson paragraphs into shorter labelled chunks | Multimedia Principles (LSFI) | Low (content edit) |
| 5 | **Concept map at course completion** — show the KC skill graph | Knowledge Organisation (Eberly #2) | Medium |
| 6 | **Elaborative interrogation prompts** — "Why does this work?" after each keypoint | Elaborative Interrogation (LSFI Knowledge Refinement) | Medium |

---

## Sources

- [CMU CS Magazine — Empowering Futures](https://magazine.cs.cmu.edu/empowering-futures)
- [LSFI Learning Principle Cards](https://cmulearningprinciplecards.framer.website/)
- [Learning Sciences for Innovators — cmulearn.org](https://cmulearn.org/)
- [CMU Eberly Center — 7 Learning Principles](https://www.cmu.edu/teaching/principles/learning.html)
- [CMU Student Success — Learning Principles](https://www.cmu.edu/student-success/other-resources/need-advice/learning-principles.html)
- [CMU OLI — Student Cognition Toolbox](https://oli.cmu.edu/courses/student-cognition-toolbox-open-free/)
- [METALS Programme](https://metals.hcii.cmu.edu/)
