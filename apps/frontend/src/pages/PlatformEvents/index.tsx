import { useState } from 'react';

import * as S from './styles';

import { useAuthStore } from '@/app/store';
import { ManageEventModal } from '@/features/events/components/ManageEventModal';
import { PlatformEventCard } from '@/features/events/components/PlatformEventCard';
import { usePlatformEvents } from '@/features/events/hooks/usePlatformEvents';
import type { PlatformEvent } from '@/features/events/types/platform-event.types';
import { BuyTicketModal } from '@/features/reservations/components/BuyTicketModal';
import { Button } from '@/shared/components/Button';
import { Container } from '@/shared/components/Container';
import { EmptyState } from '@/shared/components/EmptyState';
import { Grid, GridItem } from '@/shared/components/Grid';
import { Navbar } from '@/shared/components/Navbar';
import { Pagination } from '@/shared/components/Pagination';
import { Section } from '@/shared/components/Section';
import { Skeleton } from '@/shared/components/Skeleton';

export function PlatformEvents() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading, isError } = usePlatformEvents(page, limit);

  const events = data?.data ?? [];
  const totalPages = data?.last_page ?? 0;

  const [selectedEvent, setSelectedEvent] = useState<PlatformEvent | null>(null);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

  const { user } = useAuthStore();
  const role = user?.role;

  const message =
    role === 'ORGANIZER'
      ? 'Gerenciar os eventos criados na plataforma'
      : 'Comprar ingressos para os eventos disponíveis';

  const handleManage = (event: PlatformEvent) => {
    setSelectedEvent(event);
    setIsManageModalOpen(true);
  };

  const handleBuy = (event: PlatformEvent) => {
    setSelectedEvent(event);
    setIsBuyModalOpen(true);
  };

  const handleCloseManage = () => {
    setIsManageModalOpen(false);
    setSelectedEvent(null);
  };

  const handleCloseBuy = () => {
    setIsBuyModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <S.Wrapper>
      <Navbar />
      <Container size="lg">
        <Section
          title="Eventos da Plataforma"
          subtitle={message}
          action={
            role === 'ORGANIZER' && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => (window.location.href = '/events')}
              >
                Criar Novo Evento
              </Button>
            )
          }
        >
          {isLoading && (
            <Grid cols={3} colsTablet={2} colsMobile={1} gap="lg">
              {Array.from({ length: 6 }).map((_, i) => (
                <GridItem key={i}>
                  <Skeleton height="140px" />
                  <div style={{ marginTop: '1rem' }}>
                    <Skeleton height="20px" />
                    <Skeleton height="16px" width="60%" />
                  </div>
                </GridItem>
              ))}
            </Grid>
          )}

          {isError && (
            <EmptyState
              title="Erro ao carregar eventos"
              description="Não foi possível buscar os eventos da plataforma. Tente novamente mais tarde."
            />
          )}

          {!isLoading && !isError && events.length === 0 && (
            <EmptyState
              title="Nenhum evento encontrado"
              description="Não há eventos criados na plataforma ainda."
            />
          )}

          {!isLoading && !isError && events.length > 0 && (
            <>
              <Grid cols={3} colsTablet={2} colsMobile={1} gap="lg">
                {events.map((event) => (
                  <GridItem key={event.id}>
                    <PlatformEventCard event={event} onManage={handleManage} onClick={handleBuy} />
                  </GridItem>
                ))}
              </Grid>
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </>
          )}
        </Section>
      </Container>

      {selectedEvent && (
        <ManageEventModal
          isOpen={isManageModalOpen}
          onClose={handleCloseManage}
          event={selectedEvent}
        />
      )}

      <BuyTicketModal
        isOpen={isBuyModalOpen}
        onClose={handleCloseBuy}
        eventId={selectedEvent?.id ?? ''}
        eventTitle={selectedEvent?.title ?? ''}
      />
    </S.Wrapper>
  );
}
