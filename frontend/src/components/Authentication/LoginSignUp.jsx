import React, { useState, useEffect} from "react";
import "./LoginSignUp.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { validPassword } from "./Regex";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, login } from "../../redux/slices/UserSlice";

const LoginSignUp = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const redirect = location.search? location.search.split("=")[1] : "/";

  const { userDetails, loading, error } = useSelector((state) => state.user);


  useEffect(() => {
    if (userDetails) {
      navigate('/');
    }
  }, [ userDetails, redirect]);

  
  const [activeTab, setActiveTab] = useState("tabButton1");

  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const toastOptions = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false, // Disabled click to close
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    closeButton: false, // Remove close button
    style: {
      backgroundColor: "#07bc0c",
      color: "white",
      fontSize: "14px",
      padding: "12px 24px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      minWidth: "300px",
      textAlign: "center"
    }
  };

  const errorToastOptions = {
    ...toastOptions,
    style: {
      ...toastOptions.style,
      backgroundColor: "#d9534f"
    }
  };


  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const logInSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, pass1));
    console.log("Sign In successful");
    navigate("/"); // Redirect to dashboard or appropriate route
  };

  const signUpSubmitHandler = (e) => {
    e.preventDefault();

    if (pass1 !== pass2) {
      toast.error("Passwords do not match!", errorToastOptions);
      return;
    
    } else {
      dispatch(createUser( name, email, pass2 ));
      toast.success("Sign-up successful!", toastOptions);
      console.log("Sign up successful");
      navigate("/");
    }
  };


  return (
    <>
      <div className="loginSignUpSection">
        <div className="loginSignUpContainer">
          <div className="loginSignUpTabs">
            <p
              onClick={() => handleTab("tabButton1")}
              className={activeTab === "tabButton1" ? "active" : ""}
            >
              Login
            </p>
            <p
              onClick={() => handleTab("tabButton2")}
              className={activeTab === "tabButton2" ? "active" : ""}
            >
              Register
            </p>
          </div>
          <div className="loginSignUpTabsContent">
            {/* tab1 */}

            {activeTab === "tabButton1" && (
              <div className="loginSignUpTabsContentLogin">
              <form onSubmit={logInSubmitHandler}>
              <input
                  type="email"
                  placeholder="Email address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
        
                <div className="relative">
                  <input
                    id="pass1"
                    type={showPassword.password ? "text" : "password"}
                    placeholder="Password *"
                    value={pass1}
                    onChange={(e) => setPass1(e.target.value)}
                    className="w-full"
                    required
                  />
                  <button
                    type="button"
                    style={{ backgroundColor: "transparent" }}
                    onClick={() => togglePasswordVisibility("password")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword.password ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
                <div className="loginSignUpForgetPass">
                  <label>
                    <input type="checkbox" className="brandRadio" />
                    <p>Remember me</p>
                  </label>
                  {/* <p>
                    <Link to="/resetPassword">Lost password?</Link>
                  </p> */}
                </div>
                <button type="submit">Log In</button>
              </form>
              <div className="loginSignUpTabsContentLoginText">
                <p>
                  No account yet?{" "}
                  <span onClick={() => handleTab("tabButton2")}>Create Account</span>
                </p>
              </div>
            </div>
            )}

            {/* Tab2 */}

            {activeTab === "tabButton2" && (
              <div className="loginSignUpTabsContentRegister">
              <ToastContainer />
              <form onSubmit={signUpSubmitHandler}>
                <input
                  type="text"
                  placeholder="Username *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
        
                <div className="relative">
                  <input
                    id="pass1"
                    type={showPassword.password ? "text" : "password"}
                    placeholder="Password *"
                    value={pass1}
                    onChange={(e) => setPass1(e.target.value)}
                    className="w-full"
                    required
                  />
                  <button
                    type="button"
                    style={{ backgroundColor: "transparent" }}
                    onClick={() => togglePasswordVisibility("password")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword.password ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
                <small className="mt-[-20px]">
                  Password must include at least one letter, one number, and be 6
                  characters or more.
                </small>
        
                <div className="relative">
                  <input
                    id="pass2"
                    type={showPassword.confirmPassword ? "text" : "password"}
                    placeholder="Confirm Password *"
                    value={pass2}
                    onChange={(e) => setPass2(e.target.value)}
                    className="w-full"
                    required
                  />
                  <button
                    type="button"
                    style={{ backgroundColor: "transparent" }}
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword.confirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
                <button type="submit">Register</button>
                <div className="loginSignUpTabsContentLoginText">
                <p>
                  Already Have an Account? {" "}
                  <span onClick={() => handleTab("tabButton1")}>Log In</span>
                </p>
              </div>
              </form>
            </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignUp;
