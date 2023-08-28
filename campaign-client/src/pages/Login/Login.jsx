import Lottie from "lottie-react";
import login_anim from "../../assets/animations/login-anim.json";
import { useAuth0 } from "@auth0/auth0-react";
import { FaArrowCircleRight } from "react-icons/fa";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold mb-5">Click here to login!</h1>
          <button
            onClick={() => loginWithRedirect()}
            className="btn btn-outline btn-wide normal-case text-xl"
          >
            <FaArrowCircleRight></FaArrowCircleRight>
          </button>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm">
          <Lottie animationData={login_anim} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default Login;
