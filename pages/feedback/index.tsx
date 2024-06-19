import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ReviewCard from '@/components/review/ReviewCard';
import React, { useEffect, useState } from 'react';
import { ReviewType } from '@/types/Review';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch('/api/Feedback/feedback');
        const data = await response.json();
        setReviews(data);
        
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }

    fetchReviews();
  }, []);

  const downloadCSV = () => {
    setLoading(true);
  
    const headers = ['Email', 'UserType', 'Content', 'Timestamp'];
    const csvContent = [
      headers.join(','),
      ...reviews.map((review) => {
        const date = new Date(review.createdAt);
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
        return [review.email, review.userType, review.content, formattedDate].join(',');
      })
    ].join('\n');
  
    const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Feedback.csv';
    link.click();
    setLoading(false);
  };

  return (
    <div>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="flex flex-col">
          {/* Header */}
          <Header />
          {/* mainContent */}
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex justify-end">
              {loading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button onClick={downloadCSV}>
                  <Download className="mr-2 h-4 w-4" />
                  csv파일 다운로드
                </Button>
              )}
            </div>
            <div className="space-y-4">
              {reviews.map((review) => (
                <ReviewCard key={review.email} review={review} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
