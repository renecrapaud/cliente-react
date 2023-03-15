import { useState } from "react"
import Input from "../components/forms/Input"
import toast from "react-hot-toast"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Button from "../components/forms/Button"

export default function ForgotPassword(){
    //local State
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [resetCode, setResetCode] = useState("")
    const [visible, setVisible] = useState("")

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            setLoading(true)
            const {data} = await axios.post(`${process.env.REACT_APP_API}/forgot-password`, { email})
            setLoading(false)
            console.log(data)
            if(data.error){
                toast.error(data.error)
                return
            } else {
                // save in browser local storage
                // localStorage.setItem("auth", JSON.stringify(data))
                setVisible(true)
                toast.success("Enter the code you received by email")
            }
        } catch (err){
            toast.error(err)
        }
    }
    const handleReset = async (e) => {
        e.preventDefault()
        try{
            if(password !== confirm){
                toast.error("Passwords do not match")
                return
            }
            setLoading(true)
            const {data} = await axios.post(`${process.env.REACT_APP_API}/reset-password`, { email, password, resetCode})
            if(data.error){
                toast.error(data.error)
                return
            } else {
                toast.success("Password successfully changed. You can now use the new password.")
                setTimeout(()=>{
                    navigate("/login")
                }, 2000)
            }
        } catch (err) {
            console.log(err)
            toast.error("Something went wrong. Try again")
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h1 className="fw-bold mb-3">Recover password</h1>
                        <form>
                            <Input value={email} setValue={setEmail} label="Email" type="email"/>
                            {visible && 
                                <>
                                    <Input value={resetCode} setValue={setResetCode} label="Enter reset code" type="text"/>
                                    <Input value={password} setValue={setPassword} label="New password" type="password"/>
                                    <Input value={confirm} setValue={setConfirm} label="Confirm new password" type="password"/>
                                </>
                            }
                            <Button handleSubmit={visible ? handleReset : handleSubmit} email={email} password={password} loading={isLoading} />
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}