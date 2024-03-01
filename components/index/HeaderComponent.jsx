import { useState } from 'react';
import {MdMenu} from "react-icons/md"
import { Logo } from '../Logo';

function HeaderComponent() {

    const [viewComponent, setView] = useState(false)

    function toggleView(){
        setView(!viewComponent)
    }

  return (
    <div className='flex p-5 justify-between'>
        <div className='flex w-32'>
        <Logo />
        </div>
        <div className='flex'>
          <MdMenu className='flex size-7'/>   
        </div>
    </div>
    
  );
}

export default HeaderComponent;