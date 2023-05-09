import React,{useContext,useEffect,useState} from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

const AuthContext = React.createContext();
// Creating AuthContext and passing into the useContext hook , Once we call the useAuth function we get access to AuthContext 
export const useAuth = () => useContext(AuthContext);
// children renders all the JSX that we pass into AuthProvider 
export const AuthProvider = ({children}) => {
    const [loading,setLoading] = useState(true);
    const [user,setUser] = useState(null); 
    const history = useHistory();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            // When the user loggedIn then routes to chats
            setUser(user);
            setLoading(false);
            // If then we have user then only chats
            if(user)
            history.push('/chats')
        })
    },[user,history]); // When the dependency Array or list ([user,history]) changes ,then the whole useEffect will be re-called.

    const value = {user};

    return(
        <AuthContext.Provider value={value}>
            {/* If not loading then show the children */}
                {!loading && children}  
        </AuthContext.Provider>
    )
}