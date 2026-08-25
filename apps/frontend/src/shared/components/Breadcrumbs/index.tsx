import * as S from './styles';

export interface Crumb {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <S.Nav aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {item.path && !isLast ? (
              <S.Crumb to={item.path}>{item.label}</S.Crumb>
            ) : (
              <S.Current>{item.label}</S.Current>
            )}
            {!isLast && <S.Separator>/</S.Separator>}
          </span>
        );
      })}
    </S.Nav>
  );
}
