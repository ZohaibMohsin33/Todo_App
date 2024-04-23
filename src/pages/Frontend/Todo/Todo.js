
import "../../../config/global"
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { fireStore } from '../../../config/firebase';
import { collection, setDoc, serverTimestamp,getDocs,doc,deleteDoc } from "firebase/firestore/lite";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';



let arr=[] ;
export default function Todo() {
    
    let [document,setDocument] =useState([]);
    const { user } = useContext(AuthContext);
    let getData = async () => {
        setDocument([]);
        const querySnapshot = await getDocs(collection(fireStore, "cities"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            let data = doc.data();
            arr.push(data);
        });
        console.log("Hi")
        setDocument(arr);
        console.log("done");
    }

    useEffect(() => {
        getData();
    }, [])

    const randomId = Math.random().toString(36).slice(2);
    const initialState = {
        name: "",
        todo: ""
    }
    const addDocument = async (todo) => {
        // console.log("main bhi chal rha hu")
        setIsProcessing(true);
        try {
            await setDoc(doc(fireStore, "cities", randomId), todo);
            console.log("Document written with ID: ",todo.id);
            window.notify("Your todo added successfully", "success")
            // setDocument = [];
            getData();

        } catch (e) {
            console.error("Error adding document: ", e);
            window.notify("Couldn't add the todos", "error");
        }
        setIsProcessing(false);
    }

    // const { dispatch } = useContext(AuthContext);
    const [state, setState] = useState(initialState);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleChange = (e) => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = state;
        formData.dateCreated = serverTimestamp();
        formData.id = randomId
        formData.createdBy = {
            email: user.email,
            id: user.uid
        }
        addDocument(formData)

    }
   let deleteTodo = async(todo)=>{
    console.log("I'm working delete");
    console.log(todo)
    console.log(todo.id);
    await deleteDoc(doc(fireStore, "cities", todo.id));

    let newDoc = document.filter((doc)=>{
        return doc.id !== todo.id
        
    })

    setDocument(newDoc);
   }

    return (
        <div className='container'>
            <form className='card p-3' style={{ width: 600 }} onSubmit={handleSubmit}>
                <div className="mb-3 row">
                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" name='name' className="form-control" onChange={handleChange} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Todo</label>
                    <div className="col-sm-10">
                        <input type="text" name='todo' className="form-control" id="inputPassword" onChange={handleChange} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col">

                        <button className='btn btn-success w-100' onClick={handleSubmit}>
                            {!isProcessing ?

                                "Submit" :
                                <div className="spinner spinner-border"></div>
                            }
                        </button>
                    </div>
                </div>
            </form>

            <div className="card p-5 mt-3" style={{ width: 600 }}>
                <div className="row my-3">
                    <div className="col text-center">
                        <h2>Here's the list of Todos</h2>
                    </div>
                </div>
                <div className="row">
                    {document.length > 1 ?
                        <div className="col">
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>sr no.</Th>
                                        <Th>Name</Th>
                                        <Th>Todo</Th>
                                        <Th>Actions</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {document.map((todo, i) => {
                                        return (
                                            <Tr key={i}>
                                                <Td>{i+1}</Td>
                                                <Td>{todo.name}</Td>
                                                <Td>{todo.todo}</Td>
                                                <Td>
                                                    <button className="btn btn-sm btn-info me-2">Edit</button>
                                                    <div className="btn btn-sm btn-danger" onClick={()=>{deleteTodo(todo)}}>Delete</div>
                                                </Td>
                                            </Tr>)
                                    })}
                                </Tbody>
                            </Table>
                        </div>
                        :
                        <div className="col text-center">
                            <p className="text-danger fs-3 fw-bold">No Data Found</p>
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}

