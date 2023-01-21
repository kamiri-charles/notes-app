import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import Header from "../Header"

const Notes = () => {
    let [notes, setNotes] = useState([]);
    let nav = useNavigate();

    let fetchNotes = async () => {
        fetch(`http://localhost:8000/api/notes/${JSON.parse(localStorage.getItem('user')).username}/`)
        .then(res => res.json())
        .then(data => setNotes(data))
    }

    useEffect(() => {
        // Check if user data is in local storage
        if (localStorage.getItem('user')) {
            fetchNotes();
        } else {
            nav('/sign-in');
        }
    }, [nav])

    return (
        <div className="notes">
            <Header />
            {notes.map(note => (
                <div className="note" key={note.id}>
                    <h3>{note.title}</h3>
                </div>
            ))}
        </div>
    )
}

export default Notes