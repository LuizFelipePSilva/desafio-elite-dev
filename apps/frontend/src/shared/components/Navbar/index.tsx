import { useLocation } from 'react-router-dom';

import * as S from './styles';

import { useAuthStore } from '@/app/store';
import { useLogout } from '@/features/auth';

export function Navbar() {
  const { user } = useAuthStore();
  const { mutate: logout } = useLogout();
  const location = useLocation();
  const role = user?.role;

  const isActive = (path: string) => location.pathname === path;

  return (
    <S.Container>
      <S.Brand to="/">VERZEL</S.Brand>
      <S.NavLinks>
        {role === 'ORGANIZER' && (
          <>
            <S.NavLink to="/events" $active={isActive('/events')}>
              Eventos
            </S.NavLink>
            <S.NavLink to="/events/create" $active={isActive('/events/create')}>
              Criar Evento
            </S.NavLink>
          </>
        )}
        {role === 'CUSTOMER' && (
          <>
            <S.NavLink to="/events" $active={isActive('/events')}>
              Explorar
            </S.NavLink>
            <S.NavLink to="/tickets" $active={isActive('/tickets')}>
              Meus Ingressos
            </S.NavLink>
          </>
        )}
        {role === 'GATEKEEPER' && (
          <>
            <S.NavLink to="/validate" $active={isActive('/validate')}>
              Validar
            </S.NavLink>
          </>
        )}
        <S.LogoutButton onClick={() => logout()}>Sair</S.LogoutButton>
      </S.NavLinks>
    </S.Container>
  );
}
