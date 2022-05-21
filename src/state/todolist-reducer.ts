import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


const initialState: Array<TodolistType> = [];

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return [
                ...state,
                {id: action.payload.todolistId, title: action.payload.title, filter: "all"}
            ]
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        }

        default:
            return state
    }
}
export type ActionType = ReturnType<typeof changeTodolistFilterAC> | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof removeTodolistAC> | ReturnType<typeof addTodolistAC>

export const addTodolistAC = (title:string) => {
    return{
        type: "ADD-TODOLIST",
        payload:{
            title,
            todolistId: v1()
        }
    }as const
}

export const removeTodolistAC = (id: string) => {
    return{
        type: "REMOVE-TODOLIST",
        payload:{
            id
        }
    }as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return{
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            id,
            title
        }
    }as const
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return{
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            id,
            filter
        }
    }as const
}