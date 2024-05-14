import type { NextApiRequest, NextApiResponse } from 'next';
import DbConnect from '@/database/dbconnect';
import Driver from '@/database/models/drivers/M_driver';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await DbConnect();

  if (req.method === 'GET') {
    const data = await Driver.findById('6639ff46bf551bb39009e4fe');
    if (!data) {
      return res.status(404).json({ error: 'Bus data not found' });
    }
    res.status(200).json({ Driversdata: data });
  } else if (req.method === 'PUT') {
    const updatedId = req.body.Driverid;
    console.log('Received ID:', updatedId);
    const updatedData = req.body;
    console.log('Received data:', updatedData);

    try {
      const data = await Driver.findById('6639ff46bf551bb39009e4fe');
      console.log('Found data:', data);
      if (!data) {
        return res.status(404).json({ error: 'Driver not found' });
      }

      const driverIndex = updatedId - 1;
      console.log('Found driver index:', driverIndex);

      // インデックスが範囲外の場合新しいドライバーデータを追加、範囲内の場合は更新
      if (driverIndex < 0 || driverIndex >= data.Driverdata.length) {
        data.Driverdata.push(updatedData); // 新しいドライバーデータを追加
        console.log('Added new driver:', updatedData);
      } else {
        data.Driverdata[driverIndex] = updatedData; // 既存のドライバーデータを更新
        console.log('Updated driver:', data.Driverdata[driverIndex]);
      }

      // 更新対象のオブジェクトに新しいデータを代入
      data.Driverdata[driverIndex] = updatedData;

      await data.save();
      console.log('Updated driver:', data);
      res.status(200).json(data);
    } catch (error: any) {
      console.error('Update failed:', error);
      res.status(500).json({ error: 'Failed to update data', details: error.message });
    }
  } else if (req.method === 'DELETE') {
    const deleteId = req.query.id as string;

    if (!deleteId) {
      return res.status(400).json({ error: 'Driver ID is required' });
    }

    console.log('Received ID for deletion:', deleteId);

    try {
      const data = await Driver.findById('6639ff46bf551bb39009e4fe');
      console.log('Found data:', data);
      if (!data) {
        return res.status(404).json({ error: 'Driver not found' });
      }

      // Driveridを使って直接要素を検索し、その要素を削除
      const driverToRemove = data.Driverdata.find((driver: any) => driver.Driverid === deleteId);
      if (!driverToRemove) {
        return res.status(404).json({ error: 'Driver not found in Driverdata' });
      }

      // 要素を配列から削除
      data.Driverdata = data.Driverdata.filter((driver: any) => driver.Driverid !== deleteId);
      console.log('Deleted driver:', driverToRemove);

      // Driveridを更新して連番にする
      data.Driverdata.forEach((driver: any, index: any) => {
        driver.Driverid = String(index + 1); // 1から開始する新しいIDを割り当て
      });

      await data.save();
      console.log('savedata: ', data);
      res.status(200).json({ message: 'Driver deleted successfully' });
    } catch (error: any) {
      console.error('Deletion failed:', error);
      res.status(500).json({ error: 'Failed to delete data', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
