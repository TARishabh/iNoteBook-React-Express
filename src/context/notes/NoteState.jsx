import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://127.0.0.1:3000";
    // const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU1ZDJiMGNhNjJjZGRkZWRhZmI5ZTk1In0sImlhdCI6MTcwMDYwNDc1MH0.BIWB5l-euMim-M6azY3fPlfTCn3V0QbgwjUsUTkLOEw"
    const authToken = localStorage.getItem('token')
    const notesInitial = [
        { "id": "1", title: "My First", description: "Hello" },
        { "id": "2", title: "My Second", description: "No Hello" },
        { "id": "3", title: "My Second", description: "No Hello" },
        { "id": "4", title: "My Second", description: "No Hello" },
        { "id": "5", title: "My Second", description: "No Hello" },
        { "id": "6", title: "My Second", description: "No Hello" },
        { "id": "7", title: "My Second", description: "No Hello" },
        { "id": "8", title: "My Second", description: "No Hello" },
    ]

    const [notes, setNotes] = useState(notesInitial);

    const getNotes = async ()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization":authToken
            },
        })
        const res =  await response.json();
        setNotes(res);
    }

    const addNote = async (title, description, tag) => {

        const note = {
            id:10,
            title: title,
            description: description,
            tag:tag
        };
        setNotes(notes.concat(note));
        const response = await fetch(`${host}/api/notes/addnote`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization":authToken
            },
            body:JSON.stringify(note)
        })
        const res =  await response.json();
        
    };

    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type": "application/json",
                "Authorization":authToken
            }
        })
        const res =  await response.json();
        const newNotes = notes.filter((note) => note.id !== id);
        setNotes(newNotes);
    };

    const editNote = async (id, title, description, tag) => {
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element.id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        };
        // Define the URL and data variables
        const url = `${host}/api/notes/updatenote/${id}`; // Replace with your actual API endpoint
        const data = {
            id: id,
            title: title,
            description: description,
            tag: tag,
        };

        // Make the fetch call
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization":authToken
            },
            body: JSON.stringify(data),
        });

        // Return the JSON response
        return await response.json();
    };

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
