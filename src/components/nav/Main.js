import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth";

export default function Main(){
    const [auth, setAuth] = useContext(AuthContext)

    const logout = () => {
        const auth = localStorage.getItem("auth")
        if(auth){
            localStorage.removeItem("auth")
            setAuth(null)
        }
    }

    return (
        <ul className="nav shadow mb-2 d-flex justify-content-between">
            
            { auth !== null && auth !== undefined ? (
                <>
                    <li>
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            {auth?.user?.name}
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <NavLink className="nav-link" to="/">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="nav-link" to="/login" onClick={logout}>
                                    Logout
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                        
                </>
            ) : (
                <>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/register">
                            Register
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">
                            Login
                        </NavLink>
                    </li>
                </>
            )}
        </ul>
    )
}