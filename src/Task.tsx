import React, {ChangeEvent} from 'react';
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {TaskType} from "./Todolist";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, title: string) => void
}

export const Task = React.memo(({task, removeTask, changeTaskStatus, changeTaskTitle}: TaskPropsType) => {
    const onClickHandler = () => removeTask(task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id, e.currentTarget.checked);
    }
    const changeTaskTitleHandler = (newTitle: string) => {
        changeTaskTitle(task.id, newTitle);
    }

    return (
        <ListItem
            style={{padding: '0'}}
            key={task.id} className={task.isDone ? "is-done" : ""}>
            <Checkbox
                color="success"
                inputProps={{'aria-label': 'secondary checkbox'}}
                onChange={onChangeHandler}
                checked={task.isDone}
            />
            <EditableSpan
                onChange={changeTaskTitleHandler} title={task.title}/>
            <IconButton
                size={"small"}
                aria-label="delete">
                <Delete color={"error"} onClick={onClickHandler}/>
            </IconButton>
        </ListItem>
    )
})
