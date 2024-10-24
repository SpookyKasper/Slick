import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const SignInWithGoogle = () => {
  const navigate = useNavigate();

  const clientId =
    "385042624628-m9bpist1q25an74bv6lav6tb663enbfd.apps.googleusercontent.com";

  const handleLoginSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    try {
      const response = await fetch(`${apiUrl}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("token", `Bearer ${data.jwt}`);
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default SignInWithGoogle;
