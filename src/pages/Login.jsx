import Navbar from "../components/Navbar";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await signInWithPopup(auth, provider);
    const { displayName, photoURL, uid } = result.user;
    const user = {
      userName: displayName,
      userImg: photoURL,
      userID: uid,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(user));
    navigate("/expense-tracker");
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      if (user) {
        navigate("/expense-tracker");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <p className="w-max m-auto mt-24 text-3xl animate-pulse text-center font-extrabold">
        Loading.. <br /> Please wait
      </p>
    );
  }

  return (
    <main>
      <Navbar />
      <form
        onSubmit={handleLogin}
        className="flex items-center justify-center h-[calc(100vh-74px)]"
      >
        <button
          className="bg-[#222] text-white rounded-3xl text-3xl py-2 px-6 flex items-center gap-2 transition-all duration-300 hover:bg-gray-700 max-[330px]:text-2xl"
          type="submit"
        >
          <span>
            <FcGoogle />
          </span>
          Login with Google
        </button>
      </form>
    </main>
  );
};

export default Login;
