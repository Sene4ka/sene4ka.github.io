import { useState, useEffect } from 'react';

export function useFetchJson<T>(url: string | null, deps: any[] = []) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!url) return;

        console.log('Fetching:', url);

        let isMounted = true;
        setLoading(true);
        setError(null);

        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(json => {
                console.log('Fetch success:', json);
                if (isMounted) setData(json);
            })
            .catch(err => {
                console.error('Fetch error:', err);
                if (isMounted) setError(err.message);
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [url, ...deps]);

    return { data, loading, error };
}
