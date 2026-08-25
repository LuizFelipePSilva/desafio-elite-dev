import { useState } from 'react';

import { useCreateReservation } from '../../hooks/useCreateReservation';
import { useFinishReservation } from '../../hooks/useFinishReservation';
import type { PaymentMethod } from '../../types/reservation.types';

import * as S from './styles';

import { useUiStore } from '@/app/store';
import { useSectors } from '@/features/sectors/hooks/useSectors';
import { Button } from '@/shared/components/Button';
import { Modal } from '@/shared/components/Modal';
import { Pagination } from '@/shared/components/Pagination';
import { Skeleton } from '@/shared/components/Skeleton';

interface BuyTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  eventTitle: string;
}

export function BuyTicketModal({ isOpen, onClose, eventId, eventTitle }: BuyTicketModalProps) {
  const [page, setPage] = useState(1);
  const limit = 5;
  const { data, isLoading, isError } = useSectors(eventId, page, limit);
  const { mutateAsync: create, isPending: isCreating } = useCreateReservation();
  const { mutateAsync: finish, isPending: isFinishing } = useFinishReservation();
  const setToast = useUiStore((state) => state.setToast);

  const [selectedSectorId, setSelectedSectorId] = useState<string | null>(null);
  const [method, setMethod] = useState<PaymentMethod>('PIX');
  const [createdReservation, setCreatedReservation] = useState<string | null>(null);

  const sectors = data?.data ?? [];
  const totalPages = data?.last_page ?? 0;

  const handleClose = () => {
    setSelectedSectorId(null);
    setCreatedReservation(null);
    setMethod('PIX');
    onClose();
  };

  const handleCreate = async () => {
    if (!selectedSectorId) {
      setToast({ message: 'Selecione um setor', type: 'error' });
      return;
    }

    try {
      const reservation = await create({
        eventId,
        sectorId: selectedSectorId,
        method,
      });
      setCreatedReservation(reservation.id);
      setToast({ message: 'Reserva criada! Finalize para confirmar.', type: 'success' });
    } catch (err) {
      setToast({
        message: err instanceof Error ? err.message : 'Erro ao criar reserva',
        type: 'error',
      });
    }
  };

  const handleFinish = async () => {
    if (!createdReservation) return;

    try {
      await finish(createdReservation);
      setToast({ message: 'Ingresso comprado com sucesso!', type: 'success' });
      handleClose();
    } catch (err) {
      setToast({
        message: err instanceof Error ? err.message : 'Erro ao finalizar reserva',
        type: 'error',
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={`Comprar Ingresso — ${eventTitle}`}>
      <S.Wrapper>
        {!createdReservation ? (
          <>
            <S.Section>
              <S.SectionTitle>Selecione o Setor</S.SectionTitle>

              {isLoading && (
                <S.SectorList>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} height="72px" />
                  ))}
                </S.SectorList>
              )}

              {isError && <S.EmptyText>Erro ao carregar setores. Tente novamente.</S.EmptyText>}

              {!isLoading && !isError && sectors.length === 0 && (
                <S.EmptyText>Nenhum setor disponível para este evento.</S.EmptyText>
              )}

              {!isLoading && !isError && sectors.length > 0 && (
                <>
                  <S.SectorList>
                    {sectors.map((sector) => (
                      <S.SectorOption
                        key={sector.id}
                        $selected={selectedSectorId === sector.id}
                        onClick={() => setSelectedSectorId(sector.id)}
                      >
                        <S.SectorLeft>
                          <S.SectorIcon>
                            <svg
                              width="18"
                              height="18"
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
                          </S.SectorIcon>
                          <S.SectorInfo>
                            <S.SectorName>{sector.name}</S.SectorName>
                            <S.SectorCapacity>
                              {sector.availableQuantity.toLocaleString('pt-BR')} lugares disponíveis
                            </S.SectorCapacity>
                          </S.SectorInfo>
                        </S.SectorLeft>
                        <S.SectorPrice>
                          {Number(sector.price).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </S.SectorPrice>
                      </S.SectorOption>
                    ))}
                  </S.SectorList>
                  <S.PaginationWrapper>
                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                  </S.PaginationWrapper>
                </>
              )}
            </S.Section>

            <S.Divider />

            <S.Section>
              <S.SectionTitle>Método de Pagamento</S.SectionTitle>
              <S.PaymentGrid>
                <S.PaymentOption $selected={method === 'PIX'} onClick={() => setMethod('PIX')}>
                  <S.PaymentDot $selected={method === 'PIX'} />
                  <span>PIX</span>
                </S.PaymentOption>
                <S.PaymentOption
                  $selected={method === 'CREDIT_CARD'}
                  onClick={() => setMethod('CREDIT_CARD')}
                >
                  <S.PaymentDot $selected={method === 'CREDIT_CARD'} />
                  <span>Cartão de Crédito</span>
                </S.PaymentOption>
              </S.PaymentGrid>
            </S.Section>

            <S.Actions>
              <Button type="button" variant="ghost" size="sm" onClick={handleClose}>
                Cancelar
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                isLoading={isCreating}
                disabled={!selectedSectorId}
                onClick={handleCreate}
              >
                Criar Reserva
              </Button>
            </S.Actions>
          </>
        ) : (
          <S.SuccessWrapper>
            <S.SuccessIcon>🎫</S.SuccessIcon>
            <S.SuccessTitle>Reserva Criada!</S.SuccessTitle>
            <S.SuccessText>
              Sua reserva foi criada com sucesso. Finalize agora para confirmar a compra do
              ingresso.
            </S.SuccessText>
            <S.SuccessActions>
              <Button type="button" variant="ghost" size="sm" onClick={handleClose}>
                Fechar
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                isLoading={isFinishing}
                onClick={handleFinish}
              >
                Finalizar Compra
              </Button>
            </S.SuccessActions>
          </S.SuccessWrapper>
        )}
      </S.Wrapper>
    </Modal>
  );
}
