"use client";
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars } from "@fortawesome/free-solid-svg-icons";
import './page.css'
import { useState } from 'react';

const Header = ()=>{
    const [mobile,setMobile] = useState(false)
    return(
            <nav className='nav-container'>
                <div>
                <div className=' dvv'>
                    <h3 style={{fontFamily:"Lato"}}>Bloger App</h3>
                    <div className='d-flex flex-row justify-content-start align-items-center dbs1'>
                        <button className='btn-style home'><Link href="/" >Home</Link></button>
                        <button className='btn-style create'><Link href="/create-blog" >Create New Blog</Link></button>
                    </div>
                    <div className='mdm' >
                         <div onClick={()=>setMobile(!mobile)} style={{fontSize:"30px"}}><FontAwesomeIcon icon={faBars} /></div>
                    </div>
                    {mobile && <div className='d-flex flex-column justify-content-start p-4 mdm2'>
                        <button className='btn-style home'><Link href="/" >Home</Link></button>
                        <button className='btn-style create'><Link href="/create-blog" >Create New Blog</Link></button>

                    </div>}

                </div></div>
            </nav>
    )
}

export default Header