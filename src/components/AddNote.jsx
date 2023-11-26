import React, { useContext, useState } from 'react';
import Notes from './Notes';
import NoteContext from '../context/notes/noteContext';

export default function AddNote() {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: '', description: '', tag: '' });

    const handleOnclick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        // After adding the note, set the state to an empty note
        setNote({ title: '', description: '', tag: '' });
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div className="container" style={{ maxWidth: '400px' }}>
            <div className="card-body p-3 text-center">
                <h3 className="mb-4">Sign in</h3>

                <div className="mb-3">
                    <input
                        onChange={onChange}
                        type="text"
                        id="title"
                        name="title"
                        className="form-control"
                        placeholder="title"
                        value={note.title} // Set value from state
                    />
                </div>

                <div className="mb-3">
                    <input
                        onChange={onChange}
                        type="text"
                        id="description"
                        name="description"
                        className="form-control"
                        placeholder="description"
                        value={note.description} // Set value from state
                    />
                </div>
                <div className="mb-3">
                    <input
                        onChange={onChange}
                        type="text"
                        id="tag"
                        name="tag"
                        className="form-control"
                        placeholder="tag"
                        value={note.tag} // Set value from state
                    />
                </div>

                <button
                    disabled={note.title.length < 5 || note.description.length < 5}
                    onClick={handleOnclick}
                    className="btn btn-primary btn-block"
                    type="submit"
                >
                    click
                </button>
            </div>
        </div>
    );
}
