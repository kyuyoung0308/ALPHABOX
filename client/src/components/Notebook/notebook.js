/* eslint-disable react-hooks/exhaustive-deps */
import Note from './Note';
import NotesList from './NotesList';
import AddNoteDialog from './Dialog/AddNoteDialog';
import TagDialog from './Dialog/TagsDialog';

import { useState, useEffect } from 'react';
import { MdAdd, MdTag } from 'react-icons/md';


import { db, auth } from '../../firebase'
import { useAuthState } from "react-firebase-hooks/auth";



import "./notebook.css"

const Notebook = () => {

    const [notes, setNotes] = useState([])
    const [isViewingNote, setIsViewingNote] = useState(false);
    const [currentNote, setCurrentNote] = useState({});
    const [user] = useAuthState(auth);

    // Initialize Firebase
    const notebookRef = db.collection('users').doc(user.email).collection('notebook');


    function updateNotebook(tag) {
        if (tag === undefined || tag === "") {
            notebookRef.onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    if (doc.id !== 'tags') {
                        items.push(doc.data());
                    }
                });
                setNotes(items);
            });
        } else {
            console.log(tag);
            notebookRef.onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    if (doc.id !== 'tags' && doc.data().tag === tag) {
                        items.push(doc.data());
                    }
                });
                setNotes(items);
            });
        }

    }
    useEffect(() => {
        updateNotebook();
    }, []);


    const [newNoteDialog, setNewNoteDialog] = useState(false);
    const [tagDialog, setTagDialog] = useState(false);



    //Opens the add-notes dialog
    function openNewNoteDialog() {
        setNewNoteDialog(true)
    }
    //Closes the add-notes dialog
    function cancelNewNoteDialog() {
        setNewNoteDialog(false);
    }
    //opens tags dialog
    function openTagDialog() {
        setTagDialog(true)
    }
    //closes tags dialog
    function closeTagDialog() {
        setTagDialog(false)
    }
    //Function called to add a new note
    function addNote(noteName, tag) {

        const newNote = notebookRef.doc();
        newNote.set({
            id: newNote.id,
            name: noteName,
            created: new Date().toLocaleDateString(),
            note: "",
            tag: tag

        })
        setNewNoteDialog(false);
    }

    function deleteNote(id) {
        notebookRef.where("id", "==", id).get()
            .then(querySnapshot => {
                querySnapshot.docs[0].ref.delete();
            })
    }

    function leaveNoteEditor() {
        setIsViewingNote(false);
        setCurrentNote({})
    }

    //function called whenever the edit notes icon is clicked for a note to display
    //page for a specific note
    function editNote(id) {
        let note;
        notebookRef.doc(id).get().then((snapshot) => {
            note = snapshot.data()
            setCurrentNote(note)
            setIsViewingNote(true);
        }).catch((e) => console.log(e))


    }

    if (isViewingNote) {
        return (
            <div className='note-container'>
                <div className='Note'>
                    <Note note={currentNote} leaveNoteEditor={leaveNoteEditor} />
                </div>
            </div>
        );
    } else {
        return (
            <div>

                <div className='notebook-container'>
                    <div className='notebook-header'>
                        <h1>Notebook</h1>
                    </div>
                    <div className='Notebook'>
                        <NotesList notes={notes} editNote={editNote} deleteNote={deleteNote} />
                    </div>
                    <div></div>
                    <div>
                        <MdAdd className='add-btn' onClick={openNewNoteDialog} />
                        <MdTag className='add-btn' onClick={openTagDialog} />
                    </div>

                </div>
                <div>
                    <AddNoteDialog show={newNoteDialog} addNote={addNote} cancelDialog={cancelNewNoteDialog} />
                </div>
                <div>
                    <TagDialog show={tagDialog} closeDialog={closeTagDialog} updateNotebook={updateNotebook} />
                </div>
            </div>

        );
    }
}

export default Notebook;