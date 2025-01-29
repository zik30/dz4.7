import axios from "axios";
import {useEffect, useRef, useState} from "react";
import styles from "./formPage.module.scss"


function FormPage(){


    const API = "http://localhost:5001/students"
    const modal = useRef("");
    const result = useRef("")

    const [ students, setStudents ] = useState([])
    const [ inputs, setInputs ] = useState({
        name: " ",
        lastname: " ",
        idGroup: " "
    })
    const [ editId, setEditId] = useState(null)



    function changeInput(e){
        const {value, name} = e.target

        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const openResult  =()=>{
        console.log(result.current)
        result.current.style.display = "flex"
    }

    const getStudents = async () =>{
        modal.current.style.display = "none"
        const {data : response } = await axios.get(API)
        setStudents(response)
        setInputs({
            name: '',
            lastname: '',
            idGroup: ''
        })
    }

    async function postStudents (){
        await axios.post(API ,
            {
                id: String(Number(students[students.length-1].id)+1),
                name: inputs.name,
                lastname: inputs.lastname,
                idGroup: inputs.idGroup
            }
        )
        getStudents()
        openResult()
    }

    const send = (e) =>{
        e.preventDefault()
        postStudents()
    }

    async function patch (e){
        e.preventDefault()
        await axios.patch(`${API}/${editId}`, {
            name: inputs.name,
            lastname: inputs.lastname,
            idGroup: inputs.idGroup
        })
        getStudents()
        openResult()
    }



    const modalOpen = (student, id) =>{
        setInputs({
            "id": student.id,
            "name" : student.name,
            "lastname": student.lastname,
            "idGroup": student.idGroup
        })
        modal.current.style.display = "flex"
        setEditId(student.id)
    }

    const deleteBtn = async (id) => {
        const response = await axios.delete(`${API}/${id.id}`)
        getStudents()
        openResult()
    }

    const closeResult=()=>{
        result.current.style.display = "none"
    }

    useEffect(() => {
        getStudents()
    }, []);

    return(
        <div>
            <form onChange={changeInput} onSubmit={send}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder='NAME'
                    value={inputs.name}
                    name='name'
                />
                <input
                    className={styles.input}
                    type="text"
                    placeholder='LASTNAME'
                    value={inputs.lastname}
                    name='lastname'
                />
                <input
                    className={styles.input}
                    type="text"
                    placeholder='GROUP ID'
                    value={inputs.idGroup}
                    name='idGroup'
                />
                <button className={styles.add}>add</button>
            </form>
            <div className={styles.cards}>
                {
                    students.map( (student, id) =>(
                        <div className={styles.card} key={id}>
                            <h4 className={styles.name}>{student.name}</h4>
                            <h4 className={styles.lastname}>{student.lastname}</h4>
                            <h5 className={styles.group}>{student.idGroup}</h5>
                            <button onClick={() => modalOpen(student, id)}>edit</button>
                            <button onClick={()=>deleteBtn(student)}>delete</button>
                        </div>
                    ))
                }
            </div>

            <div ref={modal} className={styles.modalBlack}>
                <form onSubmit={patch} onChange={changeInput} className={styles.modal}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder='NAME'
                        value={inputs.name}
                        name='name'
                    />
                    <input
                        className={styles.input}
                        type="text"
                        placeholder='LASTNAME'
                        value={inputs.lastname}
                        name='lastname'
                    />
                    <input
                        className={styles.input}
                        type="text"
                        placeholder='GROUP ID'
                        value={inputs.idGroup}
                        name='idGroup'
                    />
                    <button className={styles.add}>edit</button>
                </form>
            </div>
            <div onClick={closeResult} className={styles.result} ref={result}>
                <div className={styles.resultInner}>
                    <h1>SUCCESS!</h1>
                </div>
            </div>
        </div>
    )
}

export default FormPage