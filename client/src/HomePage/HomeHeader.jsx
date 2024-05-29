import { Link } from "react-router-dom";

const HomeHeader = () => {
    return ( 
        <div className="flex flex-row h-16 border-b-2 border-highlights bg-black">
            <Link to="/" className="text-highlights w-3/5 flex items-center px-24">logo</Link>
            <div className="text-highlights w-2/5 flex gap-8 items-center justify-end px-24">
                <Link to="/log-in" className="">Log In</Link>
                <Link to="/sign-up" className="border-2 border-highlights rounded-full text-center text-black bg-highlights py-2 px-3">Sign Up</Link>
            </div>
        </div>
     );
}
 
export default HomeHeader;