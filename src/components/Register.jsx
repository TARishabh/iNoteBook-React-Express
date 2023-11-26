import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Register(props) {
    const {SetAlert} = props;
    const host = 'http://127.0.0.1:3000';
    const [credentials,setCredentials] = useState({email:"",password:"",name:"",confirmpassword:""})
    const navigate = useNavigate();     
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleOnClick = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/createuser`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password,name:credentials.name})
        })
        const res =  await response.json();
        if (res.authToken){
            localStorage.setItem('token',res.authToken);
            navigate("/");
            SetAlert("Account Created Successfully",'warning')
        }
    };
    return (
        <div className="container" style={{ maxWidth: '400px' }}>
            <form onSubmit={handleOnClick}>
                <div className="card-body p-3 text-center">
                    <h3 className="mb-4">Sign In</h3>

                    <div className="mb-3">
                        <input
                            type="email"
                            id="typeEmailX-2"
                            className="form-control"
                            placeholder="Email"
                            name='email'
                            onChange={onChange}
                            value={credentials.email}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            id="typeTextX-2"
                            className="form-control"
                            placeholder="Name"
                            name='name' onChange={onChange}
                            value={credentials.name}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            id="typePasswordX-2"
                            className="form-control"
                            placeholder="Password"
                            name='password' onChange={onChange} 
                            required 
                            minLength={5}
                            value={credentials.password}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            id="ctypePasswordX-2"
                            className="form-control"
                            placeholder="Confirm Password"
                            name='confirmpassword' onChange={onChange} required minLength={5}
                            value={credentials.confirmpassword}
                        />
                    </div>

                    <div className="mb-3 form-check d-flex justify-content-start align-items-center">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="form1Example3"
                        />
                        <label className="form-check-label" htmlFor="form1Example3" style={{ marginLeft: '10px' }}>
                            Remember password
                        </label>
                    </div>

                    <button className="btn btn-primary btn-block" type="submit">
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}
