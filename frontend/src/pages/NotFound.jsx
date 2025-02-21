import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                <p className="text-gray-700 mb-8">
                    The page you're looking for doesn't exist.
                </p>
                <Link
                    to="/login"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
                >
                    Go to Login
                </Link>
            </div>
        </div>
    );
};

export default NotFound;