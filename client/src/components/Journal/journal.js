import JournalHelper from "./JournalHelper"
import Entry from "./Entry"
import EntryList from "./EntryList"

export default function Journal() {
    const [entries, storeEntry, removeEntry] = JournalHelper();
    const handleAddEntry = (entry) => storeEntry(entry);
    const handleDeleteEntry = (index) => removeEntry(index);
    return (
      <div className="container">
        <h1 className="text-center">
        </h1>
        <Entry addEntry={handleAddEntry}/>
        <EntryList list={entries} deleteEntry={handleDeleteEntry}/>
      </div>
    )
}
