import { useState } from 'react';

import { useCreateSector } from '../../hooks/useCreateSector';

import * as S from './styles';

import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';

interface CreateSectorFormProps {
  eventId: string;
}

export function CreateSectorForm({ eventId }: CreateSectorFormProps) {
  const { mutateAsync, isPending } = useCreateSector();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [capacity, setCapacity] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !price || !capacity) {
      setError('Preencha todos os campos');
      return;
    }

    try {
      await mutateAsync({
        name,
        price: Number(price),
        capacity: Number(capacity),
        eventId,
      });
      setName('');
      setPrice('');
      setCapacity('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar setor');
    }
  };

  return (
    <S.Form onSubmit={handleSubmit}>
      {error && <S.ErrorText>{error}</S.ErrorText>}
      <S.Row>
        <Input
          label="Nome do Setor"
          placeholder="Ex: VIP, Camarote, Pista"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Preço (R$)"
          type="number"
          placeholder="0,00"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Capacidade"
          type="number"
          placeholder="Quantidade de lugares"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
        <S.SubmitWrapper>
          <Button type="submit" variant="primary" size="sm" isLoading={isPending}>
            Criar Setor
          </Button>
        </S.SubmitWrapper>
      </S.Row>
    </S.Form>
  );
}
