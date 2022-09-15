import React from 'react'
import {useState} from 'react'
import Axios from 'axios'
import {useNavigate,useLocation} from 'react-router-dom';
import Card from 'react-bootstrap/Card';

function CreateTests() {
  const [Question, setQuestion] = useState([]);
  const [que,setque]=useState([]);
  const [name,setName]=useState("");
  const [Problem, setProblem] = useState("");
  const [Choice, setChoice] = useState("");
  const [optionA,setOptionA] = useState("");
  const [optionB,setOptionB] = useState("");
  const [optionC,setOptionC] = useState("");
  const [optionD,setOptionD] = useState("");
  const [answer,setAnswer] = useState("");
  const [marks,setMarks] = useState("");
  const [error,setError] = useState(false);
  const [edit,setEdit]=useState(true);
  var [i,setI]= useState(1);
  const navigate=useNavigate();
  const location=useLocation();

  const CreateTest=(e)=>{
    navigate("/CreateTestPreview",{state:{Paper:Question,name:location.state.name,email:location.state.email}});
    
  }


  const AddMCQQuestion=(e)=>
  {
    e.preventDefault()
    if(Problem.length > 0&&Choice.length > 0&&optionA.length > 0&&optionB.length > 0&&optionC.length > 0&&optionD.length > 0&&answer.length > 0)
    {
      que.push({"Problem":Problem,"Choice":Choice,"optionA":optionA,"optionB":optionB,"optionC":optionC,"optionD":optionD,"answer":answer,"name":name,"marks":marks});
      Question.push(que);
      setError(false);
      setI(i++);
      console.log(Question)
      setque([])
      document.getElementById("testname").ariaDisabled=true;
    }
    else{
        setError(true);
        document.getElementById("testname").ariaDisabled=false;
    }
  }


  const AddShortQuestion=(e)=>
  {
    e.preventDefault()
    if(Problem.length > 0&&answer.length > 0)
    {
      que.push({"Problem":Problem,"Choice":Choice,"answer":answer,"name":name,"marks":marks});
      Question.push(que);
      setError(false);
      setI(i++);
      console.log(Question)
      setque([])
      document.getElementById("testname").disabled=true;
    }
    else{
      setError(true);
      document.getElementById("testname").disabled=false;
  }
  }
  return (
    <div>
      <center style={{backgroundImage: `url("https://wallpaperaccess.com/full/6584451.jpg")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover',padding:'20px'}}>
       <br/>
       <img src={location.state.img}  style={{width: "100px", height: "100px",borderRadius: "100px",boxShadow: "2px 2px 20px white"}}/> 
        <br/>
        <br/>
        <h1 style={{color: "black", fontWeight:"bolder"}}>Welcome {location.state.name}</h1>
       </center>
    
       <form>
    
    <Card style={{ width: '90vw',margin: '15px',marginLeft:"4.5vw",padding:"1.5vw",border: '3px solid black',boxShadow:'2px 2px 10px black',backgroundImage: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",color:"white",fontWeight:"bolder"}}> 
      <h3>Enter Test Name : </h3>
      <input type="text" id="testname" placeholder='Test Name' onChange={e=>setName(e.target.value)}  required/>

    </Card>

    <Card style={{ width: '90vw',margin: '15px',marginLeft:"4.5vw",padding:"1.5vw",border: '3px solid black',boxShadow:'2px 2px 10px black',backgroundImage: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",color:"white",fontWeight:"bolder"}}> 
    <h5 style={{float:"left"}}>Q.{Question.length+1} : 
      <input type="text" style={{margin:"1vw"}} placeholder='Question' onChange={e=>setProblem(e.target.value)}  required/>
    </h5>

    <h5 style={{float:"left"}}>Type :
    <select  style={{margin:"1vw"}} onChange={e=>setChoice(e.target.value)} required>
      <option selected>Select type of question</option>
      <option value="MCQ">MCQ</option>
      <option value="Short Answer">Short Answer</option>
    </select>
    </h5>


    

    {Choice=="MCQ"&&<div>
      <h5>Enter Options :</h5>
         <h6>Option A : <input type="text" onChange={e=>setOptionA(e.target.value)} placeholder='OptionA'/></h6> 
         <h6>Option B : <input type="text" onChange={e=>setOptionB(e.target.value)}placeholder='OptionB'/></h6> 
         <h6>Option C : <input type="text" onChange={e=>setOptionC(e.target.value)}placeholder='OptionC'/></h6> 
         <h6>Option D : <input type="text" onChange={e=>setOptionD(e.target.value)}placeholder='OptionD'/></h6> 

      <h5>Select Correct Answer : <select onChange={e=>setAnswer(e.target.value)} required>
          <option selected>Select Correct Answer</option>
            <option value={optionA}>{optionA}</option>
            <option value={optionB}>{optionB}</option>
            <option value={optionC}>{optionC}</option>
            <option value={optionD}>{optionD}</option>
        </select></h5>
      
      <h5>Enter Marks :  <input type="text" onChange={e=>setMarks(e.target.value)}placeholder='Enter Marks'/></h5>
    
          <button style={{margin:"20px",color:"black",fontWeight:"bold",fontSize:"10px",padding:"1vw",borderRadius:"2vw",width:"10vw",boxShadow:"2px 2px 10px blue",fontWeight:"bolder",border: "none",color:"black",backgroundColor:"white"}} type='submit' onClick={(e)=>{AddMCQQuestion(e)}}>Add Question </button>
          <button style={{margin:"20px",color:"black",fontWeight:"bold",fontSize:"10px",padding:"1vw",borderRadius:"2vw",width:"10vw",boxShadow:"2px 2px 10px blue",fontWeight:"bolder",border: "none",color:"black",backgroundColor:"white"}} type='submit' onClick={(e)=> CreateTest(e)}>Submit </button>
      </div>}

      {Choice=="Short Answer"&&<div>
        <h5>Answer : </h5>
        <textarea type="text" onChange={e=>setAnswer(e.target.value)} rows="4" cols="50"/>
        <br/>
        <h4>Marks : <input type="text" onChange={e=>setMarks(e.target.value)}placeholder='Marks' cols="50"/></h4>
        
        <button style={{margin:"20px",color:"black",fontWeight:"bold",fontSize:"10px",padding:"1vw",borderRadius:"2vw",width:"150px",boxShadow:"2px 2px 10px blue",fontWeight:"bolder",border: "none",color:"black",backgroundColor:"white"}} type='submit' onClick={(e)=>{AddShortQuestion(e)}}>Add Question </button>
        <button style={{margin:"20px",color:"black",fontWeight:"bold",fontSize:"10px",padding:"1vw",borderRadius:"2vw",width:"150px",boxShadow:"2px 2px 10px blue",fontWeight:"bolder",border: "none",color:"black",backgroundColor:"white"}}  type='submit' onClick={(e)=> CreateTest(e)}>Submit </button>
        
      </div>}
      <h4 style={error == true ? {display: 'block',color:"red"}:{display: 'none'}}>
        Please Check All fields
    </h4>
  

    </Card>
  </form>
    </div>
  )
}

export default CreateTests