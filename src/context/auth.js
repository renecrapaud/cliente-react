import {useState, createContext, useEffect} from 'react'

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(null)

    useEffect(()=>{
        const auth = localStorage.getItem("auth")
        if(auth){
            setAuth(JSON.parse(auth))
        }
    }, [])

    return (
        <AuthContext.Provider value = {[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}