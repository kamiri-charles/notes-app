import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../Header"
import './styles.scss'

const Note = ({note}) => {
    let nav = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            nav('/sign-in')
        }
    })

    return (
        <div className="note-meta">
            <Header />
            <div className="note-title" contentEditable>{note.title}</div>
            <textarea value={note.content}></textarea>

            <div className="note-footer">
                
                <div className="updated">Last updated: {
                    new Date(note.updated_at).toLocaleDateString()
                }</div>

                <div className="created">Created on: {
                    new Date(note.created_at).toLocaleDateString()
                }</div>
                
            </div>
        </div>
    )
}

export default Note;