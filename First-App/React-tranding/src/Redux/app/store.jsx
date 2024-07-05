import { configureStore } from "@reduxjs/toolkit";
import Counter from "../feature/Counter";
import scroe from "../feature/scroe";
import Todo from "../feature/Todo"
import Presonal_Expense from "../feature/finance"
export const store = configureStore({
    reducer: {
        counterKey: Counter,
        scoreKey: scroe,
        todoKey: Todo,
        preosnalExpesekey: Presonal_Expense
    }
})