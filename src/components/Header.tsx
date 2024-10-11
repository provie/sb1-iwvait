import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, LogOut, BookOpen } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Shield size={32} />
          <span className="text-xl font-bold">CyberGuard Training</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            {isAuthenticated ? (
              <>
                <li><Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link></li>
                <li><Link to="/training" className="hover:text-blue-200">Training</Link></li>
                <li><Link to="/seminars" className="hover:text-blue-200 flex items-center"><BookOpen size={18} className="mr-1" />Seminars</Link></li>
                <li>
                  <button onClick={logout} className="hover:text-blue-200 flex items-center">
                    <LogOut size={18} className="mr-1" />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="hover:text-blue-200">Login</Link></li>
                <li><Link to="/register" className="hover:text-blue-200">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header