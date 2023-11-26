import React, { useContext, useEffect, useRef,useState } from "react";
import NoteContext from "../context/notes/noteContext";
import Noteitem from './Noteitem';
import AddNote from "./AddNote";
import { useNavigate } from 'react-router-dom';
export default function Notes(props) {
    const {SetAlert} = props;
    const navigate = useNavigate();     
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        if (localStorage.getItem('token')){
            getNotes();
        }
        else{
            navigate("/login");
        }
    }, [])
    const [note,setNote] = useState({eid:"",etitle:"",edescription:"",etag:"default"})
    const ref = useRef(null);
    const closeRef = useRef(null);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            eid:currentNote._id ||currentNote ,
            etitle: currentNote.title || "", // Ensure these properties exist
            edescription: currentNote.description || "",
            etag: currentNote.etag || "default",
        });
    };
    const handleOnclick = (e) => {
        e.preventDefault();

        // addNote(note.title,note.description,note.tag);
    }
    const onChange = (e) => {
        setNote({...note,[e.target.name]:e.target.value})
    }

    const updateHandleClick = (e) =>{
        e.preventDefault();
        editNote(note.eid,note.etitle,note.edescription,note.etag);
        closeRef.current.click();
    }
    return (
        <>
            <AddNote></AddNote>

            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <input onChange={onChange}
                                    type="text"
                                    id="etitle"
                                    name='etitle'
                                    className="form-control"
                                    placeholder="title"
                                    value={note.etitle}
                                    required
                                    minLength={5}
                                />
                            </div>

                            <div className="mb-3">
                                <input onChange={onChange}
                                    type="text"
                                    id="edescription"
                                    name='edescription'
                                    className="form-control"
                                    placeholder="description"
                                    value={note.edescription}
                                    minLength={5}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input onChange={onChange}
                                    type="text"
                                    id="etag"
                                    name='etag'
                                    className="form-control"
                                    placeholder="tag"
                                    value={note.etag}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={closeRef} data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5}  type="button" onClick={updateHandleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>You Notes</h2>
                <div className = "container mx-1">
                    {notes.length === 0 && ' No notes to Display '}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
};
