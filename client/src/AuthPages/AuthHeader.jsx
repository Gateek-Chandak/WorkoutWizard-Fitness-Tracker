import { Link } from "react-router-dom";

const AuthHeader = () => {
    return ( 
        <div className="header flex justify-center h-16 border-b-2 border-highlights">
            <Link to="/" className="text-highlights flex items-center px-24">logo</Link>
        </div>
     );
}
 
export default AuthHeader;