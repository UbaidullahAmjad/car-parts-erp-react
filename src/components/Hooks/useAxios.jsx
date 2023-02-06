import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// axios.defaults.baseURL = 'https://app.otospex.com/api';

/**
 fixed :
  - no need to JSON.stringify to then immediatly do a JSON.parse
  - don't use export defaults, because default imports are hard to search for
  - axios already support generic request in one parameter, no need to call specialized ones
**/
export const useAxios = (axiosParams) => {
    const [response, setResponse] = useState(undefined);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const controllerRef = useRef(new AbortController());
    const cancelRequest = () => {
        controllerRef.current.abort();
    };

    const fetchData = async (params) => {
        try {
            const result = await axios.request({
                ...params,
                signal: controllerRef.current.signal,
            });
            setResponse(result.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(axiosParams);
    }, []); // execute once only

    return { response, error, loading, cancelRequest };
};


/** 
 Example: How to use this "useAxios" custom hook.
 ************************************************
 import { useAxios } from 'axioshook';
 const App = () => {
    const { response, loading, error } = useAxios({
        method: 'POST',
        url: '/posts',
        headers: { 
            accept: "*",
        },
        data: {  
            userId: 1,
            id: 19392,
            title: 'title',
            body: 'Sample text',
        },
    });

    return (
        <div className='App'>
            <h1>Posts</h1>
            {loading ? (
                <p>loading...</p>
            ) : (
                <div>
                    {error && (
                        <div>
                            <p>{error.message}</p>
                        </div>
                    )}
                    <div> {
                      // no need to use another state to store data, response is sufficient
                      response && <p>{response.id}</p>
                    }
                    </div>
                </div>
            )}
        </div>
    );
 }
 ************************************************
 We can rename with object returns as well:
 const { response: products, loading: productsLoading, error: productsError } = useAxios(...)
 ************************************************
 */