import { useEffect, useState, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ColorRing, Oval } from 'react-loader-spinner'
import Note from '../Note'
import Empty from '../Empty'
import './styles.scss'


const Notes = () => {
    let [notes, setNotes] = useState(null)
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

        const updateValue = (event) => {
            const oldUsername = JSON.parse(event.oldValue).username;
            const newUsername = JSON.parse(event.newValue).username;

            if (oldUsername &&
                !newUsername &&
                event.key === 'user') {
              nav('/sign-in')
            }
          }

          window.addEventListener('storage', updateValue, false);
          return () => {
            window.removeEventListener('storage', updateValue, false);
          }


    }, [nav])

    return (
        <div className="notes component">
            <i className="bx bx-menu menu" ref={menu_icon}></i>
            <div className="nav" ref={notes_nav}>
                <div className="title-wrapper">
                    <span className="title">My Notes.</span>
                    <span className='counter'>{notes?.length}</span>
                </div>
                      {notes ? notes.map(note_instance => (
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
                )) : (
                    <Oval
                        height={30}
                        width={30}
                        color="#000"
                        ariaLabel='oval-loading'
                        secondaryColor="rgba(0, 0, 0, 0.5)"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                    />
                )}

                <button className="new-note" onClick={create_note}>
                    {loading ? (
                        <ColorRing
                            height="40"
                            width="40"
                            ariaLabel="blocks-loading"
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