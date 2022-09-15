import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useLocation } from 'react-router-dom'
import { useState } from 'react';
import Axios from 'axios';
import Card from 'react-bootstrap/Card';

function CreateTestPreview() {
    const navigate = useNavigate();
    const location = useLocation();
    const [error,setError]=useState(false);

    const [Problems, setProblems] = useState(location.state.Paper)
    const [params,setParams] = useState("");

    const Delete = (name,choice,e) =>{
        e.preventDefault()
        for(let i=0; i<Problems.length; i++) {
            if(Problems[i][0].Problem==name&&Problems[i][0].Choice==choice)
            {
               let arr1=Problems.slice(0,i)
               let arr2=Problems.slice(i+1,)
               const arr3=arr1.concat(arr2)
              
               setProblems(arr3)
        
            }
            else
            {
                continue;
            }
        }
        console.log(Problems);
    }

    const Sort=(params,e)=>{
        console.log(params)
        e.preventDefault();
        Problems.sort(function(a, b){
            if(params=="Problem")
            {
                var firstNameA=a[0].Problem;
                var firstNameB=b[0].Problem;
            }
            if(params=="Marks")
            {
                var firstNameA=a[0].marks;
                var firstNameB=b[0].marks;

            }

                if (firstNameA < firstNameB) 
                    return -1 
                if (firstNameA > firstNameB)
                    return 1
                return 0 //default return value (no sorting)
            })
            setProblems(Problems)
            navigate("/CreateTestPreview",{state:{Paper:Problems,name:location.state.name,email:location.state.email}});
            console.log(Problems)
            
    }

    const Submit =(e) =>{
            if(Problems.length > 0)
            {
                navigate("/TestCreated",{state:{name:location.state.name, email: location.state.email}})
                Axios.post(`https://quizapp149.herokuapp.com/CreateTest`,{
                Paper:Problems,
                name:location.state.name,
                email:location.state.email,
            })
            }
            else
            {
                setError(true)
            }
    }
  return (
    <div>

        <h5 style={{ width: '80vw',margin:"20px",marginLeft:"5.5vw",padding:"0.5vw"}}>Sort by : 
        <select style={{padding: '6px',marginLeft:"10px"}} onChange={e=>Sort(e.target.value,e)}  required>
                <option selected>Selecting sorting method</option>
                <option value="Problem">Sort Alphabetically by Problem</option>
                <option value="Marks">Sort Acending by Marks</option>
            </select></h5>
          {Problems.map(item => (  
            <Card style={{ width: '90vw',margin: '15px',marginLeft:"4.5vw",padding:"1.5vw",border: '3px solid black',boxShadow:'2px 2px 10px black',backgroundImage: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",color:"white",fontWeight:"bolder"}}>
                 <h2>Problem :  {item[0].Problem}</h2>
                 <h4>Type :  {item[0].Choice}</h4>
                 <h4 style={item[0].Choice=="MCQ" ? {display: 'block'}:{display:'none'}}> Option A : {item[0].optionA}</h4>
                 <h4 style={item[0].Choice=="MCQ" ? {display: 'block'}:{display:'none'}}> Option B : {item[0].optionB}</h4>
                 <h4 style={item[0].Choice=="MCQ" ? {display: 'block'}:{display:'none'}}> Option C : {item[0].optionC}</h4>
                 <h4 style={item[0].Choice=="MCQ" ? {display: 'block'}:{display:'none'}}> Option D : {item[0].optionD}</h4>
                 <h4>Answer :  {item[0].answer}</h4>
                 <button style={{margin:"20px",color:"black",fontWeight:"bold",fontSize:"15px",padding:"0.6vw",borderRadius:"2vw",width:"150px",boxShadow:"2px 2px 10px blue",fontWeight:"bolder",border: "none",color:"black",backgroundColor:"white"}} onClick={(e)=>Delete(item[0].Problem,item[0].Choice,e)&&e.preventDefault()}>Delete</button>
                 <br/>

            </Card>
          ))}

            

            <center>
                <button style={{margin:"20px",color:"black",fontWeight:"bold",fontSize:"15px",padding:"0.6vw",borderRadius:"2vw",width:"150px",boxShadow:"2px 2px 10px blue",fontWeight:"bolder",border: "none",color:"white",backgroundColor:"black"}} onClick={(e)=>Submit(e)}>Submit</button>
            </center>  
          <h1 style={error ? {display: 'block'} : {display:'none'}}>You deleted All Questions Redirecting Click to redirect to create test
          </h1>

            
    </div>
  )
}

export default CreateTestPreview