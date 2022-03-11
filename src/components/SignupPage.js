import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context"
import './LoginPage.css';

function SignupPage(props) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { storeToken, authenticateUser } = useContext(AuthContext)
  const navigate = useNavigate();

  const handle = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const userDetails = {
      username,
      email,
      password
    }

    axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, userDetails)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch(error => {
        const msg = error.response.data.errorMessage;
        console.log("error creating new user...", msg);
        setErrorMessage(msg);
      });
  };

  return (
    <div className="SignupPage">
      <br></br>
      <div className="container">
        <div className="col-lg-1"></div>
        <div className="col-lg-2 mx-auto"></div>
        <h1 className="fadeIn first">Sign Up</h1>

        {errorMessage && <p className="error">{errorMessage}</p>}

        <form onSubmit={handleSignupSubmit}>
          <div className="form-group">
            <label htmlFor="username">
              <input 
                type="text"
                required={true}
                name="username"
                value={username}
                onChange={handle}
                className="fadeIn second inputLogin"
                placeholder="Username"
              />
             </label>
          </div>

        <div className="form-group">
          <label htmlFor="email">
            <input 
              type="email"
              required={true}
              name="email"
              value={email}
              className="fadeIn third inputLogin"
              onChange={handleEmail}
              placeholder="email"
            />
          </label>
        </div>

          <div className="form-group">
            <label htmlFor="password">
              <input 
                type="password"
                required={true}
                name="password"
                value={password}
                onChange={handlePassword}
                className="fadeIn fourth inputLogin"
                placeholder="password"
              />
            </label>
          </div>

          <button className="fadeIn fifth buttonContent" type="submit">Register</button>
        </form>

        <p>Already have account?</p>
        <Link to={"/login"}> Login</Link>
      </div>
    </div>
  )
}

export default SignupPage;
