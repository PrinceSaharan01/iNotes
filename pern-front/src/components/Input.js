import React, { useState, useContext } from "react";
import NoteContext from "../Context/NotesContext";

const Input = () => {

    const [description, setDescription] = useState('');
    const [show, setShow] = useState(false);
    const context = useContext(NoteContext);
    const {fetchData} =context;

    const submitted = async (e) => {
        e.preventDefault();
        // console.log(description);

        if (description) {
            const data = await fetch('http://localhost:5050/todo', {
                method: "POST",
                body: JSON.stringify({ description }),
                headers: {
                    "content-type": "application/json"
                }
            });
            const result = await data.json();
            // console.log(result);
            setShow(false);
            setDescription('');
            fetchData();
        } else {
            alert("Please Fill The Required Fields")
            setShow(true)
        }



    }

    return (

        <div className="container">
            <h1 className="text-center mt-5">Input Notes</h1>
            <form className="d-flex  mt-5">
                <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" placeholder="Enter a note..."></input><br></br>

                <button onClick={submitted} className="btn btn-success">Add</button>

            </form>
            {show &&<span style={{ color: 'red' }} className="badge badge-pill badge-danger">*Required</span>}

                

        </div>
    )
}
export default Input;