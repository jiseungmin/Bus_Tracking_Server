import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Blocks, Check, ChevronDown, Dot, Plus } from "lucide-react";
import { useRouter } from "next/router";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
interface HeaderProps {
  // 必要に応じてpropsを定義
}

const SchedulesHeader: React.FC<HeaderProps> = (props) => {
  const router = useRouter(); // useRouterフックを使用

  // URLのパス名を取得して加工
  const pathName = router.pathname.substring(1); // 最初のスラッシュを取り除く
  const pageTitle = pathName.charAt(0).toUpperCase() + pathName.slice(1); // 最初の文字を大文字にする

  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
      <Link className="lg:hidden" href="#">
        <Blocks className="h-6 w-6" />
        <span className="sr-only">Home</span>
      </Link>
      <div className="flex-1">
        <h1 className="font-semibold text-lg">{pageTitle}</h1>
      </div>

      <div className="ml-auto">
        <Menubar>
          <MenubarMenu>
            {/* コンテンツタイトル */}
            <MenubarTrigger>
              <Check className="mr-2 h-4 w-4" />
              학기
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>
              <Check className="mr-2 h-4 w-4" />
              방학
            </MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </div>
      <div className="mr-auto">
        <Menubar>
          <MenubarMenu>
            {/* コンテンツタイトル */}
            <MenubarTrigger>
              평일
              {/* <ChevronDown className="ml-2 h-4 w-4" /> */}
            </MenubarTrigger>
            {/* コンテンツ全体 */}
            <MenubarContent>
              {/* グループ化 */}
              <MenubarRadioGroup value="benoit">
                <MenubarRadioItem value="andy">천안역</MenubarRadioItem>
                <MenubarRadioItem value="benoit">아산(KTX)역</MenubarRadioItem>
                <MenubarRadioItem value="Luis">천안터미널</MenubarRadioItem>
                <MenubarRadioItem value="Luis">온양역/터미널</MenubarRadioItem>
                <MenubarRadioItem value="Luis">천안캠퍼스</MenubarRadioItem>
              </MenubarRadioGroup>
              {/* 線 */}
              <MenubarSeparator />
              <MenubarItem inset>Edit...</MenubarItem>
              {/* 線 */}
              <MenubarSeparator />
              <MenubarItem inset>Add Profile...</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>
              토요일/공휴일
              {/* <ChevronDown className="ml-2 h-4 w-4" /> */}
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem inset>천안역/아산(KTX)역</MenubarItem>
              <MenubarItem inset>천안터미널</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>
              일요일
              {/* <ChevronDown className="ml-2 h-4 w-4" /> */}
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem inset>천안역/아산(KTX)역</MenubarItem>
              <MenubarItem inset>천안터미널</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      <Button
        className="rounded-full border-gray-200 w-8 h-8 dark:border-gray-800"
        size="icon"
      >
        <Plus className="w-4 h-4" />
        <span className="sr-only">Add route</span>
      </Button>
    </header>
  );
};

export default SchedulesHeader;
