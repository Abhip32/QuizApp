import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import {useLocation} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './Navbar.scss';


function NavbarFunction(props) {


    return (
      <Navbar expand="lg" style={{backgroundImage: "linear-gradient(to right, #000428, #004e92)"}}>
      <Container>
        <Navbar.Brand href="/"><h3 className='WebsiteHeading' style={{color: "white"}}>Quiz Platform</h3></Navbar.Brand>
      </Container>
    </Navbar>
    );
}
      
export default NavbarFunction;