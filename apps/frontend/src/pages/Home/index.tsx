import { Link } from 'react-router-dom';

import * as S from './styles';

import { removeToken } from '@/features/auth';
import { Button } from '@/shared/components/Button';

export function Home() {
  const handleLogout = () => {
    removeToken();
    window.location.reload();
  };

  return (
    <S.Container>
      <S.Header>
        <S.Logo>VERZEL</S.Logo>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          Sair
        </Button>
      </S.Header>
      <S.Content>
        <S.Welcome>
          <S.Title>Bem-vindo à Verzel Ticket</S.Title>
          <S.Description>Sua plataforma de eventos e ingressos. </S.Description>
        </S.Welcome>
        <S.Actions>
          <S.ActionCard>
            <S.ActionTitle>Eventos</S.ActionTitle>
            <S.ActionText>Explore os próximos eventos disponíveis.</S.ActionText>
            <Link to="/events">
              <Button variant="secondary" size="sm">
                Ver eventos
              </Button>
            </Link>
          </S.ActionCard>
          <S.ActionCard>
            <S.ActionTitle>Meus ingressos</S.ActionTitle>
            <S.ActionText>Gerencie seus ingressos e QR Codes.</S.ActionText>
            <Link to="/tickets">
              <Button variant="secondary" size="sm">
                Ver ingressos
              </Button>
            </Link>
          </S.ActionCard>
        </S.Actions>
      </S.Content>
    </S.Container>
  );
}
