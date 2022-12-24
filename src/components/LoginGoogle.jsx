import GoogleLogin from 'react-google-login';


function LoginGoogle(props) {

    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

    function onSuccess(res) {
        console.log("successfully logged in", res);
    }


    return (
        <div className="mt-2 mb-4 w-100">
            <div className={props.displayState}>
            <GoogleLogin
                className="d-flex justify-content-center text-dark fs-6 rounded-3 w-100"
                clientId={CLIENT_ID}
                buttonText={props.googleText}
                onSuccess={onSuccess}
                cookiePolicy={'single_host_origin'}
            />
            </div>
      </div>
    )

}

export default LoginGoogle;