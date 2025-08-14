import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [islogin, setislogin] = useState(false);
    const [issignup, setissignup] = useState(false)
    const [username, setusername] = useState("")
    return (
        <AuthContext.Provider value={{ islogin, setislogin, issignup, setissignup, username, setusername }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);