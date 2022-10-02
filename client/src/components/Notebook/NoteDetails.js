import { MdEditNote, MdDeleteForever } from 'react-icons/md'

function NoteDetails({ id, name, label, created, editNote, deleteNote }) {
    return (
        <div className='note'>
            <span className='note-name'>{name}</span>
            <small className='note-label'>{label}</small>
            <div className='note-options'>
                <MdEditNote className='note-btn' onClick={() => editNote(id)} size='1.3em' />
                <MdDeleteForever className='note-btn' onClick={() => deleteNote(id)} size='1.3em' />
            </div>
            
        </div>
    )
}

export default NoteDetails;