import * as S from './styles';

interface SkeletonProps {
  width?: string;
  height?: string;
  circle?: boolean;
}

export function Skeleton({ width, height, circle }: SkeletonProps) {
  return <S.Bone $width={width} $height={height} $circle={circle} />;
}
