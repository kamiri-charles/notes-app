import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header";

const Note = () => {
    let [note, setNote] = useState();
    let { noteId } = useParams();
    let nav = useNavigate();

    let fetchNote = async (id) => {
        fetch(`/api/note/${id}/`)
        .then(res => res.json())
        .then(data => setNote(data))
    }

    useEffect(() => {
        if (localStorage.getItem('user')) {
            fetchNote(noteId);
        } else {
            nav('/sign-in');
        }
    })

    return (
        <div className="note component">
            <Header />
            <span>{note?.title}</span>
            <div>{note?.content}</div>
        </div>
    )
}

export default Note;