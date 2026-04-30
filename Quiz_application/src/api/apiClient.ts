export async function fetchQuestions(level: 'Easy' | 'Medium' | 'Hard'|'') {
    const difficulty = level.toLowerCase();
    // const response = await fetch(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`);
    const response = await fetch(`https://opentdb.com/api.php?amount=10&category=17&difficulty=${difficulty}`);
    if(!response.ok) {
        throw new Error('Failed to fetch questions');
    }
    const data = await response.json();
    return data.results;
}