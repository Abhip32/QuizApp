import { useEffect,useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import AvailableTests from "./Components/AvailableTests";
import Login from "./Components/Login";
import TestPage from "./Components/TestPage";
import CreateTests from "./Components/CreateTests";
import TestSubmitted from "./Components/TestSubmitted";
import CreateTestPreview from "./Components/CreateTestPreview";
import TestCreated from "./Components/TestCreated";


function App() {
  return (
    <div className="App">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap" rel="stylesheet"></link>
    <Router>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/AvailableTests" element={<AvailableTests/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/TestPage" element={<TestPage/>} />
          <Route path="/CreateTests" element={<CreateTests/>} />
          <Route path="/CreateTestPreview" element={<CreateTestPreview/>} />
          <Route path="/TestSubmitted" element={<TestSubmitted/>} />
          <Route path="/TestCreated" element={<TestCreated/>} />
     
      </Routes>
    </Router>
  </div>
  );
}

export default App;
