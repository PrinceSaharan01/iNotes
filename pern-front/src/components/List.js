import React, { useContext, useEffect } from "react";
import NoteContext from "../Context/NotesContext";
import Edit from "./Edit";

const List = () => {

    const context = useContext(NoteContext);
    const { fetchData, notes } = context;



    useEffect(() => {
        fetchData();
    }, [])


    // deleting  the note

    const deleteData = async (id) => {

        const data = await fetch(`http://localhost:5050/delete/${id}`, {
            method: "delete"
        })
        // console.log(id);
        fetchData();


    }



    return (
        <>
            <div className="row my-3">

                {
                    notes.map((note, k = 0) =>

                        <div key={k} className="col-md-3" >
                            <div className="card my-3 mx-3">

                                <div className="card-body">
                                    <p className="card-text">{note.description}</p>
                                    <i onClick={() => { deleteData(note.todo_id) }} className="fa fa-trash mx-3" aria-hidden="true"></i>
                                    {/* <i className="fa fa-pencil-square-o" aria-hidden="true"></i> */}
                                    <Edit id={note.todo_id} desc={note.description}></Edit>

                                </div>
                            </div>
                        </div>


                    )
                }
            </div>

            <div >


                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Description</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead><tbody>
                        {

                            notes.map((note, k = 0) =>

                                <tr key={k}>
                                    <th >{k + 1}</th>
                                    <td>{note.description}</td>
                                    <td><Edit id={note.todo_id} desc={note.description}></Edit></td>
                                    <td><i onClick={() => { deleteData(note.todo_id) }} className="fa fa-trash mx-3" aria-hidden="true"></i></td>
                                </tr>

                            )
                        }
                    </tbody>
                </table>
            </div>

        </>
    )

}
export default List;