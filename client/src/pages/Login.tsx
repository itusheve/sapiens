import { useState } from "react"
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as jose from 'jose';
import user from "../utils/user.service";



export const Login = ({ setIsAuthenticated }: any) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isValid,setIsValid]=useState<Boolean>(true);
    const navigate = useNavigate();


    const handleLogin = async (e: any) => {
        console.log(email, ' ', password);
        e.preventDefault();
        try {
            let payload = {
                email: email, password
            }
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(payload),
                credentials: "include",
                 headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                let json = await response.json();
                console.log(json.accessToken);
                
                const decodedToken = jose.decodeJwt(json.accessToken);

                setIsAuthenticated(true);
                user.setUserData(decodedToken);

                navigate('/property-list')
            } else {
                setIsAuthenticated(false);
                setIsValid(false);
                throw new Error('not authorized')

            }
        } catch (e) {
            console.log(e);
            console.log('we are in catch')
        }

    }

    return (
        <div className="login-wrapper">
       <div className="container mt-5">
      <div className="row justify-content-center">
        {!isValid && <Alert variant="danger">Invalid Credentials,please try again.</Alert>}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Login</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input type="password" className="form-control"  value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="Enter your password" />
                </div>
                <button type="submit" onClick={handleLogin} className="btn btn-primary btn-block">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    )
}

