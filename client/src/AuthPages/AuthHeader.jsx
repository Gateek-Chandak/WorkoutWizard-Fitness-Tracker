import { Link } from "react-router-dom";
import WizardImg from '../../images/wizard.png'

const AuthHeader = () => {
    return ( 
        <div className="header flex justify-center h-20 border-b-2 border-gray-700 p-2">
            <Link to='/'>
                <img src={WizardImg} alt="" className="w-16 h-16" /> 
            </Link>
        </div>
     );
}
 
export default AuthHeader;