import type { Sector } from '../../types/sector.types';

import * as S from './styles';

interface SectorCardProps {
  sector: Sector;
}

export function SectorCard({ sector }: SectorCardProps) {
  return (
    <S.Card>
      <S.Left>
        <S.Icon>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 10v3" />
            <path d="M6 6v11" />
            <path d="M10 3v18" />
            <path d="M14 8v7" />
            <path d="M18 5v13" />
            <path d="M22 10v4" />
          </svg>
        </S.Icon>
        <S.Info>
          <S.Name>{sector.name}</S.Name>
          <S.CapacityBadge>
            {sector.availableQuantity.toLocaleString('pt-BR')} disponíveis
          </S.CapacityBadge>
        </S.Info>
      </S.Left>
      <S.Right>
        <S.Price>
          {Number(sector.price).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </S.Price>
        <S.PriceLabel>por ingresso</S.PriceLabel>
      </S.Right>
    </S.Card>
  );
}
