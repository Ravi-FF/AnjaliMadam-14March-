import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, EditTodo, removeTodo } from './feature/Todo'

export default function Todo() {
    const [todo, setTodo] = useState("")
    const dispatch = useDispatch()
    const [editItem, setEditItem] = useState(null)
    const selector = useSelector((state) => state.todoKey.todoData)
    const handleClick = () => {
        if (editItem == null) {
            dispatch(addTodo(todo))
        } else {
            dispatch(EditTodo({ editItem, todo }))
            setEditItem(null)
        }
        setTodo("")
    }
    const editTodo = (index) => {
        setTodo(selector[index])
        setEditItem(index)
    }
    return (
        <div style={{ padding: "50px" }}>
            <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} placeholder='Enter your name' />
            <button onClick={() => handleClick()}>{editItem == null ? "Add Item" : "Edit Item"}</button>
            {selector.map((item, i) => {
                return <ul key={i}>
                    <li>{item} <button onClick={() => dispatch(removeTodo(i))}>Delete</button> <button onClick={() => editTodo(i)}>Edit</button> </li>
                </ul>
            })}
        </div>
    )
}
