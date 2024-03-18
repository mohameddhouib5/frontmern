import Menu from "./Components/menu"
import { Outlet, Navigate } from 'react-router-dom'
const ProtectedRoutes = () => {
let token=localStorage.getItem("CC_Token");
// console.log("token est " + token)
return(
token!=null ?<><Menu/><Outlet/></>:<Navigate to="/login"/>
)
}
export default ProtectedRoutes