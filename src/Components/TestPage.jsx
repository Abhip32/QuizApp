import React from 'react'
import { useState,useEffect } from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Axios from 'axios';
import { getRoles } from '@testing-library/react';
import Spinner from 'react-bootstrap/Spinner';


function TestPage() {
  const location = useLocation();
  const navigate= useNavigate();
  const [QuestionsData, setQuestionsData] = useState([]);
  const [answer,setAnswer]=useState([]);
  var [iterator,setIterator] = useState(0);
  var [question,setQuestion] = useState("");

useEffect(() => {
  Axios.post(`https://quizapp149.herokuapp.com/getTestQuestions`,{
        Name:location.state.name,
    }).then((res) => {
        
        console.log(res.data[0].Question)
        setQuestionsData(res.data[0].Question)

    })
}, []);

const addAns= (sol) =>
{
  setQuestion(`${iterator}`)
  if(!answer.includes(sol))
  {
    answer.push({Question:sol[0],Answer:sol[1],Correct:sol[2]})
  }

  if(!answer.includes(sol))
  {
    for(let i=0;i<answer.length;i++)
    {
      if(answer[i].Question == sol[0])
      {
        answer[i].Answer = sol[1];
      }
    }
  }

  for( let i=0;i<answer.length;i++)
  {
    if(answer[i].Question == answer[i+1].Question && answer[i].Answer == answer[i+1].Answer)
    {
      answer.splice(i+1, 1);
    }
  }
  
  console.log(answer);
}

const SubmitTest =(e) =>{
  
      Axios.post(`https://quizapp149.herokuapp.com/SubmitTest`,{
      answers:answer,
      user:location.state.user,
      email:location.state.email,
  })

  navigate("/TestSubmitted",{state:{name:location.state.name,user:location.state.user,email:location.state.email,answers:answer}});
  
 
}






  return (
    <div>
      <br/>
      <div style={{padding:"1vw",backgroundColor:"green",margin:"1vw",backgroundImage: `url("https://t4.ftcdn.net/jpg/04/67/96/13/360_F_467961350_LlpfNFYVGUwkofWQzB4uptbSxl12rWps.jpg")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <br/>
        <h3 style={{color: "white",marginLeft:"100px", fontWeight:"bolder"}}>Quiz Name : {location.state.name}</h3>
        <br/>
      </div>
      <br/>

      {QuestionsData.length === 0&&
          <center>
            <Spinner animation="border" role="status">
                 <span className="visually-hidden">Loading...</span>
            </Spinner>

          </center>
        }
          

      {QuestionsData.map(item => (  
             <Card style={{ width: '90vw',margin: '15px',marginLeft:"4.5vw",padding:"1.5vw",border: '3px solid black',boxShadow:'2px 2px 10px black',backgroundImage: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",color:"white",fontWeight:"bolder"}}>
              <div>
                <h5 style={{float:"right"}}>Marks : {item[0].marks}</h5>
                <h2 style={item[0].Choice=="MCQ"||item[0].Choice=="Short Answer" ? {display: 'block'}:{display:'block'}}>Question : {item[0].Problem} </h2> 
              </div>
             
              <h4 style={item[0].Choice=="MCQ" ? {display: 'block'}:{display:'none'}}><input type="radio" name={`$i`} value={item[0].optionA} onChange={e=>addAns([item[0].Problem,item[0].optionA,item[0].answer])}/> Option A : {item[0].optionA}</h4>
              <h4 style={item[0].Choice=="MCQ" ? {display: 'block'}:{display:'none'}}><input type="radio" name={`$i`} value={item[0].optionB} onChange={e=>addAns([item[0].Problem,item[0].optionB,item[0].answer])}/> Option B : {item[0].optionB}</h4>
              <h4 style={item[0].Choice=="MCQ" ? {display: 'block'}:{display:'none'}}><input type="radio" name={`$i`} value={item[0].optionC} onChange={e=>addAns([item[0].Problem,item[0].optionC,item[0].answer])}/> Option C : {item[0].optionC}</h4>
              <h4 style={item[0].Choice=="MCQ" ? {display: 'block'}:{display:'none'}}><input type="radio" name={`$i`} value={item[0].optionD} onChange={e=>addAns([item[0].Problem,item[0].optionD,item[0].answer])}/> Option D : {item[0].optionD}</h4>

              <h4 style={item[0].Choice=="Short Answer" ? {display: 'block'}:{display:'none'}}>Answer : 
              <textarea name={`$i`} onChange={e=>addAns([item[0].Problem,e.target.value,item[0].answer])}
               style={item[0].Choice=="Short Answer" ? {display: 'block',width:"30vw",height:"15vh",margin:"1vh"}:{display:'none',width:"30vw"}}/>
              </h4> 
             </Card> 
        ))}  

        <center>
          {QuestionsData.length !=0 &&
              <button style={{margin:"40px",color:"black",fontWeight:"bold",fontSize:"20px",padding:"1vw",borderRadius:"2vw",width:"150px",boxShadow:"2px 2px 10px blue",fontWeight:"bolder",border: "none",color:"white",backgroundColor:"black"}} onClick={()=>{SubmitTest()}}>Submit</button>
          }
        </center>
        
        

    </div>
  )
}

export default TestPage