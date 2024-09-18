import { useEffect, useState } from "react";
import Tasks from "./Components/Tasks";
import AddTask from "./Components/AddTask";
import { v4 } from 'uuid';
import Title from "./Components/Title";

function App() {

  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);

  useEffect(
    () => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]
  );

  useEffect(
    () => {
      const fetchTasks = async () => {
        // CHAMA A API
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/todos?_limit=10',
          {
            method: 'GET',
          }
        );
        // PEGA OS DADOS QUE A API RETORNA
        const data = await response.json();
        console.log(data);

        // ARMAZENA/PERSISTE ESSAS DADOS NO STATE
        setTasks(data);
      }
      // CHAME A FUNÇÃO fetchTasks() PARA CHAMAR A API
      //fetchTasks();
    }, []
  );

  

  function onTaskClick(taskId) {
    const newTasks = tasks.map(
      task => {
        // PRECISO ATUALIZAR ESSA TAREFA
        if(task.id === taskId) {
          return {...task, isCompleted: !task.isCompleted}
        }
        // NÃO PRECISO ATUALIZAR ESSA TAREFA
        return task;
      });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title: title,
      description: description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-8">
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks tasks={tasks} onTaskClick={onTaskClick} onDeleteTaskClick={onDeleteTaskClick} />
      </div>
    </div>
  );
};

export default App;
