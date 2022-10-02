/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import "./AddNoteDialog.css";

import { arrayUnion } from 'firebase/firestore'

import { db, auth } from '../../../firebase'
import { useAuthState } from "react-firebase-hooks/auth";

export default function Dialog({ show, closeDialog, updateNotebook }) {

    const [user] = useAuthState(auth);

    const tagRef = db.collection('users').doc(user.email).collection('notebook').doc('tags');

    const [tags, setTags] = useState([])

    const [newTagName, setNewTagName] = useState("");

    const [selectedTag, setSelectedTag] = useState("")


    function updateTags() {
        tagRef.get().then((snapshot) => {
            const tags = snapshot.data().tags
            setTags(tags)
        }).catch((e) => console.log(e))
    }
    useEffect(() => {
        updateTags();
    }, []);


    if (!show) {
        return (<></>)
    }

    function handleChange(e) {
        setNewTagName(e.target.value);
    }

    function handleTagChange(e) {
        setSelectedTag(e.target.value);
    }


    function handleCancelDialog() {
        closeDialog();
    }

    function addTag() {
        if (newTagName !== '')
            tagRef.update({ tags: arrayUnion(newTagName) })

        setNewTagName("")
        updateTags()
    }

    function sort() {
        updateNotebook(selectedTag)
        closeDialog()
    }
    function clearSort() {
        updateNotebook("")
        closeDialog()
    }


    return (
        <div>
            <div className='overlay'>
                <div className="dialog-content">
                    <div>
                        <h2>Tag</h2>
                    </div>

                    <div>
                        <input className="dialog-input" value={newTagName} maxLength='15' type="text" name="name" placeholder='Tag name...' onChange={handleChange} />
                        <button className='general-btn' onClick={addTag}>Add Tag</button>
                    </div>

                    <div>
                        <select className='dropdown' onChange={handleTagChange}>
                            <option value=""> -- Select Tag -- </option>
                            {tags.map((tag) => <option value={tag}>{tag}</option>)}
                        </select>
                        <button className='general-btn' onClick={sort}> Sort </button>
                        <button className='general-btn' onClick={clearSort}>Clear Sort</button>
                    </div>

                    <div>
                        <button className='general-btn' onClick={handleCancelDialog}>Close</button>
                    </div>

                </div>

            </div>
        </div >
    )

}
