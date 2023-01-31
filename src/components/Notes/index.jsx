import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import Header from "../Header"
import Note from "../Note"
import Empty from "./Empty"
import './styles.scss'

const Notes = () => {
    let [notes, setNotes] = useState([])
    let [note, setNote] = useState()
    let nav = useNavigate()

    let fetchNotes = async () => {
        fetch(`http://localhost:8000/api/notes/${JSON.parse(localStorage.getItem('user')).username}/`)
        .then(res => res.json())
        .then(data => setNotes(data))
    }

    useEffect(() => {
        if (localStorage.getItem('user')) {
            fetchNotes()
        } else {
            nav('/sign-in')
        }
    }, [nav])

    return (
        <div className="notes component">
            <Header />

            <div className="nav">
                <div className="title">My Notes.</div>
                {notes.map(note => (
                    <div
                        key={note.id}
                        className="note"
                        onClick={() => {
                            fetchNotes()
                            setNote(note)
                            }}>
                            {note.title}
                            
                            <span className="date">{
                                new Date(note.updated_at).toLocaleDateString()
                            }</span>

                            <span className="delete">
                                <i className='bx bx-trash-alt'></i>
                            </span>
                    </div>
                ))}
            </div>


            <div className="main">
                {note ? <Note note={note} /> : <Empty />}
            </div>
            
        </div>
    )
}

export default Notes