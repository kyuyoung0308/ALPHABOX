import { useState } from 'react';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

import { db, auth } from '../../firebase'
import { useAuthState } from "react-firebase-hooks/auth";

export default function Note({ note, leaveNoteEditor }) {

    const [user] = useAuthState(auth);

    const noteRef = db.collection('users').doc(user.email).collection('notebook').doc(note.id);

    const [body, setBody] = useState(note.note)


    function handleChange(e) {
        setBody(e)
    }

    function handleSave() {
        if (body === undefined) {
            noteRef.update({ note: "" })
        }
        else {
            noteRef.update({ note: body })
        }

        leaveNoteEditor()
    }

    return (
        <div>
            <div className="note-statusbar">
                <h3>{note.name}</h3>
                <button className='save-btn' onClick={handleSave}>Save</button>
            </div>

            <ReactQuill
                placeholder='Start typing buddy...'
                modules={Note.modules}
                formats={Note.formats}
                onChange={handleChange}
                value={body}

            />


        </div>
    )
}

Note.modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block'],
    ],
}

Note.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block',

]

