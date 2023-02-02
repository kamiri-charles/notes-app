import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Note from '../Note'
import Empty from '../Empty'
import './styles.scss'

const Notes = () => {
    let [notes, setNotes] = useState([])
    let [note, setNote] = useState(undefined)
    let nav = useNavigate()

    const update_state_from_child = useCallback(() => {
        fetchNotes()
    })


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
            <div className="nav">
                <div className="title">My Notes.</div>
                {notes.map(note_instance => (
                    <div key={note_instance.id} className="note" onClick={e => setNote(note_instance)}>
                            {note_instance.title}
            
                            <span className="date">{
                                new Date(note_instance.updated_at).toLocaleDateString()
                            }</span>

                            <span className="delete">
                                <i className='bx bx-trash-alt'></i>
                            </span>
                    </div>
                ))}
            </div>

            {note ? <Note note_data={note} cb_fn={update_state_from_child} /> : <Empty />}
        </div>
    )
}

export default Notes