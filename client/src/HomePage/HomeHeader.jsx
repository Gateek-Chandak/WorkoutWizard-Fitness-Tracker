import { Link } from "react-router-dom";
import WizardImg from '../../images/wizard.png'

const HomeHeader = () => {
    return ( 
        <div className="header flex flex-row h-20 border-b-2 border-gray-700 bg-bg text-white">
            <Link to='/' className="w-3/5 flex flex-row p-3 px-24">
                <img src={WizardImg} alt="" className="w-14 h-14" /> 
                <h1 className="text-purple-300 m-2 mt-4">Workout Wizard</h1>
            </Link>
            <div className="text-white w-2/5 flex gap-8 items-center justify-end px-24">
                <Link to="/log-in" className="hover:scale-110 hover:cursor-pointer transition-transform duration-200">Log In</Link>
                <Link to="/sign-up" className="bg-white rounded-full text-center text-bg bg-highlights p-1 px-3 hover:scale-110 hover:cursor-pointer transition-transform duration-200">Sign Up</Link>
            </div>
        </div>
     );
}
 
export default HomeHeader;