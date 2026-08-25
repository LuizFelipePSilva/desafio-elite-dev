import { useMemo, useState } from 'react';

import * as S from './styles';

import { CancelReservationModal } from '@/features/reservations/components/CancelReservationModal';
import { useCancelReservation } from '@/features/reservations/hooks/useCancelReservation';
import { useMyReservations } from '@/features/reservations/hooks/useMyReservations';
import type { Reservation } from '@/features/reservations/types/reservation.types';
import { TicketCard } from '@/features/tickets/components/TicketCard';
import { TicketDetailModal } from '@/features/tickets/components/TicketDetailModal';
import { useCreateShareLink } from '@/features/tickets/hooks/useCreateShareLink';
import { useRevokeShareLink } from '@/features/tickets/hooks/useRevokeShareLink';
import { useTicketsByReservations } from '@/features/tickets/hooks/useTicketsByReservations';
import type { ShareLinkResponse } from '@/features/tickets/types/share-link.types';
import type { Ticket } from '@/features/tickets/types/ticket.types';
import { Container } from '@/shared/components/Container';
import { EmptyState } from '@/shared/components/EmptyState';
import { Navbar } from '@/shared/components/Navbar';
import { Section } from '@/shared/components/Section';
import { Skeleton } from '@/shared/components/Skeleton';

interface ReservationWithTicket extends Reservation {
  ticket?: Ticket | undefined;
}

const CANCELABLE_STATUSES: Reservation['status'][] = ['PENDING'];

export function Tickets() {
  const { data: reservations, isLoading: isLoadingReservations, isError } = useMyReservations();

  const reservationIds = useMemo(() => (reservations ?? []).map((r) => r.id), [reservations]);

  const { data: tickets, isLoading: isLoadingTickets } = useTicketsByReservations(reservationIds);

  const merged: ReservationWithTicket[] = useMemo(() => {
    if (!reservations) return [];
    const ticketMap = new Map((tickets ?? []).map((t) => [t.reservationId, t]));
    return reservations.map((r) => ({ ...r, ticket: ticketMap.get(r.id) }));
  }, [reservations, tickets]);

  const [selectedTicketId, setSelectedTicketId] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState<string | undefined>(undefined);
  const [activeShareLinks, setActiveShareLinks] = useState<Record<string, ShareLinkResponse>>({});

  const cancelReservation = useCancelReservation();
  const createShareLink = useCreateShareLink();
  const revokeShareLink = useRevokeShareLink();

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicketId(ticket.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTicketId(undefined);
  };

  const handleOpenCancelModal = (reservationId: string) => {
    setReservationToCancel(reservationId);
  };

  const handleCloseCancelModal = () => {
    if (cancelReservation.isPending) return;
    setReservationToCancel(undefined);
  };

  const handleConfirmCancel = () => {
    if (!reservationToCancel) return;
    cancelReservation.mutate(reservationToCancel, {
      onSuccess: () => setReservationToCancel(undefined),
    });
  };

  const handleShareTicket = (ticketId: string) => {
    createShareLink.mutate(ticketId, {
      onSuccess: (data) => {
        setActiveShareLinks((prev) => ({ ...prev, [ticketId]: data }));
      },
    });
  };

  const handleRevokeShare = (ticketId: string) => {
    revokeShareLink.mutate(ticketId, {
      onSuccess: () => {
        setActiveShareLinks((prev) => {
          const next = { ...prev };
          delete next[ticketId];
          return next;
        });
      },
    });
  };

  const handleCopyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
  };

  const isLoading = isLoadingReservations || (reservationIds.length > 0 && isLoadingTickets);

  return (
    <S.Wrapper>
      <Navbar />
      <Container size="lg">
        <Section title="Meus Ingressos" subtitle="Gerencie suas reservas e ingressos">
          {isLoading && (
            <S.List>
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} height="80px" />
              ))}
            </S.List>
          )}

          {isError && (
            <EmptyState
              title="Erro ao carregar ingressos"
              description="Não foi possível buscar suas reservas. Tente novamente mais tarde."
            />
          )}

          {!isLoading && !isError && merged.length === 0 && (
            <EmptyState
              title="Nenhuma reserva encontrada"
              description="Você ainda não possui reservas. Explore os eventos e compre seu ingresso!"
            />
          )}

          {!isLoading && !isError && merged.length > 0 && (
            <S.List>
              {merged.map((reservation) => (
                <S.ReservationCard key={reservation.id}>
                  <S.ReservationHeader>
                    <S.EventTitle>{reservation.eventId}</S.EventTitle>
                    <S.ReservationStatus>{reservation.status}</S.ReservationStatus>
                  </S.ReservationHeader>

                  <S.ReservationMeta>
                    <span>{reservation.eventId}</span>
                    <span>·</span>
                    <span>{reservation.sectorId}</span>
                    <span>·</span>
                    <span>{new Date(reservation.createdAt).toLocaleDateString('pt-BR')}</span>
                  </S.ReservationMeta>

                  {reservation.ticket ? (
                    <S.TicketSection>
                      <S.SectionLabel>Ingresso</S.SectionLabel>
                      <TicketCard ticket={reservation.ticket} onClick={handleTicketClick} />

                      {reservation.ticket.status === 'VALID' && (
                        <S.TicketActions>
                          {!activeShareLinks[reservation.ticket.id] ? (
                            <S.ShareButton
                              type="button"
                              onClick={() => handleShareTicket(reservation.ticket!.id)}
                              disabled={createShareLink.isPending}
                            >
                              {createShareLink.isPending ? 'Gerando...' : 'Compartilhar Ingresso'}
                            </S.ShareButton>
                          ) : (
                            <S.ShareLinkBox>
                              <S.ShareLinkInput
                                type="text"
                                readOnly
                                value={activeShareLinks[reservation.ticket.id].url}
                              />
                              <S.ShareLinkMeta>
                                Expira em:{' '}
                                {new Date(
                                  activeShareLinks[reservation.ticket.id].expiresAt,
                                ).toLocaleString('pt-BR')}
                              </S.ShareLinkMeta>
                              <S.ShareLinkActions>
                                <S.CopyButton
                                  type="button"
                                  onClick={() =>
                                    handleCopyLink(activeShareLinks[reservation.ticket!.id].url)
                                  }
                                >
                                  Copiar Link
                                </S.CopyButton>
                                <S.RevokeButton
                                  type="button"
                                  onClick={() => handleRevokeShare(reservation.ticket!.id)}
                                  disabled={revokeShareLink.isPending}
                                >
                                  {revokeShareLink.isPending ? 'Revogando...' : 'Revogar'}
                                </S.RevokeButton>
                              </S.ShareLinkActions>
                            </S.ShareLinkBox>
                          )}
                        </S.TicketActions>
                      )}
                    </S.TicketSection>
                  ) : (
                    <S.NoTicket>Reserva pendente de emissão de ingresso</S.NoTicket>
                  )}

                  {CANCELABLE_STATUSES.includes(reservation.status) && (
                    <S.CancelButton
                      type="button"
                      onClick={() => handleOpenCancelModal(reservation.id)}
                    >
                      Cancelar reserva
                    </S.CancelButton>
                  )}
                </S.ReservationCard>
              ))}
            </S.List>
          )}
        </Section>
      </Container>

      <TicketDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        ticketId={selectedTicketId}
      />

      <CancelReservationModal
        isOpen={!!reservationToCancel}
        onClose={handleCloseCancelModal}
        onConfirm={handleConfirmCancel}
        isLoading={cancelReservation.isPending}
      />
    </S.Wrapper>
  );
}
