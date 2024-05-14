import React, { useEffect, useState, useCallback } from 'react';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table';
import DialogData from '../Dialog';
import DriverAddButton from './DriverAddButton';

// ヘッダータイトルの配列
const headtitles: string[] = ['차량번호', '이름', '전화번호', '편집'];

// APIから取得するドライバーデータの型を定義
interface Driver {
  Driverid: string;
  DriverName: string;
  Phonenumber: string;
  Platenumber: string;
}

// APIから返される全体のデータ構造の型を定義
interface DriversApiResponse {
  Driversdata: {
    _id: string;
    Driverdata: Driver[];
  };
}

export default function DriverDataTable() {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  // データのフェッチ関数を定義
  const fetchDrivers = useCallback(async () => {
    const response = await fetch('/api/A_drivers');
    const jsonData: DriversApiResponse = await response.json();
    setDrivers(jsonData.Driversdata.Driverdata);
  }, []);

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  // コールバック関数
  const handleSaveNotification = useCallback(() => {
    console.log('Save changes button was clicked in DialogData');
    fetchDrivers(); // データの更新
  }, [fetchDrivers]);

  // Driveridの最大値を求め、1を足す
  const newDriverId =
    drivers.reduce((maxId, driver) => Math.max(maxId, parseInt(driver.Driverid, 10)), 0) + 1;

  return (
    <>
      <div className="flex justify-end pr-3">
        <DriverAddButton onSave={handleSaveNotification} newDriverId={newDriverId.toString()} />
      </div>
      <div className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              {headtitles.map((title) => {
                const className =
                  title === '전화번호'
                    ? 'hidden md:table-cell'
                    : title === '편집'
                    ? 'text-right'
                    : '';
                return (
                  <TableHead key={title} className={className}>
                    {title}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {drivers.map((driver) => (
              <TableRow key={driver.Driverid}>
                <TableCell className="font-medium">{driver.Platenumber}</TableCell>
                <TableCell className="font-medium">{driver.DriverName}</TableCell>
                <TableCell className="hidden md:table-cell">{driver.Phonenumber}</TableCell>
                <TableCell className="text-right">
                  <DialogData
                    Driverid={driver.Driverid}
                    Platenumber={driver.Platenumber}
                    DriverName={driver.DriverName}
                    Phonenumber={driver.Phonenumber}
                    onSave={handleSaveNotification} // コールバック関数をpropsとして渡す
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
