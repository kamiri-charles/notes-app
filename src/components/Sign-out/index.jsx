import { sign_out_user } from './sign_out'
import './styles.scss';

const SignOut = ({ user }) => {
    return user ?
            <div className="sign-out" onClick={() => sign_out_user(user)}>Sign Out</div>
            :
            <div className="sign-out"></div>;
}

export default SignOut;