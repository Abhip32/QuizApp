
import React from 'react'
import './Home.scss'
import { useNavigate } from "react-router-dom";

function Home() {
    let navigate = useNavigate();
  return (
    <div>
        <div className='HomeBody'>
            <center>
                <br/>
                <h1 style={{fontWeight:'bolder'}}>Fully Automated Exam Proctoring</h1>
                <br/>
                <h4>No More Cheating on Online Tests</h4>

                <br/>

            <div className='HomeButtons'>
            <img style={{margin: "30px",marginTop:"2vh"}} src="https://cdn.autoproctor.co/static/img/static-pages/hero-illustration-2.svg"/>
                    <button className='HomeButton1' onClick={()=>navigate("/Login",{state:{Role: "Student"}})}>
                        TAKE TEST <br/>(For Students)
                    </button>

                    <button className='HomeButton2' onClick={()=>navigate("/Login",{state:{Role: "Teacher"}})}>
                        CREATE TEST <br/>(For Teacher)
                    </button>

            <img style={{margin: "20px",marginTop:"2vh"}} src="https://cdn.autoproctor.co/static/img/static-pages/hero-illustration-1.svg"/>
                    
            </div>
            </center>
        </div>
    </div>
  )
}

export default Home