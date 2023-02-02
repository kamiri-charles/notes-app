import { useState, useEffect } from 'react'
import './styles.scss'

const Note = ({note_data, cb_fn}) => {

    let [data, setData] = useState(note_data)

    useEffect(() => {
        setData(note_data)
    }, [note_data])

    let update_note = async () => {
        fetch(`http://localhost:8000/api/notes/update/${data.id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            setData(data)
            cb_fn()
        })
    }

    return (
        <div className="note-meta">

            <button className="save" disabled={data.title === note_data.title && data.content === note_data.content} onClick={update_note}>
                <i className="bx bx-check"></i>
            </button>

            <input
                type="text"
                className='note-title'
                placeholder='Untitled'
                value={data.title}
                onChange={e => setData({...data, title: e.target.value})} />


            <textarea
                type="text"
                className='note-content'
                placeholder='Write your note here...'
                value={data.content}
                onChange={e => setData({...data, content: e.target.value})} />


            <div className="note-footer">

                <div className="updated">
                    Last updated: {new Date(data.updated_at).toLocaleDateString()}
                </div>

                <div className="created">
                    Last updated: {new Date(data.created_at).toLocaleDateString()}
                </div>
            </div>
        </div>
    )
}

export default Note