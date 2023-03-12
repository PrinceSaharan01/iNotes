import React, { useContext, useState } from "react";
import NoteContext from "../Context/NotesContext";




const Edit = (props) => {

    const context = useContext(NoteContext)
    const { fetchData } = context;
    const [show, setShow] = useState(false)
    const { id, desc } = props;
    const [description, setVal] = useState('')

    const updated = async () => {


        if (description) {


            const data = await fetch(`http://localhost:5050/update/${id}`, {
                method: "put",
                body: JSON.stringify({ description }),
                headers: {
                    "content-type": "application/json"
                }
            });
            const result = await data.json();
            // console.log(result);
            setShow(false)
            fetchData();
            setVal('');
        }
        else {
            alert("Please Fill The Field")
        }
    }




    return (
        <>
            {!show &&     // show toggles the visibility of the section  

                <i onClick={() => setShow(true)} className="fa fa-pencil-square-o" aria-hidden="true"></i>
            }

            {show &&


                <div>
                    <input value={description} onChange={(e) => setVal(e.target.value)} placeholder={`${desc}`}   ></input><i onClick={updated} className="fa-solid fa-check"></i>  <i onClick={() => setShow(false)} className="fa-solid fa-xmark"></i>
                </div>
            }



        </>
    )

}
export default Edit;