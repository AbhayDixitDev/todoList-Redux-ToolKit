import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, Delete, taskComplete, taskUnComplete, editDataSave } from "./todoSlice"; // Import Delete action

function App() {
  const [task, setTask] = useState("");
  const [editBtn, setEditbtn] = useState(true);
  const [editId, setEditId] = useState("");
  const dispatch = useDispatch();
  let sn = 0;

  const taskComp = (id) => {
    dispatch(taskComplete(id));
  };
  const taskUncomp = (id) => {
    dispatch(taskUnComplete(id));
  };

  const dataEdit = (id, task) => {
    setTask(task);
    setEditbtn(false);
    setEditId(id);
  };

  const editSave = () => {
    dispatch(editDataSave({ id: editId, task: task }));
    setEditbtn(true);
    setTask("");
  };

  const myTask = useSelector((state) => state.todo.task);

  const ans = myTask.map((key) => {
    sn++;
    return (
      <tr key={key.id} className="border-b border-gray-700">
        <td className="px-4 py-2 text-white">{sn}</td>
        <td className={`px-4 py-2 ${!key.status ? "text-green-400 font-apple" : "text-red-400 line-through font-apple"}`}>
          <span className="flex items-center justify-center ">
            <span className="font-apple">{key.task}</span>
            {!key.status ? (
              <img className="ml-2" src="https://png.pngtree.com/png-vector/20221215/ourmid/pngtree-green-check-mark-png-image_6525691.png" width="20px" alt="done" />
            ) : (
              <img className="ml-2" src="https://wallpapers.com/images/featured/wrong-cross-png-udus7ti1t6w4cq0d.jpg" width="16px" alt="not done" />
            )}
          </span>
        </td>
        <td className="px-4 py-2">
          <button className="bg-red-600 border-2 border-gray-700 text-white px-4 py-2 rounded" onClick={() => { dispatch(Delete(key.id)); }}>
            Delete
          </button>
          <button className="bg-blue-700 border-2 border-gray-700 text-white px-4 py-2 rounded ml-2" onClick={() => { dataEdit(key.id, key.task); }}>
            Edit
          </button>
        </td>
        <td className="px-4 py-2">
          <button className={`text-white px-4 py-2 rounded border-2 ${key.status ? "bg-red-600" : "bg-green-600"}`} onClick={() => { key.status ? taskUncomp(key.id) : taskComp(key.id); }}>
            {key.status ? "Uncomplete" : "Complete"}
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h1 className="bg-gray-900 text-white p-4 text-center">Todo List</h1>
      <h1 className="mt-4 ml-20 text-white">Enter your task:</h1>
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)} className="border border-gray-700 p-2 mt-2 ml-20 w-1/2 bg-gray-800 text-white" />
      {editBtn ? (
        <button className="bg-gray-700 text-white p-2 mt-2 border-2 border-gray-700" onClick={() => { dispatch(addTask({ id: Date.now(), task: task, status: false })); }}>
          Add
        </button>
      ) : (
        <button className="bg-gray-700 text-white p-2 mt-2 border-2 border-gray-700" onClick={editSave}>
          Edit Save
        </button>
      )}
      <hr className="my-4 border-gray-700" />
      <table className="ml-20 mr-20 w-3/4 border-2 border-gray-700 text-center">
        <thead>
          <tr className="bg-gray-800">
            <th className="px-4 py-2 text-white">SR</th>
            <th className="px-4 py-2 text-white">Task Name</th>
            <th className="px-4 py-2 text-white">Actions</th>
            <th className="px-4 py-2 text-white">Task Status</th>
          </tr>
        </thead>
        <tbody>
          {ans}
        </tbody>
      </table>
    </>
  );
}

export default App;
