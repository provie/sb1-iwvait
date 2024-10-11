import React, { useState } from 'react';
import { Search, BookOpen, Clock, Award, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Seminar } from '../types/seminar';
import { useAuth } from '../context/AuthContext';

const seminars: Seminar[] = [
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

const SeminarCard: React.FC<{ seminar: Seminar }> = ({ seminar }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img src={seminar.image} alt={seminar.title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">{seminar.title}</h2>
      <p className="text-gray-600 mb-4">{seminar.description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
        <span className="flex items-center">
          <Clock size={16} className="mr-1" />
          {seminar.duration}
        </span>
        <span className="flex items-center">
          <BookOpen size={16} className="mr-1" />
          {seminar.level}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>{seminar.category}</span>
        <span className="flex items-center">
          <Star size={16} className="mr-1 text-yellow-400" />
          {seminar.rating.toFixed(1)}
        </span>
      </div>
      <Link
        to={seminar.id === 4 ? `/enhanced-seminar/${seminar.id}` : `/seminar/${seminar.id}`}
        className="block w-full bg-blue-600 text-white py-2 text-center rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Start Learning
      </Link>
    </div>
  </div>
);

const Seminars: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  const filteredSeminars = seminars.filter(seminar =>
    seminar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seminar.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seminar.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Available Seminars</h1>
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search seminars..."
            className="w-full p-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSeminars.map(seminar => (
          <SeminarCard key={seminar.id} seminar={seminar} />
        ))}
      </div>
      {filteredSeminars.length === 0 && (
        <p className="text-center text-gray-600 mt-6">No seminars found matching your search.</p>
      )}
    </div>
  );
};

export default Seminars;