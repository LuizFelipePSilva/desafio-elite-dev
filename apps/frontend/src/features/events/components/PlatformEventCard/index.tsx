import type { PlatformEvent } from '../../types/platform-event.types';

import * as S from './styles';

import { useAuthStore } from '@/app/store';
import { Button } from '@/shared/components/Button';

interface PlatformEventCardProps {
  event: PlatformEvent;
  onClick?: (event: PlatformEvent) => void;
  onManage?: (event: PlatformEvent) => void;
}

const statusLabel: Record<string, string> = {
  OPEN: 'Aberto',
  CLOSE: 'Fechado',
  MAINTENACE: 'Manutenção',
};

const typeLabel: Record<string, string> = {
  TICKET: 'Ingresso Geral',
  SEAT: 'Assento Numerado',
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function PlatformEventCard({ event, onClick, onManage }: PlatformEventCardProps) {
  const { user } = useAuthStore();
  const role = user?.role;

  return (
    <S.Card onClick={() => onClick?.(event)}>
      <S.TopBar>
        <S.Badge $status={event.status}>{statusLabel[event.status] || event.status}</S.Badge>
        <S.Type>{typeLabel[event.eventType]}</S.Type>
      </S.TopBar>

      <S.Content>
        <S.Title>{event.title}</S.Title>
        <S.Description>{event.description}</S.Description>

        <S.Divider />

        <S.MetaGrid>
          <S.MetaItem>
            <S.MetaLabel>Local</S.MetaLabel>
            <S.MetaValue>{event.location}</S.MetaValue>
          </S.MetaItem>
          <S.MetaItem>
            <S.MetaLabel>Capacidade</S.MetaLabel>
            <S.MetaValue>{event.capacity.toLocaleString('pt-BR')}</S.MetaValue>
          </S.MetaItem>
        </S.MetaGrid>
      </S.Content>

      <S.Footer>
        <S.FooterLeft>
          <S.DateText>{formatDate(event.eventDate)}</S.DateText>
          <S.ExternalId>#{event.externalId.slice(-6)}</S.ExternalId>
        </S.FooterLeft>
        <S.FooterRight>
          {role === 'ORGANIZER' && (
            <Button
              variant="primary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onManage?.(event);
              }}
            >
              Gerenciar
            </Button>
          )}
          {role === 'CUSTOMER' && (
            <Button
              variant="primary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onClick?.(event);
              }}
            >
              Comprar
            </Button>
          )}
        </S.FooterRight>
      </S.Footer>
    </S.Card>
  );
}
