import { Link } from "react-router-dom";

const AuthHeader = () => {
    return ( 
        <div className="flex justify-center h-16 border-b-2 border-highlights bg-black">
            <Link to="/" className="text-highlights flex items-center px-24">logo</Link>
        </div>
     );
}
 
export default AuthHeader;