import React from 'react'
import { useState,useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function AvailableTests() {
    const [QuestionsData, setQuestionsData] = useState([]);
    const [userImg,setuserImg]=useState("");
    const [Question,setQuestion]= useState(false);
    const location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
      Axios.post(`http://localhost:8000/getQuestions`,{
    }).then((res) => {
        setQuestionsData(res.data);

        if(QuestionsData.length()==0)
        {
           setQuestion(true)
        }
       
    })
    }, []);


    const EnterTest=(Name,ID,NoQue)=>{
      navigate("/TestPage",{state:{name: Name,user:location.state.name,email: location.state.email}})
      window.location.reload();
    }
  return (
    
    <div>
       <center style={{backgroundImage: `url("https://livewirecbe.com/assets/images/breadcrumbs/2.jpg")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover',padding:'20px'}}>
       <br/>
       <img src={location.state.img}  style={{width: "100px", height: "100px",borderRadius: "100px",boxShadow: "2px 2px 20px white"}}/> 
        <br/>
        <br/>
        <h1 style={{color: "white", fontWeight:"bolder"}}>Welcome {location.state.name}</h1>
       </center>
        <br/>
      
        <h3 style={{marginLeft:"4vw"}}>Which Quiz you are going to solve today ?</h3>

        <Card style={Question ? {display:"block"}:{display:'none'}}>
        <h3 style={{marginLeft:"4vw"}}>No Quiz Available today  ?</h3>
        <h3 style={{marginLeft:"4vw"}}>Sorry</h3>
        </Card>
        
        {QuestionsData.map(item => (  
             <Card style={{ width: '90vw',margin: '4vw',padding:'1vw',boxShadow: '2px 2px 15px black',borderRadius:'3vw',border: "none",backgroundImage: "linear-gradient(to right, #3f2b96, #4286f4)",color:"white"}}>
              
                <Card.Body>
                    <h3 style={{color: "white", fontWeight:"bolder"}}>Quiz Name : {item.Name}</h3>
                    <Card.Text>
                      <h4 style={{color: "white", fontWeight:"bolder"}}>QuizID : {item._id}</h4>
                     <h4 style={{color: "white", fontWeight:"bolder"}}>Created by : {item.CreatedBy}</h4> 
                    </Card.Text>
                    <Button variant="primary" style={{backgroundColor:"black",borderRadius:"20px",width:"10vw",boxShadow:"2px 2px 10px white",fontWeight:"bolder",border: "none"}} onClick={()=>{EnterTest(item.Name)}}>Enter Test</Button>
                </Card.Body>
             </Card> 
        ))}  
    </div>
  )
  
}

export default AvailableTests;