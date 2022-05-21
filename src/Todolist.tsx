import React, {useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton, List} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeTodolistFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export const Todolist = React.memo((props: PropsType) => {

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolistId)
    }, [props])

    const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.todolistId),
        [props])
    const changeTaskStatus = useCallback((taskId: string, isDone: boolean) => {
        props.changeTaskStatus(taskId, isDone, props.todolistId);
    }, [props])
    const changeTaskTitle = useCallback((taskId: string, title: string) => {
        props.changeTaskTitle(taskId, title, props.todolistId);
    }, [props])


    const onAllClickHandler = useCallback(() => props.changeTodolistFilter(props.todolistId, "all"),
        [props])
    const onActiveClickHandler = useCallback(() => props.changeTodolistFilter(props.todolistId, "active"),
        [props])
    const onCompletedClickHandler = useCallback(() => props.changeTodolistFilter(props.todolistId, "completed"),
        [props])
    const changeTodolistHandler = useCallback((newTitle: string) => {
            props.changeTodolistTitle(newTitle,props.todolistId)
        },
        [props])

    let tasksForTodolist = props.tasks

    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
    }
    return (
        <div className='wrapper'>
            <div className='wrapperBox'>
                <h3 style={{textAlign: "center"}}>
                    <EditableSpan
                        title={props.title} onChange={changeTodolistHandler}/>
                    <IconButton
                        size={"small"}
                        aria-label="delete">
                        <Delete color={"error"} 
                                onClick={() => props.removeTodolist(props.todolistId)}/>
                    </IconButton>
                </h3>
                <div className='errorMessage'>
                    <AddItemForm addItem={addTask}/>
                </div>
                <List>
                    {
                        tasksForTodolist.map(t => {
                                return <Task
                                    key={t.id}
                                    task={t}
                                    removeTask={removeTask}
                                    changeTaskStatus={changeTaskStatus}
                                    changeTaskTitle={changeTaskTitle}
                                />
                            }
                        )}
                </List>
                <div className='btnBox'>
                    <Button
                        variant={props.filter === "all" ? "contained" : "outlined"}
                        onClick={onAllClickHandler}
                        color={"success"}
                        size={"small"}
                    >All
                    </Button>
                    <Button
                        variant={props.filter === "active" ? "contained" : "outlined"}
                        onClick={onActiveClickHandler}
                        color={"success"}
                        size={"small"}
                    >Active
                    </Button>
                    <Button
                        variant={props.filter === "completed" ? "contained" : "outlined"}
                        onClick={onCompletedClickHandler}
                        color={"success"}
                        size={"small"}
                    >Completed
                    </Button>
                </div>
            </div>
        </div>
    )
})
