import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useCreateEvent } from '../../hooks/useCreateEvent';
import type { TicketmasterEvent } from '../../types';
import { createEventSchema, type CreateEventFormData } from '../../validations/event.schemas';

import * as S from './styles';

import { useUiStore } from '@/app/store';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { Modal } from '@/shared/components/Modal';
import { Select } from '@/shared/components/Select';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketmasterEvent: TicketmasterEvent | null;
}
function toDateTimeLocal(dateString: string): string {
  const date = new Date(dateString);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function CreateEventModal({ isOpen, onClose, ticketmasterEvent }: CreateEventModalProps) {
  const { mutateAsync, isPending } = useCreateEvent();
  const setToast = useUiStore((state) => state.setToast);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateEventFormData>({
    resolver: yupResolver(createEventSchema),
    defaultValues: {
      status: 'OPEN',
    },
  });

  useEffect(() => {
    if (ticketmasterEvent) {
      setValue('title', ticketmasterEvent.title);
      setValue('externalId', ticketmasterEvent.externalId);
      setValue('location', ticketmasterEvent.venue);
      setValue('eventDate', toDateTimeLocal(ticketmasterEvent.eventDate));
    }
  }, [ticketmasterEvent, setValue]);

  useEffect(() => {
    if (!isOpen) {
      reset();
      setApiError(null);
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: CreateEventFormData) => {
    setApiError(null);
    try {
      const payload = {
        ...data,
        eventDate: new Date(data.eventDate).toISOString(),
      };
      await mutateAsync(payload);
      setToast({ message: 'Evento criado com sucesso!', type: 'success' });
      onClose();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao criar evento';
      setApiError(message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Criar Evento">
      {!ticketmasterEvent ? (
        <S.EmptyState>
          <S.EmptyIcon>🎫</S.EmptyIcon>
          <S.EmptyTitle>Selecione um evento para criar</S.EmptyTitle>
          <S.EmptyText>
            Clique em um dos cards de eventos do Ticketmaster listados abaixo para pré-preencher os
            dados automaticamente.
          </S.EmptyText>
          <Button variant="primary" onClick={() => onClose()}>
            Entendi
          </Button>
        </S.EmptyState>
      ) : (
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          {apiError && <S.ErrorBanner>{apiError}</S.ErrorBanner>}

          <S.Preview>
            <S.PreviewImage src={ticketmasterEvent.imageUrl} alt={ticketmasterEvent.title} />
            <S.PreviewInfo>
              <S.PreviewTitle>{ticketmasterEvent.title}</S.PreviewTitle>
              <S.PreviewMeta>{ticketmasterEvent.venue}</S.PreviewMeta>
              <S.PreviewMeta>
                {new Date(ticketmasterEvent.eventDate).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </S.PreviewMeta>
            </S.PreviewInfo>
          </S.Preview>

          <Input
            label="Título"
            placeholder="Nome do evento"
            error={errors.title?.message}
            {...register('title')}
          />

          <Input
            label="Descrição"
            placeholder="Descrição detalhada do evento"
            error={errors.description?.message}
            {...register('description')}
          />

          <S.Row>
            <Input
              label="ID Externo"
              placeholder="ID do Ticketmaster"
              error={errors.externalId?.message}
              {...register('externalId')}
            />
            <Input
              label="Local"
              placeholder="Local do evento"
              error={errors.location?.message}
              {...register('location')}
            />
          </S.Row>

          <S.Row>
            <Input
              label="Data do Evento"
              type="datetime-local"
              error={errors.eventDate?.message}
              {...register('eventDate')}
            />
            <Input
              label="Capacidade"
              type="number"
              placeholder="1000"
              error={errors.capacity?.message}
              {...register('capacity', { valueAsNumber: true })}
            />
          </S.Row>

          <S.Row>
            <Select label="Status" error={errors.status?.message} {...register('status')}>
              <option value="OPEN">Aberto</option>
              <option value="CLOSE">Fechado</option>
              <option value="MAINTENANCE">Manutenção</option>
            </Select>
          </S.Row>

          <S.Actions>
            <Button type="button" variant="ghost" onClick={() => onClose()}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" isLoading={isPending}>
              Criar Evento
            </Button>
          </S.Actions>
        </S.Form>
      )}
    </Modal>
  );
}
