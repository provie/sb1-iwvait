export interface Seminar {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
  category: string;
  rating: number;
  videoUrl: string;
}