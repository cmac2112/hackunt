import Layout from "../Layout/Layout"
import React, { useState } from "react"
import { useLogin } from "../../context/LoginContext"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { login } = useLogin()
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
//for the love of god if we have time use jwt's -1000 points here
//once again screw auth0 and its cors polcies that make it impossible to use and debug
    try {
      const response = await axios.post("http://localhost:3000/register", {
        username: name,
        password: password,
      });

      if (response.status === 200) {
        login(name);
        navigate("/hackunt/home");
      }
    } catch (err) {
      setError("Registration failed");
    }finally{
      setError("Registration complete");
    }
  };

  return (
    <Layout>
      <div id="container" className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="w-full max-w-md">
          <div className="text-center text-white mb-4">Register</div>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          <form onSubmit={handleRegister}>
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
              <input
                type="password"
                placeholder="Confirm Password"
                className="border py-2 px-3 rounded"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Register