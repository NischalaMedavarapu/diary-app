import { useState } from 'react';
import { useAuthContext } from './useAuthContext.js';

export function useLogin() { 
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            console.log("Sending login request with:", { email, password });

            const response = await fetch('http://localhost:5000/api/user/login', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const json = await response.json();
            console.log("Login Response:", json); 

            if (!response.ok) {
                setLoading(false);
                setError(json.error || "Login failed.");
            } else {
                localStorage.setItem('user', JSON.stringify(json));
                dispatch({ type: 'LOGIN', payload: json });
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
            console.error("Login Error:", err);
            setError("Network error. Please try again.");
        }
    };

    return { login, error, loading };
};
