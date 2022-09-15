import React from 'react'
import {useLocation} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {AiOutlineFileDone} from 'react-icons/ai'
import Card from 'react-bootstrap/Card';



function TestSubmitted() {
  const location= useLocation();
  const navigate= useNavigate();
  return (
    <div>
        <div style={{position: "relative"}}>

          <center style={{marginTop: "10vh"}}> 
          <AiOutlineFileDone size={100}></AiOutlineFileDone>
            <h3>Congratulations {location.state.user} Your test got submitted !!</h3>
            <h3>Soon you will get your results</h3>
          </center>
        <center>
            <h1 style={{ width: '90vw',margin: '3vw',padding:'1vw',fontStyle:'bold'}}>Summary of your test</h1>
        </center>
         

          {location.state.answers.map(item => (  
             <Card style={{ width: '90vw',margin: '4vw',padding:'1vw',boxShadow: '2px 2px 15px black',borderRadius:'3vw',border: "none",backgroundImage: "linear-gradient(to right, #3f2b96, #4286f4)",color:"white"}}>
              
                <Card.Body>
                    <h3 style={{color: "white", fontWeight:"bolder"}}>Question : {item.Question}</h3>
                    <Card.Text>
                      <h4 style={{color: "white", fontWeight:"bolder"}}>Your Answer : {item.Answer}</h4>
                     <h4 style={{color: "white", fontWeight:"bolder"}}>Correct Answer : {item.Correct}</h4> 
                     {item.Answer==item.Correct&&
                          <h3 style={{color:"greenyellow"}}>CORRECT</h3>
                     }
                     {item.Answer!=item.Correct&&
                          <h3 style={{color:"red"}}>INCORRECT</h3>
                     }
                     
                    </Card.Text>
                </Card.Body>
             </Card> 
        ))}  
                

        </div>
    </div>
  )
}

export default TestSubmitted