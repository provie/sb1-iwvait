import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, CheckCircle } from 'lucide-react'
import Quiz from '../components/Quiz'
import { useAuth } from '../context/AuthContext'
import { Seminar } from '../types/seminar'

// This would typically come from an API or database
const allSeminars: Seminar[] = [
  {
    id: 1,
    title: "Introduction to Cybersecurity",
    description: "Learn the basics of cybersecurity and how to protect yourself online.",
    duration: "2 hours",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    category: "Fundamentals",
    rating: 4.5,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 2,
    title: "Advanced Threat Detection",
    description: "Discover advanced techniques for identifying and mitigating cyber threats.",
    duration: "3 hours",
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    category: "Security Operations",
    rating: 4.8,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 3,
    title: "Secure Coding Practices",
    description: "Learn how to write secure code and prevent common vulnerabilities.",
    duration: "2.5 hours",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    category: "Application Security",
    rating: 4.2,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 4,
    title: "Cybersecurity 101: Protecting Your Digital Life",
    description: "A comprehensive introduction to cybersecurity with interactive elements.",
    duration: "1.5 hours",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1496096265110-f83ad7f96608?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    category: "Personal Security",
    rating: 4.9,
    videoUrl: "https://www.youtube.com/embed/inWWhr5tnEA"
  },
];

const Dashboard: React.FC = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const { user } = useAuth();

  const completedSeminars = allSeminars.filter(seminar => user?.completedSeminars.includes(seminar.id));
  const inProgressSeminars = allSeminars.filter(seminar => !user?.completedSeminars.includes(seminar.id));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="mb-4">Welcome to your dashboard. Here you can view your progress and access training materials.</p>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Your Progress</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <p>Completed Seminars: {completedSeminars.length}/{allSeminars.length}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{width: `${(completedSeminars.length / allSeminars.length) * 100}%`}}
            ></div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Seminars Overview</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2 flex items-center">
              <CheckCircle className="mr-2 text-green-500" />
              Completed Seminars
            </h3>
            {completedSeminars.length > 0 ? (
              <ul className="space-y-2">
                {completedSeminars.map(seminar => (
                  <li key={seminar.id} className="flex items-center">
                    <BookOpen className="mr-2 text-blue-500" />
                    <Link to={`/seminar/${seminar.id}`} className="text-blue-600 hover:underline">
                      {seminar.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>You haven't completed any seminars yet.</p>
            )}
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2 flex items-center">
              <BookOpen className="mr-2 text-blue-500" />
              Seminars in Progress
            </h3>
            {inProgressSeminars.length > 0 ? (
              <ul className="space-y-2">
                {inProgressSeminars.map(seminar => (
                  <li key={seminar.id} className="flex items-center">
                    <BookOpen className="mr-2 text-gray-500" />
                    <Link to={`/seminar/${seminar.id}`} className="text-blue-600 hover:underline">
                      {seminar.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>You've completed all available seminars!</p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Quick Quiz</h2>
        {showQuiz ? (
          <Quiz />
        ) : (
          <button
            onClick={() => setShowQuiz(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Start Quiz
          </button>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-2">Recommended Training</h2>
        <ul className="list-disc list-inside">
          <li>Advanced Phishing Prevention</li>
          <li>Secure Password Management</li>
          <li>Data Privacy in the Workplace</li>
        </ul>
      </div>
    </div>
  )
}

export default Dashboard