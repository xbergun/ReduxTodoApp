import { useDispatch } from "react-redux"
import { addTodo } from "Store/todos/todosSlice"
import {useState} from 'react'
import {useSelector} from 'react-redux'
import { RootState } from "Store/store"
import { nanoid } from "@reduxjs/toolkit"



const Form = () => {
    const [value, setValue] = useState('') 
    const dispatch = useDispatch()
    const items = useSelector((state) => state.todos.items)


    const handleSubmit = (e) => {
        e.preventDefault()
        if(value.trim()){
            dispatch(addTodo({
                id: nanoid(),
                title: value,
                completed: false
            }))
            setValue('')
        }
        
    }

    const handleChange = (e) => {
        setValue(e.target.value)
    }
    return (
        <form onSubmit={handleSubmit} key={items.id}>
            <input className="new-todo" value={value} placeholder="What needs to be done?"  onChange={handleChange} autoFocus/>
        </form>
    )
}

export default Form