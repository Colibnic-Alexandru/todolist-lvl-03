import {TaskStateType} from '../App';
import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC} from "./todolist-reducer";

const initialState: TaskStateType = {};

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASKS":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.tasksId)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.payload.todolistId]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.todolistId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId
                    ? {...el, isDone: action.payload.isDone}
                    : el)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId
                    ? {...el, title: action.payload.newTitle}
                    : el)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.payload.todolistId]: []
            }

        case "REMOVE-TODOLIST":
            const newState = {...state}
            delete newState[action.payload.id]
            return newState

        default:
            return state
    }
}

type ActionsType =
    ReturnType<typeof removeTasksAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>


export const removeTasksAC = (tasksId: string, todolistId: string) => {
    return {
        type: "REMOVE-TASKS",
        payload: {
            tasksId,
            todolistId
        }
    } as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            title,
            todolistId
        }
    } as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            taskId,
            isDone,
            todolistId
        }
    } as const
}

export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {
            taskId,
            newTitle,
            todolistId
        }
    } as const
}