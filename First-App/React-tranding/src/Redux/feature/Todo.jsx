import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "Todo",
    initialState: { todoData: [] },
    reducers: {
        addTodo: (state, action) => {
            state.todoData.push(action.payload)
        },
        removeTodo: (state, action) => {
            state.todoData = state.todoData.filter((_, i) => i != action.payload)
        },
        EditTodo: (state, action) => {
            const { editItem, todo } = action.payload
            state.todoData[editItem] = todo
        }
    }
})

export default todoSlice.reducer
export const { addTodo, removeTodo, EditTodo } = todoSlice.actions