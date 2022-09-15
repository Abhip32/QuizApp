import React from 'react'
import {useLocation} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {AiOutlineFileDone} from 'react-icons/ai'



function TestCreated() {
  const location= useLocation();
  const navigate= useNavigate();
  return (
    <div>
        <div style={{position: "relative"}}>

          <div style={{margin:"0",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,100%)"}}> 
          <AiOutlineFileDone size={100}></AiOutlineFileDone>
            <h3>Congratulations {location.state.user} Your test got created !!</h3>
            <h3>Now your students can access it through login</h3>
          </div>
                

        </div>
    </div>
  )
}

export default TestCreated