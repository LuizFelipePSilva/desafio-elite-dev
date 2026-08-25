import { Link } from 'react-router-dom';

import * as S from './styles';

import { useAuthStore } from '@/app/store';
import { Button } from '@/shared/components/Button';
import { Navbar } from '@/shared/components/Navbar';

export function Home() {
  const { user } = useAuthStore();
  const role = user?.role;

  return (
    <S.Container>
      <Navbar />
      <S.Content>
        <S.Welcome>
          <S.Title>Bem-vindo à Verzel Ticket</S.Title>
          <S.Description>
            Sua plataforma de eventos e ingressos. O fluxo completo de reservas, pagamento e
            validação está em construção.
          </S.Description>
        </S.Welcome>
        <S.Actions>
          {role === 'ORGANIZER' && (
            <>
              <S.ActionCard>
                <S.ActionTitle>Criar um Evento</S.ActionTitle>
                <S.ActionText>Criar um evento a partir do catalogo de filmes</S.ActionText>
                <Link to="/events/create">
                  <Button variant="secondary" size="sm">
                    Ver catalogo e criar eventos
                  </Button>
                </Link>
              </S.ActionCard>
              <S.ActionCard>
                <S.ActionTitle>Ver eventos</S.ActionTitle>
                <S.ActionText>Visualize eventos criados</S.ActionText>
                <Link to="/events">
                  <Button variant="secondary" size="sm">
                    Ver eventos
                  </Button>
                </Link>
              </S.ActionCard>
            </>
          )}
          {role === 'CUSTOMER' && (
            <>
              <S.ActionCard>
                <S.ActionTitle>Eventos disponiveis</S.ActionTitle>
                <S.ActionText>Ver eventos disponiveis</S.ActionText>
                <Link to="/events">
                  <Button variant="secondary" size="sm">
                    Ver eventos
                  </Button>
                </Link>
              </S.ActionCard>
              <S.ActionCard>
                <S.ActionTitle>Ver meus ingressos</S.ActionTitle>
                <S.ActionText>Visualizar meus ingressos </S.ActionText>
                <Link to="/tickets">
                  <Button variant="secondary" size="sm">
                    Ver ingressos
                  </Button>
                </Link>
              </S.ActionCard>
            </>
          )}

          {role === 'GATEKEEPER' && (
            <>
              <S.ActionCard>
                <S.ActionTitle>Validar ingressos</S.ActionTitle>
                <S.ActionText>Validar ingresso na portaria</S.ActionText>
                <Link to="/confirm-ticket">
                  <Button variant="secondary" size="sm">
                    Validar ingresso
                  </Button>
                </Link>
              </S.ActionCard>
            </>
          )}
        </S.Actions>
      </S.Content>
    </S.Container>
  );
}
