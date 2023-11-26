import React,{ useContext } from 'react'
import UserContext from '../context/notes/user/userContext';
export default function UserDetails() {
    const context = useContext(UserContext);
    const {user} = context;
    return (
        <div className='container'>
            {user.name}
            {console.log(user)}
            {/* {user.name} */}
            {/* {user.email} */}
        </div>
    )
}
