import { useState, FC, FormEvent} from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector} from "../redux/redux";
import { login, setToken } from "../redux/slicers/auth.slicer";

export const LoginPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, token } = useAppSelector(state => state.auth);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const accessToken = await dispatch(login({ email, password })).unwrap();
    dispatch(setToken(accessToken));
    navigate("/lists");
    console.log(token);
  };

  return (
    <div className="flex-col w-96 h-fit justify-center items-center bg-white border border-blue-500 rounded-md p-5">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">Login</h2>
        <form onSubmit={handleLogin} className="flex-col justify-center items-center bg-white gap-y-2 border-blue-500 mb-4">
          <div className="flex flex-row gap-2 mg mb-4">
            <label className=" text-justify justify-center basis-3xs block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700"
            />
          </div>
          <div className="flex flex-row gap-2 mg mb-4">
            <label className=" text-justify justify-center basis-3xs block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700"
            />
          </div>
          <button type="submit" className=" basis-3xs w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600" disabled={status === "loading"}>
            {status === "loading" ? "Loading..." : "Login"}
          </button>
        </form>
        <button type="submit" className=" basis-3xs w-full border border-gray-100 bg-white-500 text-gray-700 py-2 rounded-lg hover:border-blue-500 " disabled={status === "loading"} onClick={() => navigate("/signup")}>
            Sign Up
          </button>
    </div>
  );
};
