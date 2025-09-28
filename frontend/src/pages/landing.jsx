import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import "../App.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
export default function LandingPage() {

    const router = useNavigate();

  return (
    <div className='landingPageContainer'>
        <nav>
            <div className='navHeader'>
                <h2><i class="fa-solid fa-globe"></i>SyncUP</h2>
            </div>

            <div className='navlist'>
                <p onClick={()=> {
                    router("/123abc")
                }} >Join as Guest</p>

                <p onClick={()=> {
                    router('/auth')
                }} >Register</p>


                <div onClick={()=>{
                    router('/auth')
                }} role='button'>
                    <p>Login</p>
                </div>
                

            </div>
        </nav>

        <div className='landingMainContainer'>
            <div>
                <h1><span style={{color: '#9999ff'}} >Connect</span> with your loved Ones.</h1>
                <p>Cover distance with SyncUP!</p>
                <div role='button' >
                    <Link to={"/auth"}>Get Started!</Link>
                </div>
            </div>
            <div>
                    <img src="/mobile.png" alt="" />
                </div>
        </div>

    </div>
  )
}
