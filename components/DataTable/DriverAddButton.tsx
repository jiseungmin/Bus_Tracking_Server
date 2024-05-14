import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

// DialogData の型定義を更新
interface DialogDataProps {
  newDriverId: string; // newDriverId を追加
  onSave: () => void; // コールバック関数を受け取る
}

// onClick を props として追加
export default function DriverAddButton({
  newDriverId,
  onSave, // コールバック関数を受け取る
}: DialogDataProps) {
  // Refsを定義して各入力値を参照する
  const platenumberRef = useRef<HTMLInputElement>(null);
  const driverNameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  // ボタンクリック時の処理
  const handleSaveChanges = () => {
    const data = {
      Driverid: newDriverId,
      Platenumber: platenumberRef.current?.value,
      DriverName: driverNameRef.current?.value,
      Phonenumber: phoneNumberRef.current?.value,
    };

    const apiEndpoint = `/api/A_drivers?id=${newDriverId}`; // URLにDriveridを追加

    console.log('Sending data:', data); // 送信するデータをコンソールに出力

    fetch(apiEndpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        onSave(); // API 呼び出し後にコールバックを実行
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        // エラー処理を行います
      });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="default"
            variant="outline"
            className="flex items-center gap-3 border-gray-200 dark:border-gray-800"
          >
            <Plus className="w-4 h-4" />
            <div>추가</div>
            <span className="sr-only">Add new Driver data</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>편집</DialogTitle>
            <DialogDescription>
              여기에서 프로필을 변경합니다. 완료했으면 저장을 클릭합니다.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Platenumber" className="text-right">
                차량번호
              </Label>
              <Input ref={platenumberRef} defaultValue={'123123'} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="DriverName" className="text-right">
                이름
              </Label>
              <Input ref={driverNameRef} defaultValue={'홍길동'} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Phonenumber" className="text-right">
                전화번호
              </Label>
              <Input ref={phoneNumberRef} defaultValue={'01012341234'} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button onClick={handleSaveChanges}>Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
