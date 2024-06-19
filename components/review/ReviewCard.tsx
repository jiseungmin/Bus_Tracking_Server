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
  email: string;
  userType: string;
  content: string;
  expireAt: Date;
  createdAt: Date;
};

type ReviewCardProps = {
  review: ReviewType;
};

export default function ReviewCard({ review }: ReviewCardProps) {
  const { email, userType, content, expireAt, createdAt } = review;

  return (
    <div className="max-w-6xl mx-auto my-4">
      <Card className="shadow-lg rounded-lg border border-gray-500">
        <CardHeader className="bg-blue-500 text-white p-4 rounded-t-lg">
          <CardTitle>피드백 정보</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-gray-700 mb-2">
            <span className="font-semibold">유저 이메일:</span> {email}
          </div>
          <div className="text-gray-700 mb-2">
            <span className="font-semibold">유저 타입:</span> {userType}
          </div>
          <div className="text-gray-700 mb-2">
            <span className="font-semibold">작성 시간:</span> {createdAt ? new Date(createdAt).toLocaleString() : 'N/A'}
          </div>
          <div className="text-gray-700 mt-5">
            <span className="font-semibold">작성 내용:</span> {content}
          </div>
        </CardContent>
        <CardFooter className="bg-gray-100 p-4 rounded-b-lg">
          <p className="text-sm text-gray-500">이 피드백은 {expireAt ? new Date(expireAt).toLocaleString() : 'N/A'}에 삭제 예정입니다.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
