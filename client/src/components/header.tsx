import { Navbar } from "react-bootstrap"
import { Search } from "./search"
import { ISearchBoxProps } from "../interfaces"
import user from "../utils/user.service";
import { useNavigate } from "react-router-dom";
export const Header :  React.FC<ISearchBoxProps> = ({ onSearch }) => {
    const userData = user.getUserData();
    const navigate = useNavigate();

    const searchProperty = ({query,category}:any)=>{
        onSearch({query,category});
    }
    const handleLogout = async (e:any)=>{
        e.preventDefault();
        const results =  await (await fetch('http://localhost:3000/api/auth/logout',{credentials:'include'})).json();
        user.setUserData(null);
        navigate('/login'); 
    }
    return(
       <>
        <Navbar className="bg-body-tertiary justify-content-between">
            <div className="title"><h1>Real Estate App</h1></div>
            <Search onSearch={searchProperty} ></Search>
            <div className="user">
                <h2>Welcome, {userData.name}!</h2>
                <div>
                    <a href="#" onClick={handleLogout}>Logout</a>
                </div>
            </div>
            </Navbar>
       </>
    )

}