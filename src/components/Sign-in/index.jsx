import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { sign_in_user } from './sign_in'
import Header from '../Header'
import './styles.scss'


const SignIn = () => {
    let error_div = useRef();
    let nav = useNavigate();

    let [user, setUser] = useState({
        username: "",
        password: ""
    })


    useEffect(() => {
        if (localStorage.getItem('user')) {
            nav('/')
        }
    })

    return (
        <div className='sign-in component'>
            <form>
                <span className="title">Sign in to your account.</span>

                <input
                    type='text'
                    placeholder='Username'
                    value={user.username}
                    onChange={e => setUser({...user, username: e.target.value})}
                />

                <input
                    type='password'
                    placeholder='Password'
                    value={user.password}
                    onChange={e => setUser({...user, password: e.target.value})}
                />

                <div className="errors" ref={error_div}></div>

                <button
                    type='submit'
                    onClick={e => {
                        e.preventDefault();
                        sign_in_user(user, error_div, nav);
                    }}>
                    Sign in
                </button>

                <div className="form-footer">
                    <span>Don't have an account?</span>
                    <Link to='/sign-up'>Create account.</Link>
                </div>
            </form>
        </div>
    )
}
export default SignIn;