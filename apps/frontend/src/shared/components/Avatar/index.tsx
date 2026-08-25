import * as S from './styles';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ src, alt, size = 'md' }: AvatarProps) {
  const initials =
    alt
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() ?? '?';

  return <S.Wrapper $size={size}>{src ? <S.Image src={src} alt={alt} /> : initials}</S.Wrapper>;
}
