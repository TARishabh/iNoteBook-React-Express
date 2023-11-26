import React, { useContext } from 'react';
import Notes from './Notes';
export default function Home(props) {

    return (
        <div className="container">
            <Notes SetAlert={props.SetAlert}></Notes>
        </div>
    );

    
}
