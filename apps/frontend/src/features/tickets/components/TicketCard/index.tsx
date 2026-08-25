import * as S from './styles';

import type { Ticket } from '../../types/ticket.types';
import { QRCodeSVG } from 'qrcode.react';

interface TicketCardProps {
  ticket: Ticket;
  onClick?: (ticket: Ticket) => void;
}

const statusLabel: Record<string, string> = {
  VALID: 'Válido',
  USED: 'Utilizado',
  CANCELLED: 'Cancelado',
};

const statusColors: Record<string, string> = {
  VALID: '#22c55e',
  USED: '#FF5C5C',
  CANCELLED: '#8D93A0',
};

export function TicketCard({ ticket, onClick }: TicketCardProps) {
  return (
    <S.Card onClick={() => onClick?.(ticket)}>
      <S.Left>
        <S.QrPreview>
          <QRCodeSVG value={ticket.qrCode} size={48} />
        </S.QrPreview>
        <S.Info>
          <S.Code>#{ticket.ticketCode}</S.Code>
          <S.Status $color={statusColors[ticket.status]}>{statusLabel[ticket.status]}</S.Status>
        </S.Info>
      </S.Left>
      <S.Right>
        <S.ViewButton>Ver Detalhes</S.ViewButton>
      </S.Right>
    </S.Card>
  );
}
