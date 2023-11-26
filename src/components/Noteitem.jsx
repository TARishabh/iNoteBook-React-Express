import React,{useContext} from 'react'
import NoteContext from "../context/notes/noteContext";

export default function Noteitem(props) {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note,updateNote } = props;
    const deleteOnclick = (e) =>{
        e.preventDefault();
        deleteNote(note._id)
    }

    const updateNoteOnClick = (e) =>{
        e.preventDefault();
        updateNote(note._id)
    }
    return (
        <div className='col md-3 my-2'>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                    <h5 className="card-title">{note.title}</h5>
                    {/* <i className="fa-sharp fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i> */}
                    <i className="fa-sharp fa-solid fa-trash mx-2" onClick={deleteOnclick}></i>
                    <i className="fa-regular fa-pen-to-square mx-2" onClick={updateNoteOnClick}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>

        </div>
    )
}
