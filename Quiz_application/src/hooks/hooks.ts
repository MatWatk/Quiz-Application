import { useState, useEffect, useRef } from 'react'
import type { RawQuestion } from '../types/types';

export function useFetchQuestions<T>({
    fetchFunction,
    gameLevel,
    initialData = [],
}: {
    fetchFunction: (args: T) => Promise<RawQuestion[]>;
    gameLevel: T;
    initialData?: RawQuestion[];
}) {
        const [loading, setLoading] = useState<boolean>(false);
        const [error, setError] = useState<string | null>(null);
        const [data, setData] = useState<RawQuestion[]>(initialData);
        const hasFetchedData = useRef<boolean>(false);

        useEffect(() => {
            if (hasFetchedData.current || !gameLevel) return;
            hasFetchedData.current = true;
            const loadQuestions = async () => {
                try {
                    setLoading(true);
                    const questionsData = await fetchFunction(gameLevel);
                    setData(questionsData)
                    setLoading(false);
                } catch (error: unknown) {
                    console.error('Error fetching questions:', error);
                    setError(error instanceof Error ? error.message : 'Failed to load questions');
                    setLoading(false);
                }
            };
            loadQuestions();
        }, [gameLevel]);
        return { loading, error, data };
}
