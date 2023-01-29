import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../Header"
import './styles.scss'

const Note = ({note}) => {
    let nav = useNavigate()
    let [data, setData] = useState(note)

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            nav('/sign-in')
        } else {
            setData(note)
        }
    }, [nav, note])

    let update_note = async () => {
        fetch(`http://localhost:8000/api/notes/update/${note.id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => setData(data))
    }

    return (
        <div className="note-meta">

            <Header />
            <div className="save" onClick={update_note}>
                <i class='bx bx-check'></i>
            </div>
            
            <input
                className="note-title"
                placeholder="Untitled"
                value={data.title}
                onChange={e => setData({...data, title: e.target.value})} />

            <textarea
                placeholder="Write your note here..."
                value={data.content}
                onChange={e => setData({...data, content: e.target.value})}>
            </textarea>

            <div className="note-footer">
                
                <div className="updated">Last updated: {
                    new Date(data.updated_at).toLocaleDateString()
                }</div>

                <div className="created">Created on: {
                    new Date(data.created_at).toLocaleDateString()
                }</div>
                
            </div>
        </div>
    )
}

export default Note;