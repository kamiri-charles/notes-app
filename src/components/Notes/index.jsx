import { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import Header from "../Header"
import './styles.scss'

const Notes = () => {
    let [notes, setNotes] = useState([]);
    let nav = useNavigate();

    let fetchNotes = async () => {
        fetch(`http://localhost:8000/api/notes/${JSON.parse(localStorage.getItem('user')).username}/`)
        .then(res => res.json())
        .then(data => setNotes(data))
    }

    useEffect(() => {
        if (localStorage.getItem('user')) {
            fetchNotes();
        } else {
            nav('/sign-in');
        }
    }, [nav])

    return (
        <div className="notes component">
            <Header />
            {notes.map(note => (

                <Link
                    key={note.id}
                    className="note"
                    to={`/note/${note.id}`}>
                        {note.title}
                </Link>

            ))}
        </div>
    )
}

export default Notes