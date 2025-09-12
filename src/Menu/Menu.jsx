import { Menu,Search } from 'lucide-react';
import { useState } from 'react';

function MeNu({numberofTasks, setDisplayPriority}) {

   // const [trackTasks, setTrackTasks] = useState('') // not yet in use but it will be use to track tasks for the week

    return(
        <div class='w-[300px] border p-5 m-3 rounded-lg'>
           <div class='flex justify-between  p-2 rounded-lg mb-5'>
            <h3>Menu</h3>
            <Menu />
           </div>
           <div class='flex justify-between border p-2 rounded-lg mb-5'>
            <input type="text"  placeholder='Search'/>
           <button><Search/></button>
           </div>
          <div>
             <h3>Tasks</h3>
           <div class='flex justify-between margin-top-3'>
            <h3>Today</h3>
            <p>{numberofTasks}</p>
           </div>
           
          </div>
          <div>
             <h3>Lists</h3>
           {}
           
          </div>
          <div>
             <h3>Piority</h3>
           <div>
              <button onClick={()=>setDisplayPriority('alpha')}>alpha</button>
            
           </div>

           <div>
               <button onClick={()=>setDisplayPriority('beta')}>beta</button>
           {}
           </div>

           <div>
              <button onClick={()=>setDisplayPriority('omega')}>omega</button>
           {}
           </div>
           
          </div>
        </div>
    )
}

export default MeNu;