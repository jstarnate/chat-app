import { useState } from 'react';
import { get as axiosGet } from 'axios';

const config = {
    headers: { Authorization: sessionStorage.getItem('jwt-token') },
};

function useFetch(url, resolveFn, rejectFn = null) {
    const [loading, setLoading] = useState(false);

    async function execute() {
        setLoading(true);

        try {
            const response = await axiosGet(url, config);

            resolveFn(response);
            setLoading(false);
        } catch (err) {
            if (rejectFn) {
                rejectFn(err.response.data);
            }

            setLoading(false);
        }
    }

    return [execute, loading];
}

export default useFetch;
