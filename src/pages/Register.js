import { useState, useContext } from "react"
import Input from "../components/forms/Input"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import { AuthContext } from "../context/auth"
import { useNavigate } from "react-router-dom"

export default function Register(){
    // global context
    const [auth, setAuth] = useContext(AuthContext)
    //local State
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [confirm, setConfirm] = useState("")

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            if(password !== confirm){
                toast.error("Passwords do not match")
                return
            }
            const {data} = await axios.post(`${process.env.REACT_APP_API}/signup`, {name, email, password})
            if(data.error){
                toast.error(data.error)
                return
            } else {
                // Save in global context
                setAuth(data)
                // save in browser local storage
                localStorage.setItem("auth", JSON.stringify(data))
                toast.success("Succesfully Registered")
                setTimeout(()=>{
                    navigate("/")
                }, 2000)
            }
        } catch (err){
            toast.error(err)
        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Toaster/>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h1 className="fw-bold mb-3">Register</h1>
                        <form>
                            <Input value={name} setValue={setName} label="Name" type="text"/>
                            <Input value={email} setValue={setEmail} label="Email" type="email"/>
                            <Input value={password} setValue={setPassword} label="Password" type="password"/>
                            <Input value={confirm} setValue={setConfirm} label="Confirm Password" type="password"/>
                            
                            <button 
                                type="submit"
                                className="btn btn-primary"
                                onClick={handleSubmit}
                                disabled={!name || !email || !password || !confirm || password.length < 6 }
                            >
                                Submit
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}