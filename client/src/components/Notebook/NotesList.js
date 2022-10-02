import NoteDetails from "./NoteDetails";

function NotesList({ notes, editNote, deleteNote }) {
    if (notes.length === 0 || notes === {}) {
        return (
            <div className='empty-notes'>
                <h2>Add some Notes!</h2>
            </div>
        )
    } else {
        return (
            <div className='notes-list'>
                {notes.map((note) => (
                    <NoteDetails id={note.id} name={note.name} label={note.tag} created={note.created} editNote={editNote} deleteNote={deleteNote} />
                ))}
            </div>
        )
    }

}

export default NotesList;