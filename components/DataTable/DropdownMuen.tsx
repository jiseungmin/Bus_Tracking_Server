import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Plus } from 'lucide-react';
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from '@/components/ui/menubar';

// 全体動的に変更
const MENU_ITEMS1: Record<string, string[]> = {
  평일: ['천안역', '아산(KTX)역', '천안터미널', '온양역/터미널', '천안캠퍼스'],
  '토요일/공휴일': ['천안역/아산(KTX)역', '천안터미널'],
  일요일: ['천안역/아산(KTX)역', '천안터미널'],
};

const MENU_ITEMS2: Record<string, string[]> = {
  평일: ['천안역/아산(KTX)역', '천안터미널', '온양터미널/온양역'],
  토요일: ['천안역/아산(KTX)역', '천안터미널'],
  일요일: ['천안역/아산(KTX)역', '천안터미널'],
};

// DropdownMuen コンポーネントの props タイプ定義
type DropdownMuenProps = {
  addNewSchedule: () => void; // この関数の正確な型に応じて調整してください
  onMenuChange: (menu: string, item: string) => void;
  selectedMenu: string; // 追加
  selectedItem: string; // 追加
  periodMenu: '학기' | '방학' | null; // 親コンポーネントから受け取る
  setPeriodMenu: (newPeriod: '학기' | '방학' | null) => void;
  onPeriodChange: (newPeriod: '학기' | '방학' | null) => void; // 親コンポーネントから受け取る状態更新関数
};

const DropdownMuen: React.FC<
  DropdownMuenProps & { onMenuChange: (menu: string, item: string) => void }
> = ({ addNewSchedule, onMenuChange, periodMenu, onPeriodChange,setPeriodMenu }) => {
  // const [PeriodMenu, setPeriodMenu] = useState<'학기' | '방학' | null>('학기');
  const [selectedItem, setSelectedItem] = useState<{ menu: string | null; item: string | null }>({
    menu: '평일',
    item: '천안역',
  });

  const [currentMenuItems, setCurrentMenuItems] = useState(MENU_ITEMS1);

  useEffect(() => {
    // selectedMenuの変更に応じてメニュー項目を切り替える
    if (periodMenu === '방학') {
      setCurrentMenuItems(MENU_ITEMS2);
    } else {
      setCurrentMenuItems(MENU_ITEMS1);
    }
  }, [periodMenu]); // selectedMenuが変更されるたびに実行

  // PeriodMenuの変更を扱うトリガー関数を修正
  const handlePeriodMenuClick = (newPeriod: '학기' | '방학') => {
    onPeriodChange(newPeriod); // 親コンポーネントの関数を呼び出す
  };

  // 選択状態を更新する関数
  const handleSelectionChange = (menu: string, item: string) => {
    setSelectedItem({ menu, item });
    onMenuChange(menu, item); // 親コンポーネントの状態更新関数を呼び出す
  };

  return (
    <>
      <div className=" flex  mr-auto">
        <div className="mr-4">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger
                onClick={() => {
                  setPeriodMenu('학기');
                  setSelectedItem({ menu: '평일', item: '천안역' }); // デフォルトのアイテムを設定
                  onMenuChange('평일', '천안역'); // 親コンポーネントに通知
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      visibility: periodMenu === '학기' ? 'visible' : 'hidden',
                    }}
                  >
                    <Check className="mr-2 h-4 w-4" />
                  </div>
                  학기
                </div>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                onClick={() => {
                  setPeriodMenu('방학');
                  setSelectedItem({ menu: '평일', item: '천안역/아산(KTX)역' }); // デフォルトのアイテムを設定
                  onMenuChange('평일', '천안역/아산(KTX)역'); // 방학が選択された時に親コンポーネントに通知
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      visibility: periodMenu === '방학' ? 'visible' : 'hidden',
                    }}
                  >
                    <Check className="mr-2 h-4 w-4" />
                  </div>
                  방학
                </div>
              </MenubarTrigger>
            </MenubarMenu>
          </Menubar>
        </div>
        <div>
          <Menubar>
            {Object.entries(currentMenuItems).map(([menuTitle, items]) => (
              <MenubarMenu key={menuTitle}>
                <MenubarTrigger>{menuTitle}</MenubarTrigger>
                <MenubarContent>
                  <MenubarRadioGroup
                    value={
                      selectedItem.item && selectedItem.menu === menuTitle ? selectedItem.item : ''
                    }
                  >
                    {items.map((item) => (
                      <MenubarRadioItem
                        className={`MenubarRadioItem inset ${
                          selectedItem.item === item && selectedItem.menu === menuTitle
                            ? 'selected'
                            : ''
                        }`}
                        key={item}
                        value={item}
                        onClick={() => handleSelectionChange(menuTitle, item)}
                      >
                        {item}
                      </MenubarRadioItem>
                    ))}
                  </MenubarRadioGroup>
                </MenubarContent>
              </MenubarMenu>
            ))}
          </Menubar>
        </div>
      </div>
      <div className="pl-3">
        <Button
          onClick={addNewSchedule}
          size="icon"
          className="rounded-full border-gray-200 w-8 h-8 dark:border-gray-800"
        >
          <Plus className="w-4 h-4" />
          <span className="sr-only">Add new schedule</span>
        </Button>
      </div>
    </>
  );
};

export default DropdownMuen;
