import { useState, FC, FormEvent} from "react";
import { useAppDispatch, useAppSelector} from "../redux/redux";
import { signUp, setToken } from "../redux/slicers/auth.slicer";

export const SignupPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const dispatch = useAppDispatch();
  const { status, token } = useAppSelector(state => state.auth);

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    const accessToken = await dispatch(signUp({ email, password, name})).unwrap();
    console.log(accessToken);
    dispatch(setToken(accessToken));
    console.log(token);
  };

  return (
    <div className="flex-col w-96 h-fit justify-center items-center bg-white border border-blue-500 rounded-md p-5">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">Sign Up</h2>
        <form onSubmit={handleSignUp} className="flex-col justify-center items-center bg-white gap-y-2 border-blue-500 mb-4">
        <div className="flex flex-row gap-2 mg mb-4">
            <label className=" text-justify justify-center basis-3xs block text-gray-700">Name</label>
            <input
              type="string"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700"
            />
          </div>
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
            {status === "loading" ? "Loading..." : "Sign Up"}
          </button>
        </form>
    </div>
  );
};
