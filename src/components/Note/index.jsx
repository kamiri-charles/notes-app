import { useState, useEffect } from 'react'
import './styles.scss'

const Note = ({note_data, cb_fn}) => {

    let [data, setData] = useState(note_data)

    useEffect(() => {
        setData(note_data)
    }, [note_data])

    return (
        <div className="note-meta">

            <button className="save" disabled={data.title === note_data.title && data.content === note_data.content}>
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