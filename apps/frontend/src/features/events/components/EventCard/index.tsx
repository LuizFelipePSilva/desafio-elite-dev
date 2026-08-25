import type { TicketmasterEvent } from '../../types';

import * as S from './styles';

interface EventCardProps {
  event: TicketmasterEvent;
  onClick?: (event: TicketmasterEvent) => void;
}

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

export function EventCard({ event, onClick }: EventCardProps) {
  return (
    <S.Card onClick={() => onClick?.(event)}>
      <S.ImageWrapper>
        <S.Image src={event.imageUrl} alt={event.title} loading="lazy" />
      </S.ImageWrapper>
      <S.Content>
        <S.Title>{event.title}</S.Title>
        <S.Venue>{event.venue}</S.Venue>
        <S.Footer>
          <S.DateText>{formatDate(event.eventDate)}</S.DateText>
          <S.ExternalId>#{event.externalId.slice(-6)}</S.ExternalId>
        </S.Footer>
      </S.Content>
    </S.Card>
  );
}
