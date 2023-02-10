import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Note from '../Note'
import Empty from '../Empty'
import './styles.scss'
import { useRef } from 'react'
import { ColorRing } from 'react-loader-spinner'


const Notes = () => {
    let [notes, setNotes] = useState([])
    let [note, setNote] = useState(undefined)
    let nav = useNavigate()
    let notes_nav = useRef()
    let menu_icon = useRef()
    const[loading, setLoading] = useState(true)
    
    const update_state_from_child = useCallback(() => {
        fetch_notes()
    }, [])

    let create_note = async () => {
        setLoading(true)
        let user = JSON.parse(localStorage.getItem('user'))

        fetch('https://notes-app-api.azurewebsites.net/api/note/new/', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                title: 'New Note',
                content: 'Note Content',
                user_id: user.id
            })
        })
        .then(res => res.json())
        .then(data => {
            fetch_notes()
            setNote(data)
            setLoading(false)
        })
    }

    let fetch_notes = async () => {
        fetch(`https://notes-app-api.azurewebsites.net/api/notes/${JSON.parse(localStorage.getItem('user')).username}/`)
        .then(res => res.json())
        .then(data => setNotes(data))
        setLoading(false)
    }

    let delete_note = async (note_id) => {
        fetch(`https://notes-app-api.azurewebsites.net/api/notes/delete/${note_id}/`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(() => {
            fetch_notes()
            setNote(undefined)
        })
    }

    

    useEffect(() => {
        if (localStorage.getItem('user')) {
            fetch_notes()

            menu_icon.current.addEventListener('click', () => {
                if (notes_nav.current.classList.contains('active')) {
                    notes_nav.current.classList.remove('active')
                    menu_icon.current.classList.remove('bx-x')
                    menu_icon.current.classList.add('bx-menu')
                } else {
                    notes_nav.current.classList.add('active')
                    menu_icon.current.classList.add('bx-x')
                    menu_icon.current.classList.remove('bx-menu')
                }
            })
        } else {
            nav('/sign-in')
        }
    }, [nav])

    return (
        <div className="notes component">
            <i className="bx bx-menu menu" ref={menu_icon}></i>
            <div className="nav" ref={notes_nav}>
                <div className="title-wrapper">
                    <span className="title">My Notes.</span>
                    <span className='counter'>{notes.length}</span>
                </div>
                      {notes?.map(note_instance => (
                        <div key={note_instance.id} className="note" onClick={() => {
                        setNote(note_instance)
                        notes_nav.current.classList.remove('active')
                        menu_icon.current.classList.remove('bx-x')
                        menu_icon.current.classList.add('bx-menu')
                        }}>
                            {note_instance.title}
            
                            <span className="date">{
                                new Date(note_instance.updated_at).toLocaleDateString()
                            }</span>

                            <span className="delete" onClick={() => delete_note(note_instance.id)}>
                                <i className='bx bx-trash-alt'></i>
                            </span>
                    </div>
                ))}

                <button className="new-note" onClick={create_note}>
                    {loading ? (
                        <ColorRing
                            visible={true}
                            height="40"
                            width="40"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            colors={["#000", "#000", "#000", "#000", "#000",]}
                        />
                    ) :  (
                        <i className="bx bx-plus"></i>
                    )}
                </button>
                
            </div>

            {note ? <Note note_data={note} cb_fn={update_state_from_child} /> : <Empty />}
        </div>
    )
}

export default Notes