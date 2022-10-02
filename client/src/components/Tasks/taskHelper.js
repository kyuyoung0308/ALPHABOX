import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTask } from "../../firebase";
//import { useAuthState } from "react-firebase-hooks/auth";
import "./taskHelper.css";

const TaskHelper = ({ arr }) => {
  //const [user] = useAuthState(auth);

  return (
    <List className="todo__list">
      <ListItem>
        <ListItemAvatar />
        <ListItemText
          primary={arr.item.todo}
        />
      </ListItem>
      <DeleteIcon
        fontSize="large"
        style={{ opacity: 1, padding: 10}}
        onClick={() => {
          deleteTask(arr.id);
        }}
      />
    </List>
  );
};

export default TaskHelper;
