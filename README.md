# DevOps Quiz App
A simple quiz app for DevOps topics.

1. Team and GH repository Information
Student 1 
•	Name: Sulistianto Pratomo
•	Student 1 ID: 60301414
•	Assigned Role: Student A
Student 2 
•	Name: Kareem Abdalla
•	Student 2 ID: 60302080
•	Assigned Role: Student B

## Question Format

The quiz questions are stored in `data/questions.json` as an array of objects.
Each question follows this structure:

```json
{
  "id": "Q1",
  "topic": "Continuous Integration",
  "question": "What is the primary goal of Continuous Integration?",
  "options": [
    "Automatically deploy to production",
    "Frequently integrate code changes into a shared repository",
    "Eliminate the need for testing",
    "Remove the need for branches"
  ],
  "answerIndex": 1,
  "explanation": "Continuous Integration aims to detect integration issues early."
}

## Features
- Topic selection (All topics or single topic)
- Shows one question at a time with 4 options
- Immediate feedback and explanation after answering
- Next and Restart buttons for navigation
