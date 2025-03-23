import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export function useSignup() {  // ✅ Named Export
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            console.log("Sending signup request with:", { email, password });

            const response = await fetch('http://localhost:5000/api/user/signup', { // ✅ Localhost API
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const json = await response.json();
            console.log("Signup Response:", json); // ✅ Debugging Line

            if (!response.ok) {
                setLoading(false);
                setError(json.error || "Signup failed.");
            } else {
                localStorage.setItem('user', JSON.stringify(json));
                dispatch({ type: 'LOGIN', payload: json });
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
            console.error("Signup Error:", err);
            setError("Network error. Please try again.");
        }
    };

    return { signup, error, loading };
};
