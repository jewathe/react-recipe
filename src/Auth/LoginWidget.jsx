import {Redirect} from 'react-router-dom';
import {useOktaAuth} from '@okta/okta-react';
import { SpinnerLoading } from '../Utils/SpinnerLoading';
import OktaSignInWidget from './OktaSigninWidget';

const LoginWidget=({config})=>{

    const {oktaAuth,authState}=useOktaAuth();
    const onSuccess=(tokens)=>{
        oktaAuth.handleLoginRedirect(tokens);
    };

    const onError=(error)=>{
        console.log('Sign in error: ', error);
    }

    if(!authState){
        return(
            <SpinnerLoading/>
        );
    }

    return authState.isAuthenticated ?
    <Redirect to={{pathname:'/'}}/>
    :
   <OktaSignInWidget confi={config} onSuccess={onSuccess} onError={onError} />;
};

export default LoginWidget;