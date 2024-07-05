import React from 'react'
import { createSlice, configureStore } from '@reduxjs/toolkit'
const counterSlice = createSlice({
    name: "Counter",
    initialState: { count: 1000 },
    reducers: {
        increment: (state, action) => {
            state.count++
        },
        decrement: (state, action) => {
            state.count--
        },
        incrementByValue: (state, action) => {
            state.count += action.payload
        },
        InputValue: (state, action) => {
            state.count += action.payload
        }
    }
})

export default counterSlice.reducer
export const { increment, decrement, incrementByValue, InputValue } = counterSlice.actions