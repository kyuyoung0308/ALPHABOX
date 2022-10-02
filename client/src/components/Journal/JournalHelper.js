import {useState, useEffect} from "react"
import {getJournalEntries} from "../../firebase"
import {addJournalEntry, deleteJournalEntry} from '../../firebase'

export default function JournalHelper() {
    const [entries, setEntries] = useState([]);
    
    useEffect(() => {
      const query = getJournalEntries();
      query.then((res) => {
        let e = []
        res.forEach((i) => {
          e.push({message: i.message, date: i.date, id: i.id})
        })
        setEntries(e)
      });
    }, []);
    
    const storeEntry = (entry) => {
      addJournalEntry(entry.message, entry.date).then((res) => {
        entry.id = res.id
        const newEntries = [entry, ...entries];
        setEntries(newEntries);
      })
    }
    
    const removeEntry = (index) => {
      let entry = entries[index]
      deleteJournalEntry(entry.id)
      const newEntries = [...entries.slice(0, index), ...entries.slice(index+1)];
      setEntries(newEntries);
    }
    
    return [entries, storeEntry, removeEntry]
}