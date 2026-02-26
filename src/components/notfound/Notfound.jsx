import { Link } from "react-router";
// import { Home } from "lucide-react";
import { Button } from '@heroui/button';

export default function Notfound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-linear-to-br from-blue-400 to-blue-600 rounded-full shadow-2xl shadow-primary/20 mb-6">
            <span className="text-6xl font-bold text-white">404</span>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="w-full sm:w-auto bg-linear-to-r from-blue-400 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all duration-200 px-6">
              {/* <Home className="w-5 h-5 mr-2" /> */}
              Go Home
            </Button>
          </Link>
          
        </div>

        
      </div>
    </div>
  )
}
