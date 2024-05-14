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
import { FilePen, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// DialogData の型定義を更新
interface DialogDataProps {
  Driverid: string;
  DriverName: string;
  Phonenumber: string;
  Platenumber: string;
  onSave: () => void; // コールバック関数を受け取る
}

export default function DialogData({
  Driverid,
  Platenumber,
  DriverName,
  Phonenumber,
  onSave, // コールバック関数を受け取る
}: DialogDataProps) {
  // Refsを定義して各入力値を参照する
  const platenumberRef = useRef<HTMLInputElement>(null);
  const driverNameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  // ボタンクリック時の処理
  const ESaveChanges = () => {
    const data = {
      Driverid: Driverid,
      Platenumber: platenumberRef.current?.value,
      DriverName: driverNameRef.current?.value,
      Phonenumber: phoneNumberRef.current?.value,
    };

    const apiEndpoint = `/api/A_drivers?id=${Driverid}`; // URLにDriveridを追加

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

  // ボタンクリック時のデータ削除処理
  const datadeletion = () => {
    const deleteEndpoint = `/api/A_drivers?id=${Driverid}`;

    console.log('Deleting data for ID:', Driverid);

    fetch(deleteEndpoint, {
      method: 'DELETE', // DELETE メソッドを使用
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        onSave(); // 削除後のコールバック実行
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <FilePen className="w-4 h-4" />
          <span className="sr-only">Edit</span>
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
            <Input ref={platenumberRef} defaultValue={Platenumber} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="DriverName" className="text-right">
              이름
            </Label>
            <Input ref={driverNameRef} defaultValue={DriverName} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Phonenumber" className="text-right">
              전화번호
            </Label>
            <Input ref={phoneNumberRef} defaultValue={Phonenumber} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={datadeletion} size="icon" variant="default">
            <Trash2 className="w-4 h-4" />
            <span className="sr-only">trash</span>
          </Button>
          <DialogClose>
            <Button onClick={ESaveChanges}>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
