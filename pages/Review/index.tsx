import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ReviewCard from '@/components/review/ReviewCard';
import React, { useEffect, useState } from 'react';

type ReviewType = {
  _id: string;
  evaluation: number;
  ReviewContents: string;
  timestamps: string;
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch('/api/Review/A_userReviews');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }

    fetchReviews();
  }, []);

  return (
    <div>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="flex flex-col">
          {/* Header */}
          <Header />
          {/* mainContent */}
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="space-y-4"> {/* ここにギャップのスタイルを追加 */}
              {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
