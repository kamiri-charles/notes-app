import { useEffect, useState } from 'react';
import Loader from 'react-loaders';
import SignOut from '../Sign-out'
import './styles.scss';

const useLocalStorage = (key) => {
    const [value, setValue] = useState(null);

    useEffect(() => {
      const updateValue = (event) => {
        if (event.key === null) {
          // localStorage was cleared, null-out the value
          setValue(null);
        } else if (event.key === key) {
          // the value we're watching changed. Update it.
          setValue(JSON.parse(event.newValue).username || null);
        }
      }
      // User already exists in local storage
      let user = JSON.parse(localStorage.getItem('user'))?.username;
      if (user) {
        setValue(user);
      }

      // Register and clean-up event handler to listen to localstorage updates
      window.addEventListener('storage', updateValue, false);
      return () => {
        window.removeEventListener('storage', updateValue, false);
      }
    }, [key]);

    return value
  }

const Header = () => {
    const user = useLocalStorage('user');
    const [signOut, setSignOut] = useState(false);

    return (
        <div className="header">
            <div className="l">
                <i className='bx bxs-dashboard bx-md'></i>
                <span className='bx-sm'>Notes</span>
            </div>

            <div className="r"
                 onClick={() => localStorage.removeItem('user')}
                 onMouseEnter={() => setSignOut(true)}
                 onMouseLeave={() => setSignOut(false)}>
                {user === undefined ? <Loader type='ball-pulse' /> : (
                    <>
                        <i className='bx bx-user bx-md'></i>
                        <span>{user}</span>
                    </>
                )}
                {signOut ? <SignOut user={user} /> : null}
            </div>
        </div>
    )
}

export default Header;