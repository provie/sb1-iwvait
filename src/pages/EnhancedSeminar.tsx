import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, PlayCircle, PauseCircle, CheckCircle } from 'lucide-react';

interface Slide {
  type: 'text' | 'video' | 'quiz';
  content: string | string[];
  videoUrl?: string;
}

const testSeminar = {
  id: 'cybersecurity-101',
  title: 'Cybersecurity 101: Protecting Your Digital Life',
  slides: [
    {
      type: 'text',
      content: 'Welcome to Cybersecurity 101! In this seminar, you\'ll learn the basics of protecting yourself online.'
    },
    {
      type: 'text',
      content: 'Lesson 1: Understanding Cyber Threats\n\n• Phishing\n• Malware\n• Social Engineering\n• Data Breaches'
    },
    {
      type: 'video',
      content: 'Watch this video to learn more about common cyber threats.',
      videoUrl: 'https://www.youtube.com/embed/inWWhr5tnEA'
    },
    {
      type: 'text',
      content: 'Lesson 2: Creating Strong Passwords\n\n• Use a mix of characters\n• Avoid personal information\n• Use a unique password for each account\n• Consider using a password manager'
    },
    {
      type: 'quiz',
      content: [
        'Which of the following is NOT a good practice for creating strong passwords?',
        'A) Using a mix of uppercase and lowercase letters',
        'B) Including numbers and special characters',
        'C) Using the same password for multiple accounts',
        'D) Making the password at least 12 characters long'
      ]
    },
    {
      type: 'text',
      content: 'Lesson 3: Two-Factor Authentication (2FA)\n\n• What is 2FA?\n• Types of 2FA\n• Why use 2FA?\n• Setting up 2FA on your accounts'
    },
    {
      type: 'video',
      content: 'Watch this video to see how to set up 2FA on popular platforms.',
      videoUrl: 'https://www.youtube.com/embed/ZXFYT-BG2So'
    },
    {
      type: 'text',
      content: 'Congratulations! You\'ve completed the Cybersecurity 101 seminar. Remember to apply these practices in your daily digital life.'
    }
  ]
};

const EnhancedSeminar: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);

  // In a real application, you'd fetch the seminar data based on the id
  const seminar = testSeminar;

  const handlePrevSlide = () => {
    setCurrentSlide(Math.max(0, currentSlide - 1));
    setQuizAnswer(null);
  };

  const handleNextSlide = () => {
    setCurrentSlide(Math.min(seminar.slides.length - 1, currentSlide + 1));
    setQuizAnswer(null);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleQuizAnswer = (answer: string) => {
    setQuizAnswer(answer);
  };

  const renderSlide = (slide: Slide) => {
    switch (slide.type) {
      case 'text':
        return <div className="whitespace-pre-wrap">{slide.content}</div>;
      case 'video':
        return (
          <div>
            <p className="mb-4">{slide.content}</p>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={slide.videoUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        );
      case 'quiz':
        return (
          <div>
            <p className="font-bold mb-4">{slide.content[0]}</p>
            {(slide.content as string[]).slice(1).map((option, index) => (
              <button
                key={index}
                onClick={() => handleQuizAnswer(option)}
                className={`block w-full text-left p-2 mb-2 rounded ${
                  quizAnswer === option ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
            {quizAnswer && (
              <p className="mt-4 font-bold text-green-600">
                Thank you for your answer! In a real quiz, we'd provide feedback here.
              </p>
            )}
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{seminar.title}</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          {renderSlide(seminar.slides[currentSlide])}
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevSlide}
            disabled={currentSlide === 0}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            <ChevronLeft size={20} className="mr-2" />
            Previous
          </button>
          {seminar.slides[currentSlide].type === 'video' && (
            <button onClick={togglePlayPause} className="text-blue-500">
              {isPlaying ? (
                <PauseCircle size={32} />
              ) : (
                <PlayCircle size={32} />
              )}
            </button>
          )}
          <button
            onClick={handleNextSlide}
            disabled={currentSlide === seminar.slides.length - 1}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Next
            <ChevronRight size={20} className="ml-2" />
          </button>
        </div>
      </div>
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Your Progress</h2>
        <div className="flex items-center">
          <div className="flex-grow bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${((currentSlide + 1) / seminar.slides.length) * 100}%` }}
            ></div>
          </div>
          <span className="ml-4 font-bold">
            {Math.round(((currentSlide + 1) / seminar.slides.length) * 100)}%
          </span>
        </div>
        <div className="mt-4 flex justify-between">
          {seminar.slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentSlide ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {index < currentSlide ? (
                <CheckCircle size={16} />
              ) : (
                index + 1
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedSeminar;