import { Menu, Search, Plus, Folder, FolderPen, Trash2 } from 'lucide-react';
import { useState } from 'react';

function MeNu({ numberofTasks, setDisplayPriority, search, setSearch, addTasks, folders, setFolders, setActiveFolder}) {
  const [inputs, setInputs] = useState('');
  const [folderId, setFolderId] = useState(null);
  const [folderTrigger, setFolderTrigger] = useState(false);
  

  

  function addFolder() {
    if (inputs !== '') {
      if (folderTrigger) {
        setFolders((prev) =>
          prev.map((folder) =>
            folder.id === folderId ? { ...folder, name: inputs } : folder
          )
        );
        setFolderTrigger(false); // reset rename mode
        setFolderId(null);
      } else {
        setFolders((prev) => [
          ...prev,
          { id: Date.now(), name: inputs, task: [addTasks] },
        ]);
      }
      setInputs('');
    }
  }

  function removeFolder(id) {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  }

  function renameFolder(id) {
    const rename = folders.find((folder) => folder.id === id);
    if (rename) {
      setInputs(rename.name);
      setFolderId(id);
      setFolderTrigger(true);
    }
  }

  function displayList(index){
    setActiveFolder(index)
  }
  

  return (
    <div className="w-[300px] border p-5 m-3 rounded-lg">
      <div className="flex justify-between p-2 rounded-lg mb-5">
        <h3>Menu</h3>
        <Menu />
      </div>

      <div className="flex justify-between border p-2 rounded-lg mb-5">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button><Search /></button>
      </div>

      <div>
        <h3>Tasks</h3>
        <div className="flex justify-between margin-top-3">
          <h3>Today</h3>
          <p>{numberofTasks}</p>
        </div>

        <div>
          <h3>Lists</h3>
          <input
            type="text"
            value={inputs}
            onChange={(e) => setInputs(e.target.value)}
            placeholder="add new list"
          />
          <button onClick={addFolder}><Plus /></button>
        </div>

        {folders.map((folder, index) => (
          <div key={folder.id} className="flex gap-2 items-center" onClick={()=>displayList(index)}>
            <Folder />
            <p>{folder.name}</p>
            <button onClick={() => renameFolder(folder.id)}><FolderPen /></button>
            <button onClick={() => removeFolder(folder.id)}><Trash2 /></button>
          </div>
        ))}
      </div>

      <div>
        <h3>Priority</h3>
        <div>
          <button onClick={() => setDisplayPriority('alpha')}>alpha</button>
        </div>
        <div>
          <button onClick={() => setDisplayPriority('beta')}>beta</button>
        </div>
        <div>
          <button onClick={() => setDisplayPriority('omega')}>omega</button>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default MeNu;
