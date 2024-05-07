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

export function MenubarDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        {/* コンテンツタイトル */}
        <MenubarTrigger>평일</MenubarTrigger>
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
        <MenubarTrigger>토요일/공휴일</MenubarTrigger>
        <MenubarContent>
          <MenubarItem inset>천안역/아산(KTX)역</MenubarItem>
          <MenubarItem inset>천안터미널</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>일요일</MenubarTrigger>
        <MenubarContent>
          <MenubarItem inset>천안역/아산(KTX)역</MenubarItem>
          <MenubarItem inset>천안터미널</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
