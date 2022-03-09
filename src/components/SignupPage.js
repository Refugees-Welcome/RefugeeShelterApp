import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context"

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
        <br></br>
        <br></br>
        <br></br>
      <div className="container">
        <div className="col-lg-1"></div>
        <div className="col-lg-2 mx-auto"></div>
        <h1>Sign Up</h1>

        {errorMessage && <p className="error">{errorMessage}</p>}

        <form onSubmit={handleSignupSubmit}>
          <div className="form-group">
            <label htmlFor="username">
              Username:
              <input
                type="text"
                required={true}
                name="username"
                value={username}
                onChange={handle}
              />
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email:
              <input
                type="text"
                required={true}
                name="email"
                value={email}
                onChange={handleEmail}
              />
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password:
              <input
                type="password"
                required={true}
                name="password"
                value={password}
                onChange={handlePassword}
              />
            </label>
          </div>

          <button type="submit">Register</button>
        </form>

        <p>Already have account?</p>
        <Link to={"/login"}> Login</Link>
      </div>
    </div>
  )
}

export default SignupPage;
