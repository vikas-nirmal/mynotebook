import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNote, editNote } = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({id: "", etitle:"", edescription:"", etag:""})
  useEffect(() => {
    getNote();
    // eslint-disable-next-line
  }, []);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag} )
  };



  const handleClick = (e)=>{
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
}

const onChange = (e)=>{
    setNote({...note, [e.target.name]:e.target.value})
}

  return (
    <>
      <AddNote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit note <i className="far fa-edit mx-2"></i>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">



            <form className="my-3">
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="etitle"
              value={note.etitle}
              name="etitle"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="edescription" className="form-label">
            Description
            </label>
            <textarea
              className="form-control mb-3"
              type="text"
              id="edescription"
              value={note.edescription}
              name="edescription"
              rows="3"
              onChange={onChange}
              minLength={5}
              required
            ></textarea>
            <div className="mb-3">
            <label htmlFor="etag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="etag"
              value={note.etag}
              name="etag"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          </div>
        </form>


            
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cencel
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>
                Update note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your notes</h2>
        <h3>{notes.length === 0 && "Please add a note"}</h3>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} note={note} updateNote={updateNote} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;