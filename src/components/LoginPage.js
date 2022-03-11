import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context"
import './LoginPage.css';

function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const userDetails = {
      username,
      password
    }

    axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, userDetails)
      .then( response => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch(error => {
        const msg = error.response.data.errorMessage;
        console.log("error loggin in...", msg);
        setErrorMessage(msg);
      });
  };

  return (
    <div className="LoginPage p-sm">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      <h1 className="fadeIn first">Login</h1>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <form onSubmit={handleLoginSubmit}>
      <div className="form-group">
        <label>
          <input
            type="text"
            className="fadeIn second"
            required={true}
            name="username"
            value={username}
            onChange={handleUsername}
            placeholder="login"
          />
        </label>
        </div>

        <div className="form-group">
        <label>
          <input
            type="password"
            className="fadeIn third" 
            required={true}
            name="password"
            value={password}
            onChange={handlePassword}
            placeholder="password"
          />
        </label>
        </div>

        <button className="fadeIn fourth" type="submit">Login</button>
      </form>

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>

    </div>
  )
}

export default LoginPage;
