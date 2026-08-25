import { useState } from 'react';

import { useSectors } from '../../hooks/useSectors';
import { CreateSectorForm } from '../CreateSectorForm';
import { SectorCard } from '../SectorCard';

import * as S from './styles';

import { Button } from '@/shared/components/Button';
import { Modal } from '@/shared/components/Modal';
import { Pagination } from '@/shared/components/Pagination';
import { Skeleton } from '@/shared/components/Skeleton';

interface ManageSectorsModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  eventTitle: string;
}

export function ManageSectorsModal({
  isOpen,
  onClose,
  eventId,
  eventTitle,
}: ManageSectorsModalProps) {
  const [page, setPage] = useState(1);
  const limit = 5;
  const { data, isLoading, isError } = useSectors(eventId, page, limit);

  const sectors = data?.data ?? [];
  const totalPages = data?.last_page ?? 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Gerenciar Setores — ${eventTitle}`}>
      <S.Wrapper>
        <S.Section>
          <S.SectionTitle>Novo Setor</S.SectionTitle>
          <CreateSectorForm eventId={eventId} />
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
                <Skeleton key={i} height="64px" />
              ))}
            </S.SectorList>
          )}

          {isError && <S.EmptyText>Erro ao carregar setores. Tente novamente.</S.EmptyText>}

          {!isLoading && !isError && sectors.length === 0 && (
            <S.EmptyText>Nenhum setor criado para este evento.</S.EmptyText>
          )}

          {!isLoading && !isError && sectors.length > 0 && (
            <>
              <S.SectorList>
                {sectors.map((sector) => (
                  <SectorCard key={sector.id} sector={sector} />
                ))}
              </S.SectorList>
              <S.PaginationWrapper>
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
              </S.PaginationWrapper>
            </>
          )}
        </S.Section>

        <S.Actions>
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Fechar
          </Button>
        </S.Actions>
      </S.Wrapper>
    </Modal>
  );
}
