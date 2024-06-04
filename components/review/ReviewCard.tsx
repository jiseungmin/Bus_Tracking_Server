import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';

type ReviewType = {
  evaluation: number;
  ReviewContents: string;
  timestamps: string;
};

type ReviewCardProps = {
  review: ReviewType;
};

export default function ReviewCard({ review }: ReviewCardProps) {
  const { evaluation, ReviewContents, timestamps } = review;

  return (
    <div>
      <Card>
        {/* <CardHeader>
            <CardTitle>평가: {evaluation} ★</CardTitle>
          </CardHeader> */}
        <CardContent>
          <div className="mt-7">{ReviewContents}</div>
          <p>작성 시간: {timestamps ? new Date(timestamps).toLocaleString() : 'N/A'}</p>
          {/* <CardDescription>{ReviewContents}</CardDescription> */}
        </CardContent>
        {/* <CardFooter>
          <p>작성 시간: {timestamps ? new Date(timestamps).toLocaleString() : 'N/A'}</p>
        </CardFooter> */}
      </Card>
    </div>
  );
}
