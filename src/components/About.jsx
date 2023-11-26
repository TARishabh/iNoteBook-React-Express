import React, {useContext, useEffect} from 'react';
import NoteContext from '../context/notes/noteContext';
export default function About() {
    // const a = useContext(NoteContext);
    // useEffect(()=>{
    //     a.update();
    // },[])
    return (
        <div>
            This is About
            {/* This is About {a.state.name} and this type is {a.state.class} */}
        </div>
    )
}
