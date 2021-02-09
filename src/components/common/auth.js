import {getToken} from '../../inc/functions';

const Auth = ({role, children}) => {
    if (role === getToken())
        return children;
    else return null;
}
export default Auth;