# Learning Engineering Research: Grounding Reflection in Evidence

This document summarises the academic papers reviewed to inform the design of Reflection — a classroom engagement tracker and adaptive learning platform for K-12 students. Each section maps findings to concrete feature decisions.

---

## 1. Student Modeling — Knowledge Tracing

### Corbett & Anderson (1995) — Bayesian Knowledge Tracing (BKT)
*User Modeling and User-Adapted Interaction, Springer*

**Finding:** Models each student's latent skill mastery as a hidden Markov model with four parameters: P(init), P(learn), P(slip), P(guess). Route students to new concepts only when P(mastery) ≥ 0.95 with a ≥3 correct answer streak floor.

**Implemented:** `kc` field on every quiz question maps each question to a named Knowledge Component. Per-KC mastery is computable from quiz accuracy per KC.

**To implement next:** BKT engine that updates P(mastery) after each answer and unlocks the next lesson only when threshold is reached.

---

### Piech et al. (2015) — Deep Knowledge Tracing (NeurIPS, Stanford)
*https://stanford.edu/~cpiech/bio/papers/deepKnowledgeTracing.pdf*

**Finding:** LSTM on (question, correct/incorrect) sequences predicts next-question correctness at AUC 0.82–0.86. Implicitly discovers cross-skill transfer without a hand-coded skill graph.

**Decision:** Start with BKT (works on sparse data). Migrate to DKT after ≥500 student interactions are accumulated. DKT output = vector of predicted correctness probabilities across all KCs → use to select problems at 60–70% predicted correctness.

---

### Pandey & Karypis (2019) — SAKT (Self-Attentive Knowledge Tracing)
*EDM 2019 — https://arxiv.org/abs/1907.06837*

**Finding:** Transformer-style self-attention on interaction sequences improves AUC by 4.43% over DKT and runs orders-of-magnitude faster. Attention weights identify which past interaction is driving the current prediction — directly interpretable.

**Decision:** SAKT is the recommended production student model. Its attention heatmap reveals which previously mastered skill a current error traces back to. Use this to generate specific review flashbacks: "You got remainders wrong — let's revisit Problem 12 from two sessions ago."

---

## 2. Engagement Detection

### Winter et al. (2024) — Behavioral Trace Data as Engagement Indicators
*Frontiers in Psychology — https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2024.1396881/full*

**Finding:** Dwell time, revisit count, session length, and click patterns predict engagement sub-dimensions with R² of 0.04–0.13. Effect is stable across time points. **Use a 3-minute rolling window** — session-cumulative averages miss within-session drift, which is the actionable signal.

**Implemented:** `useSignalTracker` tracks all four signals. `computeFlowState` uses these to detect the flow-state window.

**To implement next:** Replace session-cumulative signal averages with a 3-minute rolling window computed from timestamped signal events.

---

### Booth et al. (2023) — Engagement Detection and Applications in Learning
*CU Boulder AI Institute*

**Finding:** Long response latency on *mastered* material signals confusion. Long latency on *new* material signals active processing (desirable difficulty). The two are architecturally different and must not be conflated.

**Implemented:** `computeFlowState` only triggers when revisitCount === 0 (new material). Future mastery-conditional latency gate: `if latency > 2× baseline AND P(mastery) > 0.85 → flag Fading`.

---

### K-12 Learning Analytics Scoping Review (ResearchGate, 2023)

**Finding:** Most platforms measure only *behavioral* engagement (clicks, time-on-task) and miss *cognitive* engagement (self-correction, hint usage). Platforms tracking cognitive engagement correlated better with learning gains.

**To implement next:** Track self-correction ratio: `(answer edits before submitting) / (total problems)`. High self-correction with moderate accuracy = cognitively engaged and on track. Surface alongside accuracy in teacher dashboard.

---

## 3. Formative Assessment

### Banihashem et al. (2025) — Optimizing Formative Assessment with Learning Analytics
*Review of Educational Research, SAGE*

**Finding:** Feedback is most effective when: (1) within the same session, (2) elaborative (explains *why*, not just wrong), (3) tied to a specific skill gap.

**Implemented:** Quiz wrong-answer feedback now shows the Knowledge Component label ("This question tests: Identifying the denominator") alongside the worked explanation. This maps each error to its specific skill gap.

**To implement next:** After a wrong answer, show a micro worked-example → then an immediately following near-identical practice problem (retrieval practice loop).

---

### Sensors 2023 — Real-Time Learning Analytics Dashboard for Affective States
*MDPI*

**Finding:** Notifying instructors after 30 consecutive seconds of disengagement enabled meaningful intervention. Configurable threshold is preferable.

**To implement next:** Configurable inactivity alert (60/90/120s default: 90s) on active problem screens. Push as a pulse indicator on the student card — not a modal that interrupts teaching.

---

### Journal of Learning Analytics (2024) — Early Warning Systems for At-Risk Students

**Finding:** Dual-signal gate (accuracy + engagement combined) reduces false-positive intervention rate from 40% to 18%. Accuracy-only alerts generate too many false positives (productive struggle looks like failing).

**Implemented:** `alertStudents` filter in Dashboard now uses dual-signal gate: `score < 50 AND (status === 'fading' OR status === 'disengaged')`. Caption explains the gate logic.

---

## 4. Spaced Repetition

### Murray et al. (2024) — Spacing Increases Retention of Mathematics Procedures
*PsyArXiv*

**Finding:** Spaced practice significantly outperforms massed practice for K-12 math at all grade levels. The spacing advantage compounds over time. Minimum effective interval: **one school day (24 hours)**.

**Implemented:** `markLessonComplete(lessonId)` records a completion timestamp when a student moves past a lesson. `getLessonsForReview(lessonIds, 86_400_000)` returns lesson IDs due for review (24h threshold). CourseHome shows a "Due for review" queue at the start of each session.

---

### Skycak (2024) — FIRe: Fractional Implicit Repetition in Hierarchical Knowledge Structures
*justinmath.com*

**Finding:** Practicing an advanced topic implicitly reviews its prerequisites. A model called FIRe credits 0.4 repetitions to prerequisite KCs when a harder problem is answered correctly. Prevents the review queue from exploding.

**To implement next:** Model the Fractions → Division → Word Problems progression as a skill DAG. When a student answers a Word Problems question correctly, credit fractional repetition to Fractions and Division KCs.

---

### STEM Education Meta-Analyses (Springer, 2024)

**Finding:** Spaced retrieval practice shows consistent positive effects (d = 0.2–0.5) across STEM courses even with 24h intervals. 2–3 review problems at the *start* of each session (the "Do Now" pattern) maximises retention.

**Implemented:** CourseHome surfaces the review queue *before* the regular lesson list, ensuring review happens first.

---

## 5. Curiosity and Intrinsic Motivation

### Gruber et al. (2024) — Curiosity and the Dynamics of Optimal Exploration
*Trends in Cognitive Sciences*

**Finding:** Curiosity is a dynamic state that spikes when learners encounter information gaps. Self-perception of progress is a stronger curiosity driver than external reward. Granular micro-progress feedback triggers curiosity loops.

**To implement next:** Animate per-KC mastery bar to show even a 2% uptick after each correct answer. If P(mastery) stalls (< 5% change over 10 problems), reduce difficulty — the student has hit a knowledge floor.

---

### OECD (2024) — Learning Compass: Curiosity Construct

**Finding:** Curiosity is measurable via: voluntary re-engagement with content, question-asking frequency, voluntary depth (reading optional explanations, exploring alternatives). Curiosity correlates with long-term outcomes independently of prior achievement.

**Implemented:** Related topics ("Explore more") in LessonView are now tracked individually. Clicked topics turn green with a checkmark — confirming that the exploration signal was noted. Exploration count is stored in `explorationDepth` and surfaced in teacher dashboard Pulse tab.

---

### Frontiers in AI (2024) — Intrinsic Motivation and Pattern Discovery

**Finding:** Curiosity arises when a cognitive system detects partial patterns. Deliberate pattern-near-misses (problems that almost follow a rule but have one twist) generate measurably higher re-engagement rates.

**To implement next:** Design one "curiosity problem" per KC cluster — a question that appears to follow the pattern but has a structural twist. Track voluntary attempt rates as a curiosity signal.

---

## 6. Teacher Dashboard Design

### MDPI Education Sciences (2023) — Co-Developing LADs with K-12 Teachers (HCD)

**Finding:** Dashboards with >5 simultaneous metrics are unusable during class. Teachers want exactly: (1) who needs help right now, (2) how did the class do overall, (3) what should I do next.

**Decision:** Teacher header shows ≤3 stats (total students, thriving count, alert count). Tab bar limits each view to one purpose. No metric shown without a direct instructional action available.

---

### Springer Smart Learning Environments (2025) — Multi-Modal LAD in K-12

**Finding:** Glanceable dashboards (colour-coded student cards) significantly improve teacher decision speed compared to drill-down views. Actionable alerts outperform raw data displays.

**Implemented:** Student cards use status colour (high/moderate/fading/disengaged) as the primary encoding. Alert count in header is immediately visible. Detail requires a tap — not shown by default.

---

### Springer Education and Information Technologies (2024) — LADs About Learning, Not Just Analytics

**Finding:** Dashboards that surface *learning quality* metrics (knowledge state, misconception patterns) rather than activity metrics (logins, time-on-task) are rated significantly more useful by teachers.

**To implement next:** Misconception library — 15 common fractions/division error patterns. Classify quiz answer errors against this library in real time. Show a misconception flag icon on the student card when 3+ errors match a pattern.

---

## 7. Optimal Challenge Zone (ZPD + Flow)

### ScienceDirect (2022) — AI-Induced Guidance: Preserving the Optimal ZPD

**Finding:** Maintaining student accuracy in the **60–75% band** produced the highest learning gains. After every 5 problems: if accuracy > 75%, increase IRT difficulty 0.3 levels; if < 60%, decrease.

**To implement next:** Dynamic Difficulty Adjustment (DDA) engine. Requires two difficulty tiers per question (currently flat). Add a `difficulty: 'standard' | 'hard'` field to `QuizQuestion`. Start all students at `standard`; promote to `hard` when rolling accuracy > 75% over 5 consecutive questions.

---

### Zone of Proximal Flow (2025)
*ICE Blog — Intersection of Flow Theory and ZPD in Game-Based Learning*

**Finding:** Flow state = response latency within 1 SD of session baseline + accuracy 65–80% + no revisits for 5+ consecutive problems. During flow: **do not interrupt**. Hints, animations, and engagement nudges break the flow channel.

**Implemented:** `computeFlowState` in `useSignalTracker` detects flow state from `SessionSignals`. `SessionRecord` now stores `flowState: boolean`. In the Dashboard Pulse tab, live sessions show a "In Flow" badge for qualifying students, signalling teachers to suppress intervention.

---

## Prioritised Feature Roadmap

| Priority | Feature | Research Basis | Status |
|---|---|---|---|
| 1 | Per-KC mastery tracker using BKT | Corbett & Anderson 1995 | Scaffolded (`kc` field added) |
| 2 | Composite 4-signal engagement score with 3-min rolling window | Winter et al. 2024 | Partial (session-level signals tracked) |
| 3 | Dynamic Difficulty Adjustment — target 60–75% accuracy band | ZPD/ScienceDirect 2022 | Planned (`difficulty` field to add) |
| 4 | Dual-signal at-risk gate (accuracy < 50% AND engagement low) | JLA 2024 | **Implemented** |
| 5 | Spaced review queue (24h threshold, start-of-session placement) | Murray 2024 | **Implemented** |
| 6 | Mastery-conditional latency alert (suppress on new skills) | Booth 2023 | Partial (flow state suppresses alerts) |
| 7 | Misconception library — 15 fractions/division error patterns | Springer 2024 | Planned |
| 8 | Flow State detector — suppress interruptions during flow | ZPF 2025 | **Implemented** |
| 9 | Elaborative feedback cards with KC label on wrong answers | Banihashem 2025 | **Implemented** |
| 10 | Voluntary curiosity probe — related topics tracked individually | OECD 2024 | **Implemented** |

---

## Sources

- Corbett & Anderson (1995) — https://link.springer.com/article/10.1007/BF01099821
- Piech et al. (2015) Deep Knowledge Tracing — https://stanford.edu/~cpiech/bio/papers/deepKnowledgeTracing.pdf
- Pandey & Karypis (2019) SAKT — https://arxiv.org/abs/1907.06837
- Winter et al. (2024) — https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2024.1396881/full
- Booth et al. (2023) — https://www.colorado.edu/research/ai-institute/sites/default/files/attached-files/booth_et_al._-_2023_-_engagement_detection_and_its_applications_in_learn.pdf
- Banihashem et al. (2025) — https://journals.sagepub.com/doi/10.3102/00346543251370753
- Sensors 2023 — https://www.mdpi.com/1424-8220/23/9/4243
- JLA Early Warning (2024) — https://learning-analytics.info/index.php/JLA/article/view/8735
- Murray et al. (2024) Spacing — http://aidanhorner.org/papers/Murrayetal_PsyArXiv_2024.pdf
- Skycak FIRe (2024) — https://www.justinmath.com/individualized-spaced-repetition-in-hierarchical-knowledge-structures/
- Springer STEM meta-analyses (2024) — https://stemeducationjournal.springeropen.com/articles/10.1186/s40594-024-00468-5
- Gruber et al. / Trends in Cognitive Sciences (2024) — https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(24)00028-7
- OECD Learning Compass Curiosity (2024) — https://www.oecd.org/content/dam/oecd/en/topics/policy-issues/future-of-education-and-skills/learning-compass-constructs/Curiosity.pdf
- Frontiers AI Curiosity (2024) — https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2024.1397860/full
- MDPI HCD LAD (2023) — https://www.mdpi.com/2227-7102/13/12/1190
- Springer K-12 LAD (2025) — https://link.springer.com/article/10.1186/s40561-025-00410-4
- Springer LADs About Learning (2024) — https://link.springer.com/article/10.1007/s10639-023-12401-4
- ScienceDirect ZPD (2022) — https://www.sciencedirect.com/science/article/pii/S2666920X22000443
- ICE ZPF (2025) — https://icenet.blog/2025/12/02/in-the-zone-the-intersection-of-flow-theory-and-the-zone-of-proximal-development-in-game-based-learning/
