import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { sign_up_user } from './sign_up'
import './styles.scss'


const SignUp = () => {
    let error_div = useRef();
    let nav = useNavigate();

    let [user, setUser] = useState({
        username: "",
        password: "",
        password2: ""
    })

    return (
        <div className='sign-up component'>
            <form>
                <span className="title">Create an account.</span>

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

                <input
                    type='password'
                    placeholder='Re-enter the password'
                    value={user.password2}
                    onChange={e => setUser({...user, password2: e.target.value})}
                />

                <div className="errors" ref={error_div}></div>

                <button
                    type='submit'
                    onClick={e => {
                        e.preventDefault();
                        sign_up_user(user, error_div, nav);
                    }}>
                    Create account
                </button>

                <div className="form-footer">
                    <span>Already have an account?</span>
                    <Link to='/sign-in'>Log in.</Link>
                </div>
            </form>
        </div>
    )
}
export default SignUp;