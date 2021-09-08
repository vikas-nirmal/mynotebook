import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //get all note
  const getNote = async () => {
    //api TODO
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNWNiYmU4NjcwY2ZhZTg1ZDg4ZTYxIn0sImlhdCI6MTYzMDkxNTUxOH0.i1HB952nm8g8C5C7ddENMlLkeJlqT7p0OHNoiyccsjs",
      },
    });
    const json = await response.json();
    setNotes(json)
  };

  //add a note
  const addNote = async (title, description, tag) => {
    //api TODO
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNWNiYmU4NjcwY2ZhZTg1ZDg4ZTYxIn0sImlhdCI6MTYzMDkxNTUxOH0.i1HB952nm8g8C5C7ddENMlLkeJlqT7p0OHNoiyccsjs",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //delete a note
  const deleteNote = async (id) => {
    //api TODO
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNWNiYmU4NjcwY2ZhZTg1ZDg4ZTYxIn0sImlhdCI6MTYzMDkxNTUxOH0.i1HB952nm8g8C5C7ddENMlLkeJlqT7p0OHNoiyccsjs",
      },
    });
    const json = await response.json();

    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  //update a note
  const editNote = async (id, title, description, tag) => {
    //api to call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNWNiYmU4NjcwY2ZhZTg1ZDg4ZTYxIn0sImlhdCI6MTYzMDkxNTUxOH0.i1HB952nm8g8C5C7ddENMlLkeJlqT7p0OHNoiyccsjs",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes))
    //logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
