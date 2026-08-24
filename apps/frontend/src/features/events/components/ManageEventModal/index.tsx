import { useState } from 'react';

import { useDeleteEvent } from '../../hooks/useDeleteEvent';
import { useUpdateEvent } from '../../hooks/useUpdateEvent';
import type { PlatformEvent } from '../../types/platform-event.types';

import * as S from './styles';

import { useUiStore } from '@/app/store';
import { CreateSectorForm } from '@/features/sectors/components/CreateSectorForm';
import { SectorCard } from '@/features/sectors/components/SectorCard';
import { useSectors } from '@/features/sectors/hooks/useSectors';
import { useUpdateSector } from '@/features/sectors/hooks/useUpdateSector';
import type { Sector, UpdateSectorInput } from '@/features/sectors/types/sector.types';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { Modal } from '@/shared/components/Modal';
import { Pagination } from '@/shared/components/Pagination';
import { Select } from '@/shared/components/Select';
import { Skeleton } from '@/shared/components/Skeleton';

type Tab = 'sectors' | 'settings';

interface ManageEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: PlatformEvent;
}

function toDateTimeLocal(dateString: string): string {
  const date = new Date(dateString);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function ManageEventModal({ isOpen, onClose, event }: ManageEventModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>('sectors');
  const { mutateAsync: updateEventAsync, isPending: isUpdatingEvent } = useUpdateEvent();
  const { mutateAsync: deleteEventAsync, isPending: isDeletingEvent } = useDeleteEvent();
  const { mutateAsync: updateSectorAsync, isPending: isUpdatingSector } = useUpdateSector();
  const setToast = useUiStore((state) => state.setToast);

  const [page, setPage] = useState(1);
  const limit = 5;
  const { data, isLoading, isError } = useSectors(event.id, page, limit);

  const sectors = data?.data ?? [];
  const totalPages = data?.last_page ?? 0;

  const [editingSector, setEditingSector] = useState<Sector | null>(null);
  const [editSectorForm, setEditSectorForm] = useState<UpdateSectorInput>({});

  const [eventForm, setEventForm] = useState({
    title: event.title,
    description: event.description,
    externalId: event.externalId,
    location: event.location,
    eventDate: toDateTimeLocal(event.eventDate),
    capacity: event.capacity,
    status: event.status,
  });

  const handleSaveEvent = async () => {
    try {
      await updateEventAsync({
        id: event.id,
        data: {
          ...eventForm,
          eventDate: new Date(eventForm.eventDate).toISOString(),
          capacity: Number(eventForm.capacity),
        },
      });
      setToast({ message: 'Evento atualizado com sucesso!', type: 'success' });
    } catch (err) {
      setToast({
        message: err instanceof Error ? err.message : 'Erro ao atualizar evento',
        type: 'error',
      });
    }
  };

  const handleDeleteEvent = async () => {
    if (!window.confirm('Tem certeza que deseja excluir este evento?')) return;
    try {
      await deleteEventAsync(event.id);
      setToast({ message: 'Evento excluído com sucesso!', type: 'success' });
      onClose();
    } catch (err) {
      setToast({
        message: err instanceof Error ? err.message : 'Erro ao excluir evento',
        type: 'error',
      });
    }
  };

  const startEditSector = (sector: Sector) => {
    setEditingSector(sector);
    setEditSectorForm({
      name: sector.name,
      price: Number(sector.price),
      capacity: sector.capacity,
    });
  };

  const handleSaveSector = async () => {
    if (!editingSector) return;
    try {
      await updateSectorAsync({
        id: editingSector.id,
        data: editSectorForm,
        eventId: event.id,
      });
      setToast({ message: 'Setor atualizado com sucesso!', type: 'success' });
      setEditingSector(null);
    } catch (err) {
      setToast({
        message: err instanceof Error ? err.message : 'Erro ao atualizar setor',
        type: 'error',
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Gerenciar Evento — ${event.title}`}>
      <S.Wrapper>
        <S.Tabs>
          <S.Tab $active={activeTab === 'sectors'} onClick={() => setActiveTab('sectors')}>
            Setores
          </S.Tab>
          <S.Tab $active={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>
            Configurações
          </S.Tab>
        </S.Tabs>

        {activeTab === 'sectors' && (
          <>
            <S.Section>
              <S.SectionTitle>Novo Setor</S.SectionTitle>
              <CreateSectorForm eventId={event.id} />
            </S.Section>

            <S.Divider />

            <S.Section>
              <S.SectionHeader>
                <S.SectionTitle>Setores Existentes</S.SectionTitle>
                <S.Count>{data?.total ?? 0} setor(es)</S.Count>
              </S.SectionHeader>

              {isLoading && (
                <S.SectorList>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} height="72px" />
                  ))}
                </S.SectorList>
              )}

              {isError && <S.EmptyText>Erro ao carregar setores.</S.EmptyText>}

              {!isLoading && !isError && sectors.length === 0 && (
                <S.EmptyText>Nenhum setor criado.</S.EmptyText>
              )}

              {!isLoading && !isError && sectors.length > 0 && (
                <>
                  <S.SectorList>
                    {sectors.map((sector) =>
                      editingSector?.id === sector.id ? (
                        <S.EditSectorCard key={sector.id}>
                          <S.EditRow>
                            <Input
                              label="Nome"
                              value={editSectorForm.name ?? ''}
                              onChange={(e) =>
                                setEditSectorForm((f) => ({ ...f, name: e.target.value }))
                              }
                            />
                            <Input
                              label="Preço"
                              type="number"
                              step="0.01"
                              value={editSectorForm.price ?? ''}
                              onChange={(e) =>
                                setEditSectorForm((f) => ({ ...f, price: Number(e.target.value) }))
                              }
                            />
                            <Input
                              label="Capacidade"
                              type="number"
                              value={editSectorForm.capacity ?? ''}
                              onChange={(e) =>
                                setEditSectorForm((f) => ({
                                  ...f,
                                  capacity: Number(e.target.value),
                                }))
                              }
                            />
                          </S.EditRow>
                          <S.EditActions>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingSector(null)}
                            >
                              Cancelar
                            </Button>
                            <Button
                              variant="primary"
                              size="sm"
                              isLoading={isUpdatingSector}
                              onClick={handleSaveSector}
                            >
                              Salvar
                            </Button>
                          </S.EditActions>
                        </S.EditSectorCard>
                      ) : (
                        <S.SectorRow key={sector.id}>
                          <SectorCard sector={sector} />
                          <S.SectorActions>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => startEditSector(sector)}
                            >
                              Editar
                            </Button>
                          </S.SectorActions>
                        </S.SectorRow>
                      ),
                    )}
                  </S.SectorList>
                  <S.PaginationWrapper>
                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                  </S.PaginationWrapper>
                </>
              )}
            </S.Section>
          </>
        )}

        {activeTab === 'settings' && (
          <S.SettingsForm>
            <S.SectionTitle>Configurações do Evento</S.SectionTitle>

            <Input
              label="Título"
              value={eventForm.title}
              onChange={(e) => setEventForm((f) => ({ ...f, title: e.target.value }))}
            />
            <Input
              label="Descrição"
              value={eventForm.description}
              onChange={(e) => setEventForm((f) => ({ ...f, description: e.target.value }))}
            />
            <S.Row>
              <Input
                label="ID Externo"
                value={eventForm.externalId}
                onChange={(e) => setEventForm((f) => ({ ...f, externalId: e.target.value }))}
              />
              <Input
                label="Local"
                value={eventForm.location}
                onChange={(e) => setEventForm((f) => ({ ...f, location: e.target.value }))}
              />
            </S.Row>
            <S.Row>
              <Input
                label="Data do Evento"
                type="datetime-local"
                value={eventForm.eventDate}
                onChange={(e) => setEventForm((f) => ({ ...f, eventDate: e.target.value }))}
              />
              <Input
                label="Capacidade"
                type="number"
                value={eventForm.capacity}
                onChange={(e) => setEventForm((f) => ({ ...f, capacity: Number(e.target.value) }))}
              />
            </S.Row>
            <Select
              label="Status"
              value={eventForm.status}
              onChange={(e) => setEventForm((f) => ({ ...f, status: e.target.value as any }))}
            >
              <option value="OPEN">Aberto</option>
              <option value="CLOSE">Fechado</option>
              <option value="MAINTENACE">Manutenção</option>
            </Select>

            <S.SettingsActions>
              <Button
                variant="danger"
                size="sm"
                isLoading={isDeletingEvent}
                onClick={handleDeleteEvent}
              >
                Excluir Evento
              </Button>
              <S.RightActions>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  isLoading={isUpdatingEvent}
                  onClick={handleSaveEvent}
                >
                  Salvar Alterações
                </Button>
              </S.RightActions>
            </S.SettingsActions>
          </S.SettingsForm>
        )}
      </S.Wrapper>
    </Modal>
  );
}
