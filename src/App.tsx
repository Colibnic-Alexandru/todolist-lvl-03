import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC,} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [todolistId: string]: Array<TaskType>
}

function App() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

    //Function Task
    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTasksAC(taskId, todolistId))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [dispatch])

    const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    }, [dispatch])

    //Function Todolist
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [dispatch])

    const changeTodolistFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    }, [dispatch])


    const todolistComponents = todolists.map(tl => {

        return (
            <Todolist
                key={tl.id}
                todolistId={tl.id}
                title={tl.title}
                tasks={tasks[tl.id]}
                addTask={addTask}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
                removeTodolist={removeTodolist}
                changeTodolistFilter={changeTodolistFilter}
                changeTodolistTitle={changeTodolistTitle}
                filter={tl.filter}
            />
        )
    })

    return (
        <div className='App'>
            <div className='header'>
                <h2>Add Todolist</h2>
                <div className='errorMessage'><AddItemForm addItem={addTodolist}/></div>
            </div>
            <div className='main'>
                {todolistComponents}
            </div>
        </div>
    );
}

export default App;
