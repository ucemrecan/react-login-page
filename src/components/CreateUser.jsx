import { useState } from "react";

function CreateUser(props) {

    // States
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });
    
    const [errorMessage, setErrorMessage] = useState("");



    // Handle Change
    function handleChange(event) {
        const { name, value } = event.target;
    
        setUser( prevUser => {
          return {
            ...prevUser,
            [name]: value
          };
        });
      }

    // Check form validation
    function isFormValid() {
        if (!user.name) {
            setErrorMessage('Please enter your name.');
            return false;
        } else if (!user.email) {
            setErrorMessage('Please enter your email.');
            return false;
        } else if (user.email) {
            if (user.email.indexOf("@") !== -1) {
                setErrorMessage('');
                return true;
            } else {
                setErrorMessage("Email address must contain the '@' character");
            }
        } else if (!user.password) {
            setErrorMessage('Please enter your password.');
            return false;
        } else {
            setErrorMessage('');
            return true;
        }
      }


    // Submit User
    function submitUser(event) {
        if(isFormValid()) {
            props.addUser(user);
            setUser({
                name: "",
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
                <div className={props.displayState}>
                    <p style={{color: "red"}}>{errorMessage}</p>
                    <input 
                        onChange={handleChange}
                        className="form-control border-top-0 border-start-0 border-end-0 rounded-0 pb-2 mb-2 opacity-75" 
                        name="name"      
                        type="text"     
                        placeholder="Name"
                        value={user.name}
                        />
                    <input 
                        onChange={handleChange}
                        className="form-control border-top-0 border-start-0 border-end-0 rounded-0 pb-2 mb-2 opacity-75" 
                        name="email"     
                        type="email"    
                        placeholder="Email"
                        value={user.email}
                        />
                    <input 
                        onChange={handleChange}
                        className="form-control border-top-0 border-start-0 border-end-0 rounded-0 pb-2 mb-2 opacity-75" 
                        name="password"  
                        type="password" 
                        placeholder="Password"
                        value={user.password}
                        />
                    <button
                        onClick={submitUser}
                        className="btn btn-lg w-100 btn-dark mt-4">
                            Create Account
                        </button>
                </div>
            </form>
        </div>
    )
}

export default CreateUser;