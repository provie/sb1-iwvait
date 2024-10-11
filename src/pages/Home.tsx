import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, Users, Award } from 'lucide-react'

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to CyberGuard Training</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Shield size={48} />}
          title="Comprehensive Training"
          description="Engaging and interactive cyber security awareness training delivered through various rich media formats."
        />
        <FeatureCard
          icon={<Users size={48} />}
          title="Community-Driven"
          description="Join a community of like-minded professionals committed to enhancing cyber security awareness."
        />
        <FeatureCard
          icon={<Award size={48} />}
          title="Track Progress"
          description="Monitor your learning journey with quizzes, knowledge checks, and a personalized dashboard."
        />
      </div>
      <div className="text-center mt-12">
        <Link to="/register" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300">
          Get Started
        </Link>
      </div>
    </div>
  )
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="text-blue-600 mb-4 flex justify-center">{icon}</div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

export default Home