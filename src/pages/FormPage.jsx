import axios from "axios";
import { useEffect, useState} from "react";
import styles from "./formPage.module.scss"


function FormPage(){


    const API = "http://localhost:5000/students"

    const [ students, setStudents ] = useState([])
    const [ inputs, setInputs ] = useState({
        name: " ",
        lastname: " ",
        idGroup: " "
    })

    function changeInput(e){
        const {value, name} = e.target

        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const getStudents = async () =>{
        const {data : response } = await axios.get(API)
        setStudents(response)
    }

    async function postStudents (){
        const response = await axios.post(API ,
            {
                id: String(Number(students[students.length-1].id)+1),
                name: inputs.name,
                lastname: inputs.lastname,
                idGroup: inputs.idGroup
            }
        )
        getStudents()
    }

    const send = (e) =>{
        e.preventDefault()
        console.log(students)
        setInputs({
            name: '',
            lastname: '',
            idGroup: ''
        })
        postStudents()
    }



    useEffect(() => {
        getStudents()
    }, []);

    return(
        <div>
            <form onSubmit={send}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder='NAME'
                    onChange={changeInput}
                    value={inputs.name}
                    name='name'
                />
                <input
                    className={styles.input}
                    type="text"
                    placeholder='LASTNAME'
                    onChange={changeInput}
                    value={inputs.lastname}
                    name='lastname'
                />
                <input
                    className={styles.input}
                    type="text"
                    placeholder='GROUP ID'
                    onChange={changeInput}
                    value={inputs.idGroup}
                    name='idGroup'
                />
                <button>add</button>
            </form>
            <div className={styles.cards}>
                {
                    students.map( (student, id) =>(
                        <div className={styles.card} key={id}>
                            <h4 className={styles.name}>{student.name}</h4>
                            <h4 className={styles.lastname}>{student.lastname}</h4>
                            <h5 className={styles.group}>{student.idGroup}</h5>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default FormPage