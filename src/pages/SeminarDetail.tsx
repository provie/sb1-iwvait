import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, BookOpen, Star } from 'lucide-react';
import { Seminar } from '../types/seminar';
import { useAuth } from '../context/AuthContext';

// This would typically come from an API or database
const seminars: Seminar[] = [
  // ... (same seminar data as in Seminars.tsx)
];

const SeminarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const seminar = seminars.find(s => s.id === Number(id));
  const { user, updateUserProgress } = useAuth();
  const [userRating, setUserRating] = useState<number | null>(null);

  if (!seminar) {
    return <div>Seminar not found</div>;
  }

  const handleComplete = () => {
    if (user) {
      updateUserProgress(seminar.id);
    }
  };

  const handleRating = (rating: number) => {
    setUserRating(rating);
    // Here you would typically send this rating to your backend
    console.log(`User rated seminar ${seminar.id} with ${rating} stars`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{seminar.title}</h1>
      <div className="mb-6">
        <img src={seminar.image} alt={seminar.title} className="w-full h-64 object-cover rounded-lg" />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold mb-4">About this Seminar</h2>
            <p className="text-gray-700 mb-4">{seminar.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span className="flex items-center">
                <Clock size={16} className="mr-1" />
                {seminar.duration}
              </span>
              <span className="flex items-center">
                <BookOpen size={16} className="mr-1" />
                {seminar.level}
              </span>
              <span>{seminar.category}</span>
            </div>
            <div className="flex items-center mb-4">
              <Star size={16} className="text-yellow-400 mr-1" />
              <span>{seminar.rating.toFixed(1)} ({userRating ? 'Your rating: ' + userRating : 'Not rated'})</span>
            </div>
            {!userRating && (
              <div className="mb-4">
                <p className="mb-2">Rate this seminar:</p>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    className="text-2xl text-yellow-400 focus:outline-none"
                  >
                    {star <= (userRating || 0) ? '★' : '☆'}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Video Content</h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={seminar.videoUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Your Progress</h2>
            {user ? (
              <>
                <p className="mb-4">
                  {user.completedSeminars.includes(seminar.id)
                    ? "You've completed this seminar!"
                    : "You haven't completed this seminar yet."}
                </p>
                <button
                  onClick={handleComplete}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
                  disabled={user.completedSeminars.includes(seminar.id)}
                >
                  {user.completedSeminars.includes(seminar.id) ? "Completed" : "Mark as Complete"}
                </button>
              </>
            ) : (
              <p>Please log in to track your progress.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeminarDetail;