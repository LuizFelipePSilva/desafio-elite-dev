import { useState, type ReactNode } from 'react';

import * as S from './styles';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
}

export function Tabs({ items, defaultTab }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? items[0]?.id);

  const activeItem = items.find((i) => i.id === active);

  return (
    <div>
      <S.List>
        {items.map((item) => (
          <S.Tab key={item.id} $active={active === item.id} onClick={() => setActive(item.id)}>
            {item.label}
          </S.Tab>
        ))}
      </S.List>
      {activeItem && <S.Panel>{activeItem.content}</S.Panel>}
    </div>
  );
}
