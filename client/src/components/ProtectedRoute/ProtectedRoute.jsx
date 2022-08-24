import { Navigate } from "react-router-dom"

// children is anything nested under the route
const ProtectedRoute = ({ user, children}) => {
  if (user) {
    return children
  } else if (user === null) {
    // user is null
    return <p>loading...</p>
  } else {
    return <Navigate to="/login" />
    
  }
  
}

export default ProtectedRoute