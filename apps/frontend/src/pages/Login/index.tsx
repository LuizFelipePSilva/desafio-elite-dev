import { Link, Navigate } from 'react-router-dom';

import * as S from './styles';

import { useAuthStore } from '@/app/store';
import { LoginForm } from '@/features/auth';

export function Login() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <S.Container>
      <S.Brand>
        <S.Logo>VERZEL</S.Logo>
        <S.Tagline>Plataforma de eventos e ingressos</S.Tagline>
      </S.Brand>
      <LoginForm />
      <S.Footer>
        Ainda não tem conta? <Link to="/register">Criar conta</Link>
      </S.Footer>
    </S.Container>
  );
}
