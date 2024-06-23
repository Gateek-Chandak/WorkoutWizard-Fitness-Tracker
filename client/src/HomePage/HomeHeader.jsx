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
                <Link to="/log-in" className="text-purple-300 hover:scale-110 hover:cursor-pointer transition-transform duration-200">Log In</Link>
                <Link to="/sign-up" className="bg-purple-300 rounded-full text-center text-black bg-highlights p-1 px-3 hover:scale-110 hover:cursor-pointer transition-transform duration-200">Sign Up</Link>
            </div>
            <div className="bg-bg py-1 border-t border-purple-900 border-opacity-45 fixed bottom-0 text-center w-full z-50">
                <p className="block text-gray-500 text-center text-xs bg-bg">Workout wizard © 2024</p>
            </div>
        </div>
     );
}
 
export default HomeHeader;