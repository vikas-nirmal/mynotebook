import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props)=>{
    const notesInitial = [
        {
            "_id": "6135dcae5e74f6c0fff6224821",
            "user": "6135cbbe8670cfae85d88e61",
            "title": "my notes",
            "description": "vikas is a good boy",
            "tag": "morning",
            "date": "2021-09-06T09:17:34.833Z",
            "__v": 0
          },
          {
            "_id": "6135ddcaf5e74f6c0ffg6g224823",
            "user": "6135cbbe8670cfae85d88e61",
            "title": "my notes",
            "description": "vikas is a good boy",
            "tag": "morning",
            "date": "2021-09-06T09:17:35.389Z",
            "__v": 0
          },
          {
            "_id": "6135dcae5de7f46c0ffg6224821",
            "user": "6135cbbe8670cfae85d88e61",
            "title": "my notes",
            "description": "vikas is a good boy",
            "tag": "morning",
            "date": "2021-09-06T09:17:34.833Z",
            "__v": 0
          },
          {
            "_id": "6135dcadf5e74f6c0ffg6224823",
            "user": "6135cbbe8670cfae85d88e61",
            "title": "my notes",
            "description": "vikas is a good boy",
            "tag": "morning",
            "date": "2021-09-06T09:17:35.389Z",
            "__v": 0
          },
          {
            "_id": "61d35dcae5e746c0fhgf6224821",
            "user": "6135cbbe8670cfae85d88e61",
            "title": "my notes",
            "description": "vikas is a good boy",
            "tag": "morning",
            "date": "2021-09-06T09:17:34.833Z",
            "__v": 0
          },
          {
            "_id": "6135dcaf5e746cg0ff625424823",
            "user": "6135cbbe8670cfae85d88e61",
            "title": "my notes",
            "description": "vikas is a good boy",
            "tag": "morning",
            "date": "2021-09-06T09:17:35.389Z",
            "__v": 0
          },
          {
            "_id": "6135dcae5ef746c0tff6224821",
            "user": "6135cbbe8670cfae85d88e61",
            "title": "my notes",
            "description": "vikas is a good boy",
            "tag": "morning",
            "date": "2021-09-06T09:17:34.833Z",
            "__v": 0
          },
          {
            "_id": "6135dcfyaf5e746c0ff6224823",
            "user": "6135cbbe8670cfae85d88e61",
            "title": "my notes added",
            "description": "vikas is a good boy added",
            "tag": "morning",
            "date": "2021-09-06T09:17:35.389Z",
            "__v": 0
          }
    ]

    const [notes, setNotes] = useState(notesInitial)


    //add a note
    const addNote = (title, description, tag )=>{
      
     const note = {
      "_id": "6135dcfyaf5e746c0ff6224823",
      "user": "6135cbbe8670cfae85d88e61",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-09-06T09:17:35.389Z",
      "__v": 0
    }
      setNotes(notes.concat(note))
    }


    //delete a note
    const deleteNote = (id)=>{
      const newNote = notes.filter((note)=>{
        return(
          note._id!==id
        )
      })
      setNotes(newNote)
    }



    //update a note
    const editNote = ()=>{
      
    }




        return(
            <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
                {props.children}
            </NoteContext.Provider>
        )
}


export default NoteState;