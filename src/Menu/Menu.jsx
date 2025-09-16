import { Menu, Search, Plus, Folder, FolderPen,CircleX } from 'lucide-react';
import { useState } from 'react';

function MeNu({ numberofTasks, setDisplayPriority, search, setSearch, addTasks }) {

   // for the input
   const [inputs, setInputs] = useState('')
   //

   // this serves as the default folders
   const [folders, setFolders] = useState([
      {
         id: 1,
         name: 'Personal',
         task: [addTasks]
      }
   ])

   //console.log(folder[0].task)

   function addFolder() {
      if (inputs !== "") {
         setFolders(prev => [...prev, { id: Date.now(), name: inputs, task: [addTasks] }])
      }
      setInputs('')
   }

   function removeFolder(id){
      setFolders(folders.map((folder) => folder.id !== id))
   }

   function renameFolder(id){

   }

   return (
      <div class='w-[300px] border p-5 m-3 rounded-lg'>
         <div class='flex justify-between  p-2 rounded-lg mb-5'>
            <h3>Menu</h3>
            <Menu />
         </div>
         <div class='flex justify-between border p-2 rounded-lg mb-5'>
            <input type="text" placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
            <button onClick={() => setSearch(value)}><Search /></button>
         </div>
         <div>
            <h3>Tasks</h3>
            <div class='flex justify-between margin-top-3'>
               <h3>Today</h3>
               <p>{numberofTasks}</p>
            </div>
            <div>
               <h3>Lists</h3>
               <input type="text" value={inputs} onChange={(e) => setInputs(e.target.value)} placeholder='add new list' />
               <button onClick={addFolder}><Plus /></button>
            </div>
            {folders.map((folder) => <div key={folder.id} class='flex'>
               <Folder />
               <p>{folder.name}</p>
               <button><FolderPen /></button>
               <button onClick={()=>removeFolder(folder.id)}><CircleX /></button>
            </div>)}
         </div>
         <div>
            <h3>Piority</h3>
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
      </div>
   )
}

export default MeNu;