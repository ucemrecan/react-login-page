import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Heading from './components/Heading';
import Paragraph from './components/Paragraph';
import CreateUser from './components/CreateUser';
import LoginGoogle from './components/LoginGoogle';
import Login from './components/Login';
import { useState, useEffect} from 'react';
import {gapi} from "gapi-script";


function App() {

  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

  // States
  const [users, setUsers] = useState([]);
  const [formTitles, setFormTitles] = useState({
    formTitle: "Create an account",
    formSubtitle: "Let's get started with your 30 day free trial." 
  });
  const [displayState, setDisplayState] = useState("");
  const [loginDisplayState, setLoginDisplayState] = useState("d-none");
  const [errorLogin, setErrorLogin] = useState("");


  // Google OAuth
  useEffect( () => {
    function start() {
      gapi.client.init({
        clientId: {CLIENT_ID},
        scope: ""
      })
      
    };

    gapi.load('client:auth2', start);
  })

  // Save data to Local Storage 
  function saveToLocalStorage(items) {
	  localStorage.setItem('users-database', JSON.stringify(items));
  }

  useEffect(() => {
		const users = JSON.parse(
			localStorage.getItem('users-database')
		);

		if (users) {
			setUsers(users);
		}

   }, []);

  // Add New User
  function addNewUser(newUser) {
    const newUsers = [...users, newUser];
    setUsers(newUsers);
    saveToLocalStorage(newUsers);
    setFormTitles({
      formTitle:"Welcome to freshland...",
      formSubtitle:"Your account has been successfully created."
    });
    setDisplayState("d-none");
  }

  // Login 
  function isHaveAccount() {
    setFormTitles({
      formTitle:"Login",
      formSubtitle:""
    });
    setDisplayState("d-none");
    setLoginDisplayState("");
  }

  // Check the user
  function checkTheUser(checkUser) {

    users.forEach( user => {
      if((user.email === checkUser.email) && (user.password === checkUser.password)) {
        return (setFormTitles({
          formTitle:"Welcome to freshland...",
          formSubtitle:"Your account has been successfully created."
        }),
        setErrorLogin(""),
        setLoginDisplayState("d-none")
        )
      } else {
        setErrorLogin("Your email or password is incorrect.")
      }
    })

  }


  // Return
  return (
    <div className="container-fluid">
      <div className="row">

        {/* left side of the page (form) */}
        <div className='col-lg-6 col-md-12 d-flex align-items-center justify-content-center flex-column formDiv'>
          
          <div className="w-50">
            <Heading title={formTitles.formTitle} />
          </div>
          <Paragraph subtitle={formTitles.formSubtitle} />
          <p className="w-50" style={{color: "red"}}>{errorLogin}</p>
          <div className='w-50'>

          <CreateUser 
            addUser={addNewUser}
            displayState={displayState}
            />
          <LoginGoogle 
            displayState={displayState}
            googleText="Sign up with Google"
          />
                    </div>

          <div className="footerP">
            <div className={displayState}>
              <Paragraph subtitle="Already have an account?" />
              <span onClick={isHaveAccount}  className="fs-5 text-decoration-underline text-dark">Login</span>
            </div>
          </div>

          {/* Activated if login is pressed. */}
          <div className='w-50'>
            <Login 
              loginDisplayState={loginDisplayState}
              checkTheUser={checkTheUser} />            
            <LoginGoogle 
              displayState={loginDisplayState}
              googleText="Login with Google"/>
          </div>

        </div>


         {/* right side of the page (main thema) */}
        <div className='col-lg-6 col-md-12 bg'>
          <div className='p-3 w-75 mainHeading'>
            <Heading title="Your diet is a bank account. Good food choices are good investments." />
          </div>
        </div>
      
      </div>
    </div>
  );
}

export default App;
