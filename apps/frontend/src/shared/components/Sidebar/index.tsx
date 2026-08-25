import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import * as S from './styles';

export interface SidebarItem {
  label: string;
  path: string;
  icon?: ReactNode;
}

interface SidebarProps {
  items: SidebarItem[];
  footer?: ReactNode;
  collapsed?: boolean;
}

export function Sidebar({ items, footer, collapsed = false }: SidebarProps) {
  const location = useLocation();

  return (
    <S.Aside $collapsed={collapsed}>
      <S.LogoArea>
        {!collapsed && (
          <span
            style={{
              fontFamily: 'Space Grotesk',
              fontWeight: 700,
              color: '#C6F135',
              letterSpacing: '0.1em',
            }}
          >
            VERZEL
          </span>
        )}
      </S.LogoArea>
      <S.Nav>
        {items.map((item) => (
          <S.NavItem key={item.path} to={item.path} $active={location.pathname === item.path}>
            {item.icon && <span>{item.icon}</span>}
            {!collapsed && item.label}
          </S.NavItem>
        ))}
      </S.Nav>
      {footer && <S.Footer>{footer}</S.Footer>}
    </S.Aside>
  );
}
