import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { sign_up_user } from './sign_up'
import { ProgressBar } from 'react-loader-spinner'
import './styles.scss'


const SignUp = () => {
    let error_div = useRef();
    let nav = useNavigate();
    const[loading, setLoading] = useState(false);

    let [user, setUser] = useState({
        username: "",
        password: "",
        password2: ""
    })

    const handleSignUp = (e) => {
        e.preventDefault();
        setLoading(true);
        sign_up_user(user, error_div, nav, setLoading);
    }

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
                    onClick={handleSignUp}>
                    {loading ? (
                        <ProgressBar
                            ariaLabel="progress-bar-loading"
                            wrapperStyle={{ height: '50px',
                                            width: '100px',
                                            position: 'absolute',
                                            top: '-5px',
                                            left: '45px'
                                          }}
                            wrapperClass="progress-bar-wrapper"
                            borderColor = '#FFFFFF'
                            barColor = '#673AB7'
                        />
                    ) :  (
                        'Create account'
                    )}
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