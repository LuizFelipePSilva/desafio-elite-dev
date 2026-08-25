import { useState } from 'react';

import * as S from './styles';

import { EventCard, useEvents } from '@/features/events';
import type { TicketmasterEvent } from '@/features/events';
import { CreateEventModal } from '@/features/events/components/CreateEventModal';
import { Button } from '@/shared/components/Button';
import { Container } from '@/shared/components/Container';
import { EmptyState } from '@/shared/components/EmptyState';
import { Grid, GridItem } from '@/shared/components/Grid';
import { Navbar } from '@/shared/components/Navbar';
import { Pagination } from '@/shared/components/Pagination';
import { Section } from '@/shared/components/Section';
import { Skeleton } from '@/shared/components/Skeleton';

export function Events() {
  const [page, setPage] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<TicketmasterEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, isError } = useEvents(page);
  const events = data?.events ?? [];
  const totalPages = data?.page.totalPages ?? 0;

  const handleCardClick = (event: TicketmasterEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <S.Wrapper>
      <Navbar />
      <Container size="lg">
        <Section
          title="Eventos"
          subtitle="Selecione um evento do Ticketmaster para criar na plataforma"
          action={
            <Button variant="primary" size="sm" onClick={handleOpenModal}>
              Criar Evento
            </Button>
          }
        >
          {isLoading && (
            <Grid cols={3} colsTablet={2} colsMobile={1} gap="lg">
              {Array.from({ length: 6 }).map((_, i) => (
                <GridItem key={i}>
                  <Skeleton height="200px" />
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
              description="Não foi possível buscar os eventos do Ticketmaster. Tente novamente mais tarde."
            />
          )}

          {!isLoading && !isError && events.length === 0 && (
            <EmptyState
              title="Nenhum evento encontrado"
              description="Não há eventos disponíveis no momento."
            />
          )}

          {!isLoading && !isError && events.length > 0 && (
            <>
              <Grid cols={3} colsTablet={2} colsMobile={1} gap="lg">
                {events.map((event) => (
                  <GridItem key={event.externalId}>
                    <EventCard event={event} onClick={handleCardClick} />
                  </GridItem>
                ))}
              </Grid>
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </>
          )}
        </Section>
      </Container>

      <CreateEventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        ticketmasterEvent={selectedEvent}
      />
    </S.Wrapper>
  );
}
