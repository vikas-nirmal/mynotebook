import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    



    
  return (
      <div className="container my-4">
        <h2>Add a note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Example textarea
            </label>
            <textarea
              className="form-control mb-3"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
            <button type="submit" className="btn btn-primary" onClick={handleClick}>
              Add note
            </button>
          </div>
        </form>
      </div>
  );
};

export default AddNote;
