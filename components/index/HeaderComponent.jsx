"use client"
import { useState } from 'react';
import { MdMenu } from "react-icons/md"
import { Logo } from '../Logo';

function HeaderComponent() {

  const [viewComponent, setView] = useState(false)

  // function toggleView() {
  //   setView(!viewComponent)
  // }

  return (
    <div className='flex p-4 justify-between items-center'>
      <Logo />
      <MdMenu size={32}/>
    </div>

  );
}

export default HeaderComponent;