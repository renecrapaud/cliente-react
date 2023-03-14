import { useState, useContext } from "react"
import Input from "../components/forms/Input"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import { AuthContext } from "../context/auth"
import { useNavigate } from "react-router-dom"
import Button from "../components/forms/Button" 

export default function Login(){
    // global context
    const [auth, setAuth] = useContext(AuthContext)
    //local State
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setLoading] = useState(false)

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            setLoading(true)
            const {data} = await axios.post(`${process.env.REACT_APP_API}/signin`, {email, password})
            setLoading(false)
            if(data.error){
                toast.error(data.error)
                return
            } else {
                // Save in global context
                setAuth(data)
                // save in browser local storage
                localStorage.setItem("auth", JSON.stringify(data))
                navigate("/")
            }
        } catch (err){
            setLoading(false)
            toast.error(err)
        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Toaster/>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h1 className="fw-bold mb-3">Login</h1>
                        <form>
                            <Input value={email} setValue={setEmail} label="Email" type="email"/>
                            <Input value={password} setValue={setPassword} label="Password" type="password"/>
                            <Button handleSubmit={handleSubmit} email={email} password={password} loading={isLoading}/>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}