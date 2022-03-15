import { useDispatch } from "react-redux"
import { addTodo,selectTodos } from "Store/todos/todosSlice"
import {useState} from 'react'
import {useSelector} from 'react-redux'
import { nanoid } from "@reduxjs/toolkit"



const Form = () => {
    const [value, setValue] = useState('') 
    const dispatch = useDispatch()
    const items = useSelector(selectTodos)


    const handleSubmit = (e:any) => {
        e.preventDefault()
        
        if (value.trim()==="") {
            return false
        
            
        }

        if(value.trim()){
            dispatch(addTodo({
                id: nanoid(),
                title: value,
                completed: false
            }))
            setValue('')
        }
        
    }

    const handleChange = (e:any) => {
        setValue(e.target.value)
    }
    return (
        <form onSubmit={handleSubmit} >
            <input className="new-todo" value={value} placeholder="What needs to be done?"  onChange={handleChange} autoFocus/>
        </form>
    )
}

export default Form