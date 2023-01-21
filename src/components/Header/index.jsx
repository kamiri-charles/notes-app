import { useEffect, useState } from 'react';
import Loader from 'react-loaders';
import './styles.scss';

const Header = () => {
    let [user, setUser] = useState(undefined);

    useEffect(() => {
        setTimeout(() => {
            let user = JSON.parse(localStorage.getItem('user'));
            setUser(user);
        }, 2000);
    }, []);

    return (
        <div className="header">
            <div className="l">
                <i className='bx bxs-dashboard bx-md'></i>
                <span className='bx-sm'>Notes</span>
            </div>
            
            <div className="r">
                {user === undefined ? <Loader type='ball-pulse' /> : (
                    <>
                        <i className='bx bx-user bx-md'></i>
                        <span>{user ? user.username : ''}</span>
                    </>
                )}
            </div>
        </div>
    )
}

export default Header;
