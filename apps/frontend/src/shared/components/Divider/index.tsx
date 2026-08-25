import * as S from './styles';

interface DividerProps {
  spacing?: 'sm' | 'md' | 'lg';
}

export function Divider({ spacing = 'md' }: DividerProps) {
  return <S.Line $spacing={spacing} />;
}
