import { ChevronRightIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";


function Tasks({tasks, onTaskClick, onDeleteTaskClick}) {
  const navigate = useNavigate();

  //console.log(props);

  function onSeeDetailsClick(task) {

    // Use URLSearchParams() para usar '+' no lugar de '%20' do espaço dos valores das query params.
    const query = new URLSearchParams();
    
    // Sem usar o URLSearchParams()
    //navigate(`/task?title=${task.title}&description=${task.description}`);

    query.set('title', task.title);
    query.set('description', task.description);
    navigate(`/task?${query.toString()}`)
  }

  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {tasks.map((task) => (
        <li key={task.id} className="flex gap-2">
          <button 
            className={`bg-slate-400 text-left text-white p-2 rounded-md w-full ${task.isCompleted && 'line-through'}`} 
            onClick={() => onTaskClick(task.id)}
          >
            {task.title}
          </button>
          <Button 
            onClick={() => onSeeDetailsClick(task)}
          >
            <ChevronRightIcon />
          </Button>
          <Button 
            onClick={() => onDeleteTaskClick(task.id)} 
          >
            <TrashIcon />
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default Tasks;