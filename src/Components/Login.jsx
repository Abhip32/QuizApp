import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useLocation, useNavigate } from "react-router-dom";

function App() {
    let navigate = useNavigate();
    let location=useLocation();
    const [ profile, setProfile ] = useState([]);
    const clientId = '386932037035-k8v833noqjk7m4auae0t83vnkrqvvg3t.apps.googleusercontent.com';
    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });

    const onSuccess = (res) => {
        setProfile(res.profileObj);
        if(location.state.Role=="Student")
        {
            navigate("/AvailableTests",{state:{name: res.profileObj.name,email: res.profileObj.email,img: res.profileObj.imageUrl}})
        }

        if(location.state.Role=="Teacher")
        {
            navigate("/CreateTests",{state:{name: res.profileObj.name,email: res.profileObj.email,img: res.profileObj.imageUrl}})
        }
        
        console.log(res.profileObj);
    };

    const onFailure = (err) => {
        console.log('failed', err);
    };

    const logOut = () => {
        setProfile(null);
    };

    return (
        <div>
             <div className="LoginPage" style={{marginTop: "130px",gap: "20px"}}>
                <center>
                <h3>{location.state.Role}</h3>
                <img src="https://cdn.autoproctor.co/static/img/icons/signin-desktop.svg" style={{width: "50vh"}}/>
                <br/>
                <br/>
                    <GoogleLogin 
                        style={{marginLeft: "auto", marginRight: "auto"}}
                        clientId={clientId}
                        buttonText="Sign in with Google"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                    />

                </center>
             </div>    
        </div>
    );
}
export default App;