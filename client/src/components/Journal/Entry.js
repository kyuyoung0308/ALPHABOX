import {useState, useEffect, useRef} from "react"
import "./journal.css";

export default function Entry({addEntry}) {
    const [message, setMessage] = useState('');
    const fieldRef = useRef();
    const handleOnChange = e => setMessage(e.target.value);
    const handleOnSubmit = e => {
      e.preventDefault();
      if(message && message.trim().length > 0) {
        addEntry({
          message,
          date: Date.now()
        });
        setMessage('');
      }
    }
    
    useEffect(() => {
      fieldRef.current.focus();
    }, []);
    
    return (
      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
        <h1 className="message" htmlFor="message">What do you wish to record:</h1>
        <textarea 
          className="form-control"
          value={message} 
          onChange={handleOnChange} 
          type="text" 
          id="message" 
          maxLength={100}
          ref={fieldRef}
          rows="5" cols="50"
          />
        </div>
        <button disabled={message.trim().length === 0} 
          className="journalButton" 
          type="submit">Submit</button>
      </form>
    );
  }
  