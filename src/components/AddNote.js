import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title:"", description:"", tag:"Default"})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }

  return (
      <div className="container my-4">
        <h2>Add a note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Example textarea
            </label>
            <textarea
              className="form-control mb-3"
              type="text"
              id="description"
              name="description"
              rows="3"
              onChange={onChange}
            ></textarea>
            <button type="submit" className="btn btn-primary" onClick={handleClick}>
              Add Note
            </button>
          </div>
        </form>
      </div>
  );
};

export default AddNote;
