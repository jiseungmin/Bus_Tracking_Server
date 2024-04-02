import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Dot, Plus } from 'lucide-react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { MenubarItemIndicator } from '@radix-ui/react-menubar';

// DropdownMuen コンポーネントの props タイプ定義
type DropdownMuenProps = {
  addNewSchedule: () => void; // この関数の正確な型に応じて調整してください
};

const DropdownMuen: React.FC<DropdownMuenProps> = ({ addNewSchedule }) => {
  // useStateのデフォルト値を設定する代わりに、
  // useEffect内でlocalStorageから値を読み込む
  const [selectedMenu, setSelectedMenu] = useState<'학기' | '방학' | null>(null);

  useEffect(() => {
    // ローカルストレージから選択されたメニューを読み込む
    // クライアントサイドでのみ実行されることを保証
    const storedSelection =
      typeof window !== 'undefined' ? localStorage.getItem('selectedMenu') : null;

    // storedSelectionが '학기' または '방학' の場合のみ、状態を更新
    if (storedSelection === '학기' || storedSelection === '방학') {
      setSelectedMenu(storedSelection);
    } else {
      // ローカルストレージに有効な値がない場合は、デフォルトで '학기' を選択
      setSelectedMenu('학기');
    }
  }, []);

  useEffect(() => {
    // selectedMenuが null でない場合に限り、localStorageに保存
    if (selectedMenu) {
      localStorage.setItem('selectedMenu', selectedMenu);
    }
  }, [selectedMenu]);
  // -----------------------------中身-------------------------------------
  // テスト
  const RADIO_ITEMS = ['Andy', 'Benoît', 'Luis'];
  const [radioSelection, setRadioSelection] = React.useState(RADIO_ITEMS[0]);
  // 평일 CHEANANTERMIANL
  const WEEKDAY_CHEANANTERMIANL_ITEMS = [
    '천안역',
    '아산(KTX)역',
    '천안터미널',
    '온양역/터미널',
    '천안캠퍼스',
  ];
  const [CheonanTerminal, setCheonanTerminal] = React.useState(WEEKDAY_CHEANANTERMIANL_ITEMS[0]);
  // 全体動的に変更
  const MENU_ITEMS: Record<string, string[]> = {
    평일: ['천안역', '아산(KTX)역', '천안터미널', '온양역/터미널', '천안캠퍼스'],
    '토요일/공휴일': ['천안역/아산(KTX)역', '천안터미널'],
    일요일: ['천안역/아산(KTX)역', '천안터미널'],
  };
  // 各メニューの選択状態を管理するための型定義
  type Selections = {
    [K in keyof typeof MENU_ITEMS]: string;
  };

  const [selections, setSelections] = useState<Selections>({
    평일: '',
    '토요일/공휴일': '',
    일요일: '',
  });

  // 選択状態を更新する関数
  const handleSelectionChange = (menu: keyof typeof MENU_ITEMS, item: string) => {
    setSelections((prev) => ({ ...prev, [menu]: item }));
  };

  return (
    <>
      <div className=" flex  mr-auto">
        <div className="mr-4">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger onClick={() => setSelectedMenu('학기')}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      visibility: selectedMenu === '학기' ? 'visible' : 'hidden',
                    }}
                  >
                    <Check className="mr-2 h-4 w-4" />
                  </div>
                  학기
                </div>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger onClick={() => setSelectedMenu('방학')}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      visibility: selectedMenu === '방학' ? 'visible' : 'hidden',
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
            {/* 動的に変更 */}
            {Object.entries(MENU_ITEMS).map(([menuTitle, items]) => (
              <MenubarMenu key={menuTitle}>
                <MenubarTrigger>{menuTitle}</MenubarTrigger>
                <MenubarContent>
                  <MenubarRadioGroup value={selections[menuTitle as keyof typeof MENU_ITEMS]}>
                    {items.map((item) => (
                      <MenubarRadioItem
                        className="MenubarRadioItem inset"
                        key={item}
                        value={item}
                        onClick={() =>
                          handleSelectionChange(menuTitle as keyof typeof MENU_ITEMS, item)
                        }
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
          onClick={addNewSchedule} // ここで渡された関数を使用
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
