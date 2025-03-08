// import React, { useState } from 'react';
// import './Login.css';
// import Logo from './src assets/codistanlogo.png';
// import LoginPic from './src assets/Pic.png';
// import EyeIcon from './src assets/eye icon.png';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// const Login = ({ onLoginClick, handleSignUpClick }) => {
//   const [loginType, setLoginType] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [usernameError, setUsernameError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isClicked, setIsClicked] = useState(false);
//   const [showSignUpButton, setShowSignUpButton] = useState(false); // State to track whether to show the SignUp button

//   const navigate = useNavigate();

//   const handleSignUp = () => {
//     // Set the state to true when sign-up button is clicked
//     handleSignUpClick(); // Pass the event to the parent component
//   };

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//     setUsernameError('');
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//     setPasswordError('');
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleLoginType = (type) => {
//     setLoginType(type);
//     // Reset form state
//     setUsername('');
//     setPassword('');
//     setUsernameError('');
//     setPasswordError('');
//     setShowPassword(false);

//     // Conditionally show SignUp button only for "Applicant" type
//     setShowSignUpButton(type === 'applicant');
//   };

//   const handleSubmit = () => {
//     if (username.trim() === '') {
//       setUsernameError('Username is required');
//     }
//     if (password.trim() === '') {
//       setPasswordError('Password is required');
//     }

//     if (username.trim() !== '' && password.trim() !== '') {
//       // Here you can handle login based on the selected login type
//       if (loginType === 'admin') {
//         // Handle admin login
//       } else if (loginType === 'employee') {
//         // Handle employee login
//       } else if (loginType === 'applicant') {
//         // Handle applicant login
//       }
//       onLoginClick(loginType); // Pass the loginType to the onLoginClick function
//     }
//   };

//   const renderWelcomeMessage = () => {
//     switch (loginType) {
//       case 'admin':
//         return <p>Welcome Admin</p>;
//       case 'employee':
//         return <p>Welcome Employee</p>;
//       case 'applicant':
//         return <p>Welcome Applicant</p>;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="left-side">
//         <img src={Logo} alt="Login Pic" className="logo" />
//         <img src={LoginPic} alt="Login Pic" className="login-pic" />
//       </div>
//       <div className="right-side">
//         <div className="welcome-text">
//           <p>Welcome to HRM</p>
//           <hr className="horizontal-line" />
//         </div>
//         <div className="buttons-container">
//           <button className="admin-button" onClick={() => handleLoginType('admin')}>Admin</button>
//           <button className="employee-button" onClick={() => handleLoginType('employee')}>Employee</button>
//           <button className="applicant-button" onClick={() => handleLoginType('applicant')}>Applicant</button>
//         </div>
//         <div className="sign-in-text">
//           <p>Sign in</p>
//         </div>
//         {showSignUpButton && ( // Render SignUp button only if showSignUpButton is true
//           <p>
//             Not registered yet?{' '}
//             <button onClick={handleSignUp} className='sign-up-B'>Sign Up</button>
//           </p>
//         )}
//         {renderWelcomeMessage()}
//         <div className="input-container username-container">
//           <input
//             type="text"
//             placeholder=" "
//             className={`username-input ${usernameError && 'input-error'}`}
//             value={username}
//             onChange={handleUsernameChange}
//           />
//           <label className={`label ${username && !usernameError && 'has-content'}`}>Username*</label>
//           {usernameError && <p className="error-message">{usernameError}</p>}
//         </div>
//         <div className="input-container password-container">
//           <input
//             type={showPassword ? 'text' : 'password'}
//             placeholder=" "
//             className={`password-input ${passwordError && 'input-error'}`}
//             value={password}
//             onChange={handlePasswordChange}
//           />
//           <label className={`label ${password && !passwordError && 'has-content'}`}>Password*</label>
//           <img
//             src={EyeIcon}
//             alt="Show/Hide Password"
//             className="eye-icon"
//             onMouseDown={() => setShowPassword(true)}
//             onMouseUp={() => setShowPassword(false)}
//           />
//           {passwordError && <p className="error-message">{passwordError}</p>}
//         </div>
//         <div className="remember-me">
//           <input type="checkbox" /> Remember me
//           <div className="forgot-password">
//             <a href="#" className="forgot-password-link">Forgot Password?</a>
//           </div>
//         </div>
//         <button className="login-button" onClick={handleSubmit}>
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import "./Login.css";
import Logo from "./src assets/codistanlogo.png";
import LoginPic from "./src assets/Pic.png";
import EyeIcon from "./src assets/eye icon.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./utilis/AuthContext"; // Import useAuth hook from AuthContext
import axios from "axios";

const Login = ({ onLoginClick,handleresetclickemployee, handleSignUpClick ,handleResetclicked}) => {
  const [loginType, setLoginType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showResetPasswordButton, setShowResetPasswordButton] = useState(false);
  const [showSignUpButton, setShowSignUpButton] = useState(false); // State to track whether to show the SignUp button
  const { login, currentUser } = useAuth(); // Destructure login function from useAuth hook
  const navigate = useNavigate();

  const handleSignUp = () => {
    handleSignUpClick();
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginType = (type) => {
    setLoginType(type);
    setUsername("");
    setPassword("");
    setUsernameError("");
    setPasswordError("");
    setShowPassword(false);
    setShowSignUpButton(type === "applicant");
    setShowResetPasswordButton(type === "employee");
  };

  const handleSubmit = async () => {
    if (username.trim() === "") {
      setUsernameError("Username is required");
    }
    if (password.trim() === "") {
      setPasswordError("Password is required");
    }

    if (username.trim() !== "" && password.trim() !== "") {
      let response;

      try {
        if (loginType === "admin") {
          response = await axios.post(
            "http://localhost:5000/api/login_admin",
            { email: username, password },
            { withCredentials: true }
          );
        } else if (loginType === "employee") {
          response = await axios.post(
            "http://localhost:5000/api/login_employee",
            { email: username, password },
            { withCredentials: true }
          );
        } else if (loginType === "applicant") {
          response = await axios.post(
            "http://localhost:5000/api/login",
            { email: username, password },
            { withCredentials: true }
          );
        }

        // Assuming the response contains user data upon successful login
        const userData = response.data;

        // Call the login function from useAuth hook to set the user in context
        login(userData);

        // Navigate to home page after successful login

        // Call onLoginClick if necessary
        onLoginClick(loginType);
      } catch (error) {
        // Handle error response
        if (error.response && error.response.status === 401) {
          // Unauthorized - invalid credentials
          alert("Invalid username or password. Please try again.");
        } else {
          // Other error (e.g., network error)
          alert("Invalid username or password. Please try again.");
        }
      }
    }
  };

  const renderWelcomeMessage = () => {
    switch (loginType) {
      case "admin":
        return <p>Welcome Admin</p>;
      case "employee":
        return <p>Welcome Employee</p>;
      case "applicant":
        return <p>Welcome Applicant</p>;
      default:
        return null;
    }
  };
  const handleResetClicked = () => {
    handleResetclicked();
  }

  return (
    <div className="login-container">
      <div className="left-side">
        <img
          src={
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAB0VBMVEX///8RRq7///04kuc3k+Y5kej///v8//8AAAD4+Pj7+/v///ny8vISRrARR638//34r0DG0ODp6ekAO6zBwcEAKKMAN6kAP6zc3NwALKXHx8e6urrQ0NCtra3N1ObW1tY/YbmtuNmRkZGIiIh2jL73pyyfn58AJaXi6PMAMqleXl58e3ujtcz49OL05MP5+e30xYAAAJqTve8WieRSUlInJSYoUrDzt1n06M71sEzyzpb3wHX8qDn316f13ri6xd1FQ0S7iiengDNramozW6lYdLoAKJiNagB+j8lYbbuUos57ruecwuk2Njabrc89Y6n4ow3vtETizpzsvV7jxYBsgb4VS5wAFaF3lb/Rzr7WxqWtoovJsoifiViYfi2RbzGZhkatpH6gdwB3a1RzUyK8kTxcUj4oNkdxZT12TAC/tZq3kU+3mWGYj2lXVTWKh3pDNBwkMCh7ZiwAHUCIb0PDrlhWPQuQTAAuOygOLi59ek+ncy9yUTRlbFkiQkpuYVjOpTaWeGCid0hLOzEkEx5cNxlQcKR2eY1co+kGhO740mX735FlpcNejaG5x2pKlM2zvYC+zlFTbXRoq7iXtpmBu5N+s6PPzELOxVWVsLY4SXWDWxX7AAAgAElEQVR4nO19i1/bRr7vIEBClvyQDJbBWNjghwx+JSayMcECYydYgEjbOBhCQkJjyhJCutz03J5t9rY9PZsle3uT7GlO9/b+tfc3Iz9kIC1pobT98EuIjTWame/83r8ZOQhd0iVd0iVd0iVd0iVd0iVd0iVd0iVd0gUSReiiZ3FGRDtTKSdz0bM4I6KYRA79UTgDYJLoj8OZXIGhL3oWZ0ROVJj5w4BhmJk847zoWZwVMTPpPwwYmsmn/yj6D5xJT/8OwJzOeVBoOnvOEzkLOl2UwqDsFHMq1nAX6VqpVOoU3KEAzKmmySUu1ICncin6J6dJoSlX6qf7ouhc4kI5w+SS3E+34lynAYMShdO0OjeiKC5/ihgy4XIljt55vFVqJkddcJyQTHPM0ZnRnXaBATC5jgbUMdmkGGchT114bJ3OO4+uJ9fJBybnciWZH2mAiMBO545++GsTg3KuHHNkRelkZ6Oky1XoAJPIHbPU3HQeXXQwClqTnnIeAcPMdFqFgss10/lB4igYJj+VuHAhA+3IhfNHo8hkAVnVZsZ1Pc9Yb8mznfOGTm7l0YXXCWB8Z/pWstMG0Ik0shgmJu9yWSJNSDzTVAd8CqWmw4mLB4OwsbqV7VRoiptOWOARMJaraGbG2clLLh/On+scT00cSofTHWEN5UwXrGDSLte05QbndIdvAoYUXOEL9ZdtoplEeKpgXWqnM5+2/j4NYCwmIdfJSBC77G+FMdhF5sNZq5NwUskpy3xT09ddWcvKz2Q72ZBKX59K/XZS0ZwLBM0ai6TAFrf0OZV1tcHQNDc93WG5qRlXeOY3oPtN4m6HwzNOi5qkstMpyy8uV4tT4OpdMx3eMTd1/YPfiMYQohJT16esXp1Lf9BW8gSAaQdnzkK4YOVDYhoW4qJ9v5XoVD4MkmTxJYXwDNfUAgxmqoUtlQ5b9Iuh8+Hr2WOh2kUSePCsC1uk5pJTSWytG5SbAjCF5pXcB+25UyRuc7Vx/xaIArfncoWTbfeRm5rK0Y1rSROMeY2escAEq54FS5f4rVWik8CabDt+hPgkT2wWQChgME3r1rpAiEuHXa78Tyer504d8ZiTS7umrqfpZgANAcp0MyqYAUlyERmEW8CKN/UfbPkMYMl2xgMMsv3qdjqVoxhLZEgzWJhcrWiZg2nm8Fv4yYfDYTMoZignfG5mO7hMhbXJlXe2+4EmXO4CTFvqw45gkkHp622jBYoCfpSDV5hzIgeUwKkyQ6c+aAYL8FsK4pzrH3V4WybxYepYGn7uRIO8cx3JPGHNtJliUXQuO5WnCRjaRogUDKnE7WzaNGYUiaYh02mHCgyEadMX4z/BEuUsEkIT1rhmiJWl6FSuMSubFiIU5xEROjrVLAhi9NctcRqFnLmp1LkbthP5DoFJtkC3XQuuKIGgJVu3UGTNta5BD1AsaiAcmdFUkxPg+sGcz1iEipvJHsunW72fiewR6TipJ9D/QnYm1fJ3HINZE842pajRSo857EAOT1VEJnRyiQF7h5WsxRhIN/PZdxVoqDMDk3qHGIM6FFz55kUK5zWAJd/ZWql6HF2YpIDc4RuBDWHMmHYIl3YV3jljLnUmSTWAySVBrY/t5OPeuRlXuiEZFE4pw+kczWhxtmm2KSSrEsHSZfdoDUtHhC8o0rm864OmvwQzPe2aOcl74ooilUumzsjEUalEPp9gTrCYNHaOFqeXKKQ4oao6QnzDpVJIi5lYuhwxnW3cRVOGw1EJslzBLKdhdLksjgyOD0ExjDOXL5xZKEo5namZpkXtvIINdHiqJekczYdUyW6PVUXTZlM2UJkGGqmimPgoVJPsktRVlbmWZS9gtwSm+YThk9PTubPcuIFBYOVmwJ0d9c5gw0D0C4wTF49oWrnjwVJld5d587oh2RtYuuyxEEcWgFsgH9olj4bDZQp6h2Qze4JRNsfNc2dqrmE8GPDWrXTuWMHbyaSmwuG8k8GL7KxFHQ2ZqsiUEq8MRKWuFjk8V1RdsYFJaKIr8aTvVPoWYDm+b8ZwyeytqcTpdt1OTww4CJITYo539s2hBDg/IoScLTjoMDlhlwZj0UG33eHospBDgg/h0wa3gH94/rhfSKtpi8ZgLbIlCgBlBsY+lzNRKWxN04XUkVQKYsww8ZU0JQ9Yp94AYjep8Zm9JXeOQYNrgJnq3CXAJezEzFTYNZ08r4AAFiiXdt0KpwsJp8WNgQgWsgVTl8WARaxguna3xyM5VCCH5Pa4pS4ro+wxGSsR6AXMuX0ehZj8XB6EF1zy+RXTYZgUrNf169MzCRIoN0ficg1J4EOe1lRBjAbVckgPBjVB07SgHioHBgFaq4E7oNBmrwmqHTLQDOKS+Ww4fB1r6In27czQcLlpHIZMz+QsE2gtHxOMtde9qxqUFZ4DnGTOHKvIWqh0w922bvwJYzCpQnrKBWwppI5vsJ0tQfepAg4oXdm86V4Y1AoDYRk1D1YJySENBgxZMfFTTYJWvBIsx9z2hsrYOiw9YW6qMD2FA9DpBKzBOadpeDxn7qMwzkQ+SB+NCylWx5GY5PB0GcpJsQlWB14LeLAQEmPm7LjIgAHDC3XdBdry6+w9URyEZGE85FQ6Zw3ZKCruIcYqChHAOydDUbweJbzxhDqbgLWEOJqw5Vcr1+CBTM1xYcdDmzIEnoiLRyUHBCqDGnb0Jws8SSgoUcWoHQNV0CgnBKXQB5PIQ3eYLx8UftUyGki3beYDjMZ1K5tiDUMWeZayxVfBVtntFfEnZR1CGlAuu2M1xHI2XpHjNYXL38L9hXEY7vw1qwB42RnwOZiSzher0ai7rGu1G3bs+qss+ql9Y2wVdYdkd0BIqhlVx8BgVOVJSRqMGIe4c7ZiJxFOr8LplOYBV2h3xwawIZO6QvwpZoLjuDjJdNwDOLyxO2I1XJ1yHbMpvxLhnCmdTfIVqR282KUQfzqDylCs4ZDM+3CsY1flRBZ8ywXtn2O3kMpxhtTVira63FX+yK44Tq5xnnJCsMjr7fwAiyefzDkvdstZqUiWCQWU4Yhv+FQ3jvhFttrVvllStV/97Axlzc9gbMESWtq7BJjj8JDfch1RibX1uxt31xOtwgwmcWLS50S82uQqVpv4sXzmvLDRCTNtZpx0p0MLeVqyEsNOsH/IOxIxL4G7SOzeu79Z3yzeL24+eJhroRmdnRzFr/EBt5kAOZrJjUlgLs0AIpUsnMfxQDqXT+eTKYrpOMTEcKgVKEsOci7D5wM0ZghJPdzcKhbn8J96ce6LrY/N2gc/vzw7j4gJqXpMMJKnwnKWQx0MciaS+elsOnf8BNgvJwicIIuFeDabLuRSHKwcKSfBH3oBbCs2ZQOaWRgb6vd6/SL41dyjuQeP6/XtT+pzO8sEz592WWgztjw7yeO2EHjGTCn1rDRSJMrJcalEIZ/F7jNp5jvnRTg+D0PGnp4p5BIpspQ0ChFZcZeajYZ9I17fCL97f24jIa4/3vlzsbizXdzbXd8obj3h2aH58flW8K8POggWc/2ZRLIwnYUBwlPp5DmXnUGKGMCThyg9jMcjxUuaY0uwvI4BrRUne33D3v67wInU2thw8i8AZn9/Yy3yNLdVnHviH4+MtLtUwDw7JElpaOI06Xg6X8BIzvt5KLN7LM6u8PWsWfFHVCjm6JICfFvmRd/wbrH+bJPb+/Sv6+uzAMafe3LtZqK4Uyw+irCW/my1QUiuS7bGvPO3MJKEE50/lDZxgCfbPERmK0OYNWhYExjRVyzWZ//MbWzuP1gfe1aMJPZ2dorJ/U8e1Iu7FjA0JXiwg2LNm5lkOpn4lbc4SU7FNYw1RbE4wvTIHedNNkDhN/88nLy5v/1g92BP3Hs0u1nf/R/P6nP1x5baKIWUktvhiAqNe7nUO/YczpUsPgEJkGu5y4plEtQadi314sPEzWfPip9tcne36gfFh2MHYKXvF+9aWINYPWa3x2oXfqbRJArBdEhZvD0f/uHWwfKzevGx+HHx/v6suPbp8v2vHo2BjD2b3S/eF63347KBFPgNgCHVCh4b5pjW/pRBiZv14v4ny5v1dd+/ffM3X+p/bm9v79/fA0PwyTeb9ZvrVkmSVbBngwJJNy/yDA3F8kqwesMDUbxDbn9MM0M35+pzXxx8/u97a8+/uMf+Zefpx188/+vB9v/auT8HzvOZtSyjlMGw26Mrhnws4j7n2Vu3BUF5a4HBaAyXKaWS0m7F2Ta2ivcfP/7s3sd7T+8+865vbdXvfvwksusb+nBj7wHoknV3TQy5cVbjGYw6FuRmlbRZoTq/Gg1lHrIgBpmDqIN9EZUaFWXQf0tD24PiszH/2u7djSdffhnJffVV/avbd7/Z/nJvd21EHHpa/JNVaRpVUOhHijlELpWCrgnjmHP2NE4YC59RSBZmZvI55UYrYHZXrWCcD+q7a7sf71+7v/Poa+/tuQ+T9fqHTze3i5/v7zxZE/durlka03o77o5qiel0Pj9TSCZziUQKgHUM/7OxMe1tEQpCP4BQKMzk8+np6Wx2itRlZixgPAvWUqvtwV5uY2uu+Ky+v+xP1j9D6MO5277JTzYfFIHW1jvBGK36NIRECYjLcMFpaio7nU6n8zMALIeBcY2I89iTB6chHLwCBxoAPsqaEEi1zKRwwQom1Anm8Vry3ubN/frOvHdj66v1RHruo7W7nxd3Du5vbiQ2OsAgCxjgTNjVJjLYFMYFhJEVILxlfwYaNpHDQIAROKq8det6mJDrFGAY2+Pi10Pi8Ojk4wP/0POvtuqPt7666V8b35wf84neSPGmdX+U0k8EE7bQBxgOxgJMApV6fzAk28N/QXJTppDN5NNpzCAywK1b+TYYu8eqM5Rtb+5gZ289wXEJcSSycRtoY2fc++Txxu7G3rNHWzet1syiMxDW5IiYTX2QTZucSOZSWHdwBkXTzQL8zyTix3B4bmoQg1M0J1GhZCGnSK38v8OaUdT6zTrOxf7yX2v8WrLft7vx9fazm/1ry5/Wwc3MFf/DZinAsi3O2O2rMpcE/XByTieDyczgmLP4egTSgRNvKlHQOfbQ8GOpNnKGXSKb4ABmxWu5z+ndgnhyf3n/YG3300d/+uab7cnnX3xzL/Xk+eznm/X61gZlERVimnGJWjKroY1dEsqcAM3hWi3T+ugXEkbQOIvV2IVx4hQXb9lS3rheXVE9brdbkq338PeKB8vLOxAgP3m0v/3NFxs7y/v3b46sz21+88lOfXONsYBRVuB+j1QphwzhnKN/RVFkxYb/ZWj4V2F5WdRkCt5pvPlsGR9cwGQVM0StbxUhciluiAf372/u7G7vH8zVD+4mIGg+2Czu8VaPoej4dqMj+DzqUc6kokYhw5BrGq8JQsjJ1gzD4OVyvBak44ZWVX5EkMV7kM/UH/nWt3a26x9ubD7ZO9guPqb/WqzXizfXTjyFSWIXRiErhsjC4XfmC88ronLCPe9HtDysCzwfl+mq4DR03eD1mlEVWQPACMh50qYkIW69WJ/b+feRjeL+wUbkoDi++2D/YCvx908357Yeiu+4R9FExqhUKmXNhqoVTLpQLcPvFU0rl0O/HAzyXokjsRrSBg1buboQ4kNKSPLy1ZBShs9robjSPCVnJQol7hXr2weJvUfbG4XtB8X9h4Vnn2/l7i4X5zbX/EfWgGglK+iVskIrQU2rQtTapQaDRqAseKrBoO7Q5aBD/cVgQKRXBaRUQoInSFdVQ+R4SohpfFnneB7ZjAFHYCF+gqER7369eb84l3j4n/71e8uPi/s768OTf0rdLtYPPh7zs0da04g3Kqp7wLDxgEWrSQtOR5mi2YWy4DYoSqlA5hcInAEYI8YjOaB5AVNQFfC0ayqvlHQnWE0Yxm13dKm1o4Ijfv3M5328ObeR8q4/PgB2bG+DMWBTkDQ/HBsbOyqdSlUFw+wGhghRyAVurJZYRxlvrwFnYKmUgG47AzAQ8NcGAIwarFYhJ/RoFMR5VwJIUXVs/p0kSLRLbqks0800kWLQyPOvh2EOn0GK9qAOwWZxbmcWDNlefbM+Gol8+bfZFhq82SGUPfg4jT2mO2n+RhmXbGjkgPFMMJA2nQ1nGIqjEyzHajWBRU4lKDg5Gx8XeFYYVkSKYiilTM4o2N3RisY2Ujbk+9tTkdjSu/VN8PgHO3NzmzuQkuF65tCw78vnz/+thYaTy1EznJECAmJobXUlFKopyKGGQlW1LHSV4FU6EzBgmmtCSJBrQf0FGnmhLeistuLVDbEWr4XwcRcqaG9snLmjZZlMkY88f0ocCXhGcffeg+Lc3Bz8FIsP9tbIZqd34vnzbS/p3aYsDHhIobpL8oTAFzNcDYxYIOTEVqxpzSqVIIsqv9gAUEhTKIUVZYoSEavgY8k8Dqt4pXlwRlwISOTAHMAZCCk2xD99dtfSA7+28WTv4717ew93c82ATHz6/PnzIZFHotEVM6F4PCqYeuvAR2cirPxiMKDlrJNlnCyLj8cRrTCP8zXzc4oVjKoak8hGsydgCHe/9rWNG3m1JcQEKbKbQQzed/c//2bC16+VMRQ73Gcv65rYiJZIbEw3zqdAVEixhGjhpAm+Jxrn0uJVQkuYIBRQeNaJo3GaZmgzTVc0vSKRUwpuqfT34Y64gG49T98CiGOTyPiIULW7u3DVPKYuBM1jNmaADHc4WV5RBE0jY5rDL/7yCAAYISxmejF1ZzLd3T09h4eLi1cBlHleqdHIpmhVCR8tlSSwc6fo1TserEjAFoBS0uXWnhnNgZkRtKWri4uHhz09Pd29MGZvbyaT6dHeGW28B9EUvwS9kj89uGeA1dsNmA4Bk0LK9QhsHiXKoRsgNXa7vSy887AJJjCCTkSvqPgknSdaCSosOXJCyokywMAgzNWDIbvJsD2ZReWMjjhRrNbTncF9487xCwEHw/X09iwuiTg5AXWiWCV0Y8DhsLslDf1EJcW5IkmOrtjqC4G34fwHZIsVrmJmAIYeEwQercd8l1kUz67oRMtmzyaanhZ1EznoWfSaJROK4/UYOA2Hp/YjB04Au+CW7Hb3wIoCDKHxX3HpMINhwPr0NIZpg+nNLJ3tYRrxsJdImMl+QuY7LBGZlz2LkN1w5HScrrrdjliZp07eWIUQgop7QLekikyQcayydPgygyFAf73drWEaI8GKCWd8JJDmD0GoLEyxsKebMKh3UTazNTGkero8ZeVk3oB+6DHJ7Shr2CQSJJlM70n9mn2DJAs/ooA/g7DN5xdfdv8IYTyHS1iZKSRUVbdnRTheKCb96G5JWjFw5g02cLG7rYsnUu+hcFbPm7SngWh2MdP77kFN8ei5CuwBB6SVpUEItY7OAVihLHhiAV1BRLwWe3+ix+7uQ/kc9jlAbPnF3rb+d9i2tmXIgPaI4IBEIxANaEfTHND0alRaEEC7nPLVw97e7paynyy/veeCBfttWlzMNDS0tXC9vUf0tRdbax5ESK4OODR8Jp4ipx/IuSaKLUcDBlYtE0p3Zwfdx2xMj0yf0+kgmlIWe3usIt5811jepnCA8oCw8UFPl1XSsL5Ur1QVG0Uriz2mRzzG2oaTbKhhj3BuXxJGOTn5MGOGAL0dlrq5qg00sKKLoLaUcseDo0MuUdjNJXAi9uIKTnqUq6Y/adzaZE+zw+4Wk3qWuPPcGOQEcNKvD5tSncH08iV5yZgKgKdJprgI0mSreuRE+h//O5/f++qjHCoPKOBYNCJgTS+MZ55pU4fSnLGvPEakkGna2MYntNOpQIS7tISDqt5MAwp+u8TSlDBZX1uCC4dLiX88+LsTwkjsVrrNwAtbRwhbl5YERQGfa3m0gaLNWvC5QDAzDRvL8jyuyclCg2SzRMeaG66c0wR1CEhgwi8PFX5jQwP+9Xz7MtN9df2zhEJMCOYexKmAQcTPQ3Gc7R39QseW4c8GCcc5eRFGChq1aqXkiMUGBwcIRQcGY5J6p1w1DA3GF1nCOt4rNBAdPnwIbOnu/T+vXoLULO7uvX4JPDnEvGDxslM2s1+9Vg6oUqzR68DA4ACEeGqpHNJJvzyLQ4uff3Kbam8q85BgAIpSFx7Cg0NEO86pHHYHIbskuT0wD7daruqaIIs0fhqRVjCg2u2lzOF3rzNv/tnb893r3qsb/0X44STpKq/ImhEqB9yDg4Mxs9suOznmaMdd4wQU92u/U6nq+HEPM9swn5R4XzBEYHkYb6GsDqyuRqODeFDoPkbexGKAiyTLDjs+12zvwphiKh5ZIE8CUE75M29v78vv3n775r+/+/67TG9GuC/wZCasgnGocINbInPHu814/tAJQCBDmDwaHIxGV1dX7QHSL9V0W++HBXIOJR4ql1QJ2L1Q03XdCAJpQUKGrocWqisl1T2IJY0spXm0UXLH8MBxBSxR4vbV7tc9r9+8evvtP9+ADXx9uLGOn2sQjFBFjXkkEwU52Sx5YgODbgceK4QHC7bIgLFqIeBgl+NOeQGy0p/BGCFeq9WMoCbLRBOJLjZkD9ampbFYkaorqntg0IOfljMlRXK7gUOGMlPo/fbVm7dv/vX27b9evX3z6rvMyGNGw/PCTCXiinO52EDMAQw1zLGw2rNMax7IxsBYoFp4MM0wYFbC+1psvJUg8rZTHCxkbDyR/uodT3RQInhILUCS1L0c2LFXP3z75vDw7fffvvr+8KVcDJAtMqwXmCOe6IBa1kHJ8WKdYoqwiIqovOepFNAY7tSRBLAK7+SyvFBbiUYbJ0gB0cBeItPT+/rNm297exf/75vX3d0ZZdPT1Xz20RNdjb3QFNpmo+nTSw6eFfe+YQFz6gCv7dqwECpGyS3h47T2rtg9EdKu71/961VP5r//9erhYU9GKbrt+EC2JHkcL+KNegv1XhuW5/7wVsdgiI9XVQfIUuxpofvb73/44e13r169/f57sGoZ8ZEbi5la0oUTvn/yt0aNQqQYXwg4PCvpq72Zl9//8O2rf373w1vw/Yfr/88jqVVdIDvi53c8/syoIS8gb1XHHviZHrDM37/54dWb170Zrego60Jje/z39B8fgLgJ/s+WMq/f/pD59m0GC9nVjae4Dvs7AtEmmPPGxtLr1z2Z1+D+X79eXNsTf1f8OEKp9Y0liJoPX2de9i59ePs39dVf70nYJax/ti5chZxFW/8IY/n98gUTlfjwo49ub/zH3D+Sv2scTaJSiVwi9TtnCiHssBtnkn7/YC7pki7pki7pd08tZ8QwZ/y1RjZclrHZvN7GaTfb2BhP3uKCCXkjTiyTi6Tl8WMHPG9r9UWaiXzrCt+8aHZmM0ux4qSXZYcmxFYDG988ascfPXP3XsT6J0Yj4xEUueb3eslQvvHJMXgZmR+LTExA3/0T8/MT8yJvG5mcH524Rp43F4eGh/qHhvqHh0Zso31DiDXnMDTqRcjbN2HOmp2dHJ1Y9iGzs9GxedvwxBAZc3QMyId8yxNjo+PwkXey+dz3xLFDd+9D4viYDU1eQ+Lo5LUJ3BEviuOzXq8YmfUif5/PJ06M86i/LxLx9ff1I7HPj89Xj/X55vtGx/pGR/tGvNf8gMyHYURmx/ttqG9iuH/IBwj7Isg7G8Er5F8eQUN9vNg3gWvV7Oy8PzI5gWYnYfyIlx0evjYxLOKhvROTI953nFU9DZj5Sb9vdgLAwAh+G+aUf3K2f2zM3zfqm5/tnxD9877+sT6x3w9Dwhy8GMzEMvJf8w71DYt9Q+zotdHh4eV55J0f9Y7CrP2zk0MjE3082zfui4wTXvigs7FlGx8ZGwfOin0+/FA6Ozlu8vPaaL9/dtSGIvMwon9s9GczxzYEHPGJ7Niyf2S0T0Ssz8fPj9uGIuLEtXH/MBIp78QsvMOCHbk2NmyeoB8jYPr7hr0gY95r/QiNL6N+AOJd9iMWFh2YKkKTiSFTdHFnY/gxdR9wl7AXjU5iMFj/cVN2DCQ64mdHJ8Xhowdv3wcNyBHWSdCToT6YKqgpgEE84rGgwXX/5Kh/dJ6otm+88S0AEw0wfix6w3iC47MoAq8YDN8Eg/rnG8/ZI94/6RvzYzBDJ4LhMRhoOwoyzdreMdXT0Ggf9IO/iKC/T+SxVGAwCLMfP2zNjs6LMAcRP/4bme0zNXWszz9/TeT9fj/MdoSAGUfeERHA+JpgeL4/MtnXfMh5ZLlfFDGYkWGvKWaTLNGZsZF+AmaMHTLBiL/IoE0AQ7x9MOVI38S1Ccyla2Q9/X1YecVxUJNRGB4Wzys2RuJHhkewnrJ4Ff2AUJztIxd80IHYN8/DHcORWVFszczXN2b2OXktMgTvxfk+cbRvfmK8DxTSB2Muz+IFG702Pu89PsXTkw0bVjwteBOZaPyOWq/4CgtvWd/IyffjBpTNrHSTF4wQjHO/9VtDGp3By6gfmWNhkYbF4s23Nu88Xh7bSOTnW7NLuqRLuiRzP4lrbis1NyJo8i05zSfdyJVm43ZRqfl/A5gtml+uT+6gnRTi2t/4SJmNO09BN25vfV8oRb7Z5n2fTBOC8WBc0OLxoMHHBYR/4C8nhHQBLsaDQYWT4zzFC/APimu4AdhcJW4YMgfXgRQZWsXFOP4XWtDQgkJySFegFd62hpUQ4iylCbyg8dC5TRNwZ4qh4EE1BOPjLQNhISQgMS5qQdxR3EuxhvC+FbiQFFgpGy8CUklS1CpSAjU0WKWCnlIpFqfK0orqUIwoD58PyBQTVQUlgA8qatGA6tZRLVZaWRF0d2mlJJTUUiCEoIUY0DkjthJQBc2hBgIGcFhXeVSuKNUbGnJU2ZUFTZJRzaEE1BW4ZVVdUe94NbVccWuyqoVW7GopVC3xxhXhfb9Xp9pFXjRJQzY1BJM2UDQkOkIsqq7S1TKS7ZqxytNawFFjqainqlQADBI8GtIHFEPC9+oSxApKScfvr7ir3oqhSC+QGIprHgVvtNLUwh0MRqxGV2wApqTjUTwLigN/GzpzxUCyW1u4IaK4LDuCNqRWYLXc2p0X75LiOeMAAAJTSURBVP1NoSHPSumFAmAEyqZ6buCvW49WlRtBhOJXxGogHnLLAIav6rqqMAMhtVY2wQhIGxCNwZVSVdGlatngV9TSnTi6Egro1aAWJQ8naKoKLKMpKuQgYMplj6ACmAVqoaqsCsod4ImGrpSNcllR1GhZoGU1yBAwIDE3lPfeC626taDGNsCUZUOtoYGQIsGaGVf4qhvEhDZWWcWxoHsEJmroasCwmWCCUVEfjMPNur1cNUBGg0EZrdb0O2pQHgBNUXitS9dAHQDMHRatVMSKHioTMABTlxC+xVCoK4EXapXnlXjlhg5gKAKGErpC73/OseqRZVlEmkejbV2mzkSr/EpZlgMqrCbms7EqBj2VilSlV0FAVgmYQUMoq3wtCjfzugfCKkVdUGQFXdHF0hWDD5TkoMOATuEzCnTGI8h3qnxZFyuDVTawgPjKYA0pXfgWDsRM88j6HUUpLYCYcUgNAArRfuxb0H6adND/sobkikzZVhaQUjaQWqOESiBQFlB1gQX1jatiaIFnayVO1emgGrchWgBth7uMwEplRTBKPE0p5RWQV+QwqKAa5PD9C4pQLpVXamBklYVSqSyIVYOOB2psWado3aFQCn4ws0p3GUhYkZVyuVoWlLJGo3IVg6n8DDAKrC2sKC/zFAWvLKwkvNCKhr9QVia7rKLMCgpuyeKGAsSzFI85Qps384psoygWv5WRgFsoFFIEGTI7s28wsKKgKfhkC7LJig33qoD5btzS6FTUcBP8UIqAvy0EWl3ujFzSJV3SJV3SJV3SJV3Sr0z/H3Pbe2Ogn4eoAAAAAElFTkSuQmCC"
          }
          alt="Login Pic"
          className="login-pic"
        />
      </div>
      <div className="right-side">
        <div className="welcome-text">
          <p>Welcome to HRM</p>
          <hr className="horizontal-line" />
        </div>
        <div className="buttons-container">
          <button
            className="admin-button"
            onClick={() => handleLoginType("admin")}
          >
            Admin
          </button>
          <button
            className="employee-button"
            onClick={() => handleLoginType("employee")}
          >
            Employee
          </button>
          <button
            className="applicant-button"
            onClick={() => handleLoginType("applicant")}
          >
            Applicant
          </button>
        </div>
        <div className="sign-in-text">
          <p>Sign in</p>
        </div>
        {showSignUpButton && (
          <>
          <p>
            Not registered yet?{" "}
            <button onClick={handleSignUp} className="sign-up-B">
              Sign Up
            </button>
          </p>
          <p className="reset-password" onClick={handleResetClicked}>
          Forgot Password? click here
        </p>
        </>
        )}
        {
          showResetPasswordButton && (
            <p className="reset-password" onClick={handleresetclickemployee}>
              Forgot Password? click here
            </p>
          )
        }
       
        
        {renderWelcomeMessage()}
        <div className="input-container username-container">
          <input
            type="text"
            placeholder=" "
            className={`username-input ${usernameError && "input-error"}`}
            value={username}
            onChange={handleUsernameChange}
          />
          <label
            className={`label ${username && !usernameError && "has-content"}`}
          >
            Email*
          </label>
          {usernameError && <p className="error-message">{usernameError}</p>}
        </div>
        <div className="input-container password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder=" "
            className={`password-input ${passwordError && "input-error"}`}
            value={password}
            onChange={handlePasswordChange}
          />
          <label
            className={`label ${password && !passwordError && "has-content"}`}
          >
            Password*
          </label>
          <img
            src={EyeIcon}
            alt="Show/Hide Password"
            className="eye-icon"
            onMouseDown={() => setShowPassword(true)}
            onMouseUp={() => setShowPassword(false)}
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        <div className="remember-me">
          <input type="checkbox" /> Remember me
          {/* <div className="forgot-password">
            <a href="#" className="forgot-password-link">Forgot Password?</a>
          </div> */}
        </div>
        <button className="login-button" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
