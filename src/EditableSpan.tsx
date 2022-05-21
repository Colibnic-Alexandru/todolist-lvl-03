import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableType = {
    title: string
    onChange: (newTitle: string) => void
}

export function EditableSpan(props: EditableType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.title);

    const EditModeON = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    const EditModeOFF = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField size={"small"}
                     color={"success"}
                     focused
                     value={title}
                     onChange={changeTitle}
                     autoFocus
                     onBlur={EditModeOFF}/>
        : <span onDoubleClick={EditModeON}>{props.title}</span>
}
