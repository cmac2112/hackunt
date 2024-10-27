import Layout from "../Layout/Layout"
import React, { useState } from "react"
import { useLogin } from "../../context/LoginContext"
import axios from "axios";
import { useNavigate } from "react-router-dom";
//could reuse this component for register, meh
const Login = () => {
  const { login } = useLogin()
  const [name, setName] = useState("user1")
  const [password, setPassword] = useState("password1")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        username: name,
        password: password,
      });

      if (response.status === 200) {
        login(name);
        navigate("/hackunt/home");
      }
    } catch (err) {
      setError("login failed");
    }
  };

  return (
    <Layout>
      <div id="container" className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="w-full max-w-md">
          <div className="text-center text-white mb-4">Log In</div>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Username..."
                className="border py-2 px-3 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password..."
                className="border py-2 px-3 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Login;