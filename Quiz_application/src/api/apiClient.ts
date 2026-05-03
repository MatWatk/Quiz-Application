import type { Level, RawQuestion } from '../types/types';

export async function fetchQuestions(level: Level, type?: string): Promise<RawQuestion[]> {
    const difficulty = level.toLowerCase();
    const typeParam = type ? `&type=${type}` : '';
    const response = await fetch(`https://opentdb.com/api.php?amount=10&category=17&difficulty=${difficulty}${typeParam}`);
    if(!response.ok) {
        throw new Error('Failed to fetch questions');
    }
    const data = await response.json();
    return data.results;
}