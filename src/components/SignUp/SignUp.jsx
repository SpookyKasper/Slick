import "./SignUp.css";
import { useEffect, useState } from "react";
import logo from "../../assets/slack-logo.svg";
import CustomInput from "../CustomInput/CustomInput";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const SignUp = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passConfirmationValue, setPassConfirmationValue] = useState("");
  const [signUpData, setSignUpData] = useState(null);

  useEffect(() => {
    if (!signUpData) return;
    const createUser = async () => {
      try {
        const response = await fetch(`${apiUrl}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signUpData),
        });
        const result = await response.json();

        if (response.ok) {
          setSuccessMessage(result.message);
          navigate("/");
        } else {
          setErrorMessage(result.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    createUser();
  }, [signUpData, navigate]);

  const handleSubmitted = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (passwordValue !== passConfirmationValue) {
      setErrorMessage(
        "User couldn't be created successfully. Passwords don't match"
      );
      return;
    }
    setSignUpData({
      user: {
        email: emailValue,
        password: passwordValue,
      },
    });
  };

  return (
    <>
      <main>
        <div className="logo-box">
          <img className="logo" src={logo} alt="slack-logo" />
          <span>slick</span>
        </div>
        <h1>First, enter your email & password</h1>
        <p>
          We suggest using the <strong> email address you use at work </strong>
        </p>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <form action="" onSubmit={handleSubmitted} className="login-box">
          <CustomInput
            name={"email"}
            type={"email"}
            placeholder={"name@work-email.com"}
            value={emailValue}
            handleChange={(e) => setEmailValue(e.target.value)}
            required={true}
          />
          <CustomInput
            name={"password"}
            type={"password"}
            placeholder={"********"}
            value={passwordValue}
            handleChange={(e) => setPasswordValue(e.target.value)}
            min={6}
            required={true}
          />
          <CustomInput
            name={"password-confirmation"}
            type={"password"}
            placeholder={"********"}
            value={passConfirmationValue}
            handleChange={(e) => setPassConfirmationValue(e.target.value)}
            min={6}
            required={true}
          />
          <button>Create Account</button>
        </form>
      </main>
    </>
  );
};

export default SignUp;
