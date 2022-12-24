import { useState } from "react";

function Login(props) {

    // States
    const [checkUser, setCheckUser] = useState({
        email: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState("");


    // Handle Change
    function loginHandleChange(event) {
        const { name, value } = event.target;
    
        setCheckUser( prevUser => {
          return {
            ...prevUser,
            [name]: value
          };
        });
    }

    // Check form validation
    function isFormValid() {
        if (!checkUser.email) {
            setErrorMessage('Please enter your email.');
            return false;
        } else if (checkUser.email) {
            if (checkUser.email.indexOf("@") !== -1) {
                setErrorMessage('');
                return true;
            } else {
                setErrorMessage("Email address must contain the '@' character");
            }
        } else if (!checkUser.password) {
            setErrorMessage('Please enter your password.');
            return false;
        } else {
            setErrorMessage('');
            return true;
        }
          }

    // Login Submit User
    function loginSubmitUser(event) {
        if(isFormValid()) {
            props.checkTheUser(checkUser);
            setCheckUser({
                email: "",
                password: ""
            });
        }
        event.preventDefault();
    }
    

    // Return
    return (
        <div className="w-100">
            <form className="mt-4">
                <div className={props.loginDisplayState}>
                    <p style={{color: "red"}}>{errorMessage}</p>
                    <input 
                        onChange={loginHandleChange}
                        className="form-control border-top-0 border-start-0 border-end-0 rounded-0 pb-2 mb-2 opacity-75" 
                        name="email"     
                        type="email"    
                        placeholder="Email"
                        value={checkUser.email}
                        />
                    <input 
                        onChange={loginHandleChange}
                        className="form-control border-top-0 border-start-0 border-end-0 rounded-0 pb-2 mb-2 opacity-75" 
                        name="password"  
                        type="password" 
                        placeholder="Password"
                        value={checkUser.password}
                        />
                    <button
                        onClick={loginSubmitUser}
                        className="btn btn-lg w-100 btn-dark mt-4">
                            Login
                        </button>
                </div>
            </form>
        </div>

    )
}

export default Login;