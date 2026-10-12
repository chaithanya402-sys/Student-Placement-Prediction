# Student Placement Prediction System (Machine Learning & AI Platform)

A full-stack, machine-learning-powered student placement predictive analytics dashboard developed for CSE-AIML semester projects, training and placement cells (T&P), and students.

---

## 🌟 Key Features & Screens Implemented (from Design Mockups)

1. **Main Dashboard** (`media_1791295177196.png`):
   - **5 Summary Metric Cards**:
     - Total Students: `1,248` (+12% from last week)
     - Placed Students: `892` (+6% from last week)
     - Placement Rate: `71.5%` (+4.2% from last week)
     - Active Predictions: `156` (+3 from last week)
     - Not Placed: `356` (-2% from last week)
   - **Recent Predictions Table**: Displays Student Name, Branch, CGPA, Placement Probability (%), Predicted Status (`Placed` / `Not Placed`), Date, and Actions.
   - **Quick Access Cards**: Upload Dataset, Make Prediction, View Analytics, and Download Report.
   - **Recent Activity**: Model training performance log (`Random Forest Classifier - 98.7% accuracy`).
   - **Left Sidebar**: Complete navigation matching the new design hierarchy with Quota donut progress (`892/1000 Dataset Records Used`) and user profile (`John Doe`, `john@college.edu`).

2. **AI Prediction Explanation** (`media_1791295186730.jpg` - Screen 2):
   - Prediction Result: `✔ PLACED (84% Probability)`
   - "Why this prediction?" summary box explaining driving attributes.
   - Key Factor Progress Bars: CGPA (8.6), Internship Experience (Yes), Communication Skills (6/10), Technical Skills (8/10), Aptitude Score (7/10).
   - Targeted Actionable Recommendations.

3. **Skill Gap Analysis** (`media_1791295186730.jpg` - Screen 3):
   - 78% Placement Readiness ring gauge.
   - Skill breakdown bars: Technical Skills (80%), Communication (60%), Aptitude (70%), Projects (90%), Internship (100%).
   - Recommended Actions checklist.

4. **What-If Prediction Simulator** (`media_1791295186730.jpg` - Screen 4):
   - Interactive profile simulator: enter new CGPA, Aptitude, and Technical Skills.
   - Real-time simulation engine calculating revised placement probability and outcome.

5. **Resume Analyzer** (`media_1791295186730.jpg` - Screen 5):
   - Drag-and-drop resume upload zone.
   - 78% Resume Match score with Skills Found vs Required Skills benchmark.
   - Targeted resume enhancement recommendations.

6. **Batch Prediction** (`media_1791295186730.jpg` - Screen 6):
   - Bulk CSV file upload for college cohorts.
   - Donut breakdown chart (500 Students: 342 Placed 68%, 158 Not Placed 32%).
   - One-click Report Export.

7. **AI Assistant Drawer Overlay** (Photos 1 & 4):
   - Floating modal with conversational prompt suggestions: `Build a Prediction`, `Explore Insights`, and `Optimize Performance`.

---

## 🚀 How to Run
- Run locally with Python:
  ```bash
  python -m http.server 3000
  ```
- Open [**http://localhost:3000**](http://localhost:3000) in your browser.
