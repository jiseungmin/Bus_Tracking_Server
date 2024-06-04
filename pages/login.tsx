// pages/login.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';

export default function LoginForm() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { userId, password });
      if (response.data.success) {
        // 유저 정보를 저장
        localStorage.setItem('user', JSON.stringify({ userId }));
        setMessage('로그인 성공!');
        // 홈 페이지로 이동
        router.push('/home');
      } else {
        setMessage('잘못된 자격 증명');
      }
    } catch (error) {
      setMessage('로그인 중 오류 발생');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <CardDescription>로그인 정보를 입력하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="userId">사용자 ID</Label>
                <Input
                  id="userId"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="사용자 ID를 입력하세요"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                />
              </div>
            </div>
          </form>
          {message && <p>{message}</p>}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              setUserId('');
              setPassword('');
              setMessage('');
            }}
          >
            취소
          </Button>
          <Button onClick={handleLogin}>로그인</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
