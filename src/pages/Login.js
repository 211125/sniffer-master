import avatar from '../styles/img/laptop.png'
import PictureLogin from '../styles/img/PictureLogin.png'
import wave from '../styles/img/wave.png'
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div>
            <img className='wave' src={wave}></img>
            <div className='container'>
                <div className='img'>
                    <img src={PictureLogin}></img>
                </div>
                
                <div className='login-content'>
                    <from>
                        <img src={avatar}></img>
                        <h2 className="title">Login</h2>

                        <div class="form-group">
                            <input type="text" className="form-input " id="email" placeholder="Email" />
                            <label for="email" className="form-label">Email</label>
                        </div>
                        <div class="form-group">
                            <input type="password" className="form-input" id="password" placeholder="Password" />
                            <label for="password" className="form-label">Password</label>
                        </div>
                        <Link to="/SignUp">¿estas registrado? !registrate aqui!</Link>

                        
                        <button className="form-submit">Login</button>

                    </from>
                </div>
              
            </div>
        </div>

    )
}
export default Login;