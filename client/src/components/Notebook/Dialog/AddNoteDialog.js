/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import "./AddNoteDialog.css";

import { db, auth } from '../../../firebase'
import { useAuthState } from "react-firebase-hooks/auth";

export default function Dialog({ show, addNote, cancelDialog }) {

    const [user] = useAuthState(auth);

    const tagRef = db.collection('users').doc(user.email).collection('notebook').doc('tags');


    const [noteName, setNoteName] = useState("")

    const [tags, setTags] = useState([])

    const [selectedTag, setSelectedTag] = useState("")

    const [showError, setShowError] = useState(false);


    function updateTags() {
        tagRef.get().then((snapshot) => {
            const tags = snapshot.data().tags
            setTags(tags)
        })
    }
    useEffect(() => {
        updateTags();
    }, []);

    if (!show) {
        return (<></>)
    }


    function handleChange(event) {
        setNoteName(event.target.value);
    }

    function handleTagChange(e) {
        setSelectedTag(e.target.value);
    }

    function handleAddNote() {
        if (noteName !== '') {
            addNote(noteName, selectedTag);
        } else {
            setShowError(true)
        }
    }

    function handleCancelDialog() {
        setShowError(false);
        cancelDialog();
    }
    return (
        <div>
            <div className='overlay'>
                <div className="dialog-content">
                    <div>
                        <h2>Add Note</h2>
                    </div>

                    <select className='dropdown' onChange={handleTagChange}>
                        <option value=""> -- Select Tag -- </option>
                        {tags.map((tag) => <option value={tag}>{tag}</option>)}
                    </select>
                    <small className='error-msg' hidden={!showError}>Choose a name for the note!</small>

                    <div>
                        <input className="dialog-input" maxLength='15' type="text" name="name" placeholder='Note name...' onChange={handleChange} />
                    </div>
                    <small className='error-msg' hidden={!showError}>Choose a name for the note!</small>

                    <div>
                        <button className='general-btn' onClick={handleAddNote}>Add</button>
                        <button className='general-btn' onClick={handleCancelDialog}>Cancel</button>
                    </div>

                </div>

            </div>
        </div >
    )
}