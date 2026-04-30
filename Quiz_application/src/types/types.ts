export interface rawQuestion {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export interface Question {
    question: string;
    answers: string[];
    correct: string;
}