import { useEffect } from "react";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  error: null, 
}

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_SUCCESS":
        return {
          user: action.payload,
          error: null,
        };

      case "AUTH_FAIL":
        return {
          user: null,
          error: action.payload,
        };
      
        case "AUTH_LOGOUT":
          localStorage.clear();
          return {
            user: null,
            error: null
        };

      // case "CHECK_AUTH": {
      //   return { ...state, isAuthenticated: action.payload}
        // async () => {
        //   try {
        //     const res = await axios.get("/api/v1/auth/checkAuth", {
        //       headers: {
        //         Authorization: `Bearer: ${token}`
        //       }
        //     })
        //     return true;
        //   } catch (error) {
        //     return false
        //   }
        // }
      // }

    default:
      return state;
  }
}

export const AuthContextProvider = ({ children }) => {
  const[state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user])
  return (
    <AuthContext.Provider value={{ user: state.user, error: state.error, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};