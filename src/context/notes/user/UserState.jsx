import React, { useState, useEffect } from 'react';
import UserContext from './userContext';

const UserState = (props) => {
    const [user, setUser] = useState({ email: '', name: '' });
    const host = 'http://127.0.0.1:3000';

    const updateUser = (email, name) => {
        setUser({ email, name });
    };

    const fetchUserDetails = async (token) => {
        try {
            const response = await fetch(`${host}/api/auth/getuserfromtoken`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify({ authToken: token }),
            });
            const { name } = await response.json();
            updateUser(token, name);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserDetails(token);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserState;
