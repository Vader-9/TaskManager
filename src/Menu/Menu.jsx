import { ArrowRight,Search } from 'lucide-react';
import { useState } from 'react';

function Menu(){

    const [trackTasks, setTrackTasks] = useState('') // not yet in use but it will be use to track tasks for the week

    return(
        <div class='w-[300px] border p-5 m-3 rounded-lg'>
           <div class='flex justify-center gap-[200px] p-5'>
            <h3>Menu</h3>
            <ArrowRight />
           </div>
           <div class='flex justify-center '>
            <input type="text"  placeholder='Search'/>
           <button><Search/></button>
           </div>
          <div>
             <h3>Tasks</h3>
           {}
           
          </div>
          <div>
             <h3>Lists</h3>
           {}
           
          </div>
          <div>
             <h3>Piority</h3>
           {}
           
          </div>
        </div>
    )
}

export default Menu;