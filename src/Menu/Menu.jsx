import { Menu, Search, Plus, Folder, FolderPen, Trash2 } from 'lucide-react';
import { useState } from 'react';

function MeNu({
  numberofTasks,
  setDisplayPriority,
  search,
  setSearch,
  addTasks,
  folders,
  setFolders,
  activeFolder,
  setActiveFolder
}) {
  const [inputs, setInputs] = useState('');
  const [folderId, setFolderId] = useState(null);
  const [folderTrigger, setFolderTrigger] = useState(false);
 console.log(activeFolder)
  function addFolder() {
    if (inputs !== '') {
      if (folderTrigger) {
        setFolders((prev) =>
          prev.map((folder) =>
            folder.id === folderId ? { ...folder, name: inputs } : folder
          )
        );
        setFolderTrigger(false);
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

  function displayList(index) {
    setActiveFolder(index);
  }

  return (
    <div class = 'mt-8 mr-10' >
      {/* Header */}
      <div className="flex justify-between items-center border-b border-pink-500 pb-2 mb-5">
        <h3 className="text-lg font-bold text-pink-400">Menu</h3>
        <Menu className="text-pink-400" />
      </div>


      {/* Search Bar */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-black/30 border border-pink-500 rounded-lg px-3 py-2 
               text-pink-200 placeholder-pink-400 focus:outline-none"
          />
          <button
            className="p-2 rounded-lg bg-pink-500 text-black hover:bg-pink-600 
               transition focus:outline-none"
          >
            <Search />
          </button>
        </div>

      </div>

      {/* Tasks */}
      <div className="mb-5">
        <h3 className="text-pink-400 mb-2 font-semibold">Tasks</h3>
        <div className="flex justify-between items-center bg-black/30 border border-pink-500 
                  rounded-lg px-3 py-2 text-pink-200">
          <h3 className="font-medium">Today</h3>
          <p className="text-pink-300">{numberofTasks}</p>
        </div>
      </div>


      {/* Lists */}
      <div>
        <h3>Lists</h3>
        <div className="flex items-center gap-2 mb-3">
          <input
            type="text"
            value={inputs}
            onChange={(e) => setInputs(e.target.value)}
            placeholder="Add new list"
            className="flex-1 bg-black/30 border border-pink-500 rounded-lg px-3 py-2 
               text-pink-200 placeholder-pink-400 focus:outline-none"
          />
          <button
            onClick={addFolder}
            className="p-2 rounded-lg bg-pink-500 text-black hover:bg-pink-600 
               transition focus:outline-none"
          >
            <Plus />
          </button>
        </div>


        {folders.map((folder, index) => (
          <div
            key={folder.id}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-white/10 transition"
          >
            {/* Left: Folder icon + name */}
            <div className="flex items-center gap-2">
              <Folder className="text-pink-400" />
              <button
                onClick={() => displayList(index)}
                className="text-left text-sm text-pink-200 hover:text-pink-400 transition"
              >
                {folder.name}
              </button>
            </div>

            {/* Right: Action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={  activeFolder === 0 ? undefined :() =>  renameFolder(folder.id)}
    
                className="hover:text-yellow-400 transition"
              >
                <FolderPen />
              </button>
              <button
                onClick={() => activeFolder === 0 ? undefined :
                  removeFolder(folder.id)
                }
                className="hover:text-red-400 transition"
              >
                <Trash2 />
              </button>
            </div>
          </div>
        ))}

      </div>

      {/* Priority */}
      <div className="mb-5">
  <h3 className="text-pink-400 mb-2 font-semibold">Priority</h3>
  <div className="flex flex-col gap-2">
    <button
      onClick={ () => setDisplayPriority('alpha')}
      className="px-3 py-1 rounded-lg border border-pink-500 bg-black/40 text-pink-300 hover:bg-pink-500/20 transition"
    >
      Alpha
    </button>
    <button
      onClick={() => setDisplayPriority('beta')}
      className="px-3 py-1 rounded-lg border border-pink-500 bg-black/40 text-pink-300 hover:bg-pink-500/20 transition"
    >
      Beta
    </button>
    <button
      onClick={() => setDisplayPriority('omega')}
      className="px-3 py-1 rounded-lg border border-pink-500 bg-black/40 text-pink-300 hover:bg-pink-500/20 transition"
    >
      Omega
    </button>
  </div>
</div>

    </div>
  );
}

export default MeNu;


