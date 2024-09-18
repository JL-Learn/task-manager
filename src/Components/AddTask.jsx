
import { useState } from "react";
import Input from "./Input";

function AddTask({onAddTaskSubmit}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // console.log('title:', title);
  // console.log('description:', description);

  return (
    <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
      <Input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Digite o título da tarefa"  
      />
      <Input 
        type="text" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Digite a descrição da tarefa"  
      />
      <button 
        className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium"
        onClick={() => {
          // Veriicar se o título e a descrição estão preenchidos.
          // trim() remove os espaços em branco iniciais e finais e os caracteres terminadores de linha de uma string.
          if(!title.trim() || !description.trim()) {
            return alert('Preencha o título e a descrição da tarefa');
          }
          onAddTaskSubmit(title, description);
          setTitle("");
          setDescription("");
        }}
      >
        Adicionar
      </button>

    </div>
  );
}

export default AddTask;