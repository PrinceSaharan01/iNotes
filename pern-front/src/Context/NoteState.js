import React, { useState } from "react";
import NoteContext from "./NotesContext";


const NoteState = (props) => {
    const [notes, setNotes] = useState([])

    const fetchData = async () => {

        const data = await fetch('http://localhost:5050');
        const result = await data.json();
        // console.log(result);
        setNotes(result);

    }


    return (

        <NoteContext.Provider value={{notes , fetchData}} >
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;