import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/notes/user/userContext';

export default function Login(props) {
    const { SetAlert } = props;
    const host = 'http://127.0.0.1:3000';
    const { updateUser } = useContext(UserContext);
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleOnClick = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const res = await response.json();
        if (res.authToken) {
            localStorage.setItem('token', res.authToken);
            navigate('/');
            SetAlert('Logged In Successfully', 'success');
            updateUser(res.authToken, res.name);
        } else {
            SetAlert('Invalid Credentials', 'danger');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '400px' }}>
            <form>
                <div className="card-body p-3 text-center">
                    <h3 className="mb-4">Login</h3>
                    <div className="mb-3">
                        <input
                            type="email"
                            id="typeEmailX-2"
                            className="form-control"
                            placeholder="Email"
                            value={credentials.email}
                            onChange={onChange}
                            name="email"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            id="typePasswordX-2"
                            className="form-control"
                            placeholder="Password"
                            value={credentials.password}
                            onChange={onChange}
                            name="password"
                        />
                    </div>
                    <div className="mb-3 form-check d-flex justify-content-start align-items-center">
                        <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                        <label className="form-check-label" htmlFor="form1Example3" style={{ marginLeft: '10px' }}>
                            Remember password
                        </label>
                    </div>
                    <button className="btn btn-primary btn-block" type="submit" onClick={handleOnClick}>
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}
