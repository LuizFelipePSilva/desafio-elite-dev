import { Link } from 'react-router-dom';

import * as S from './styles';

import { RegisterForm } from '@/features/auth';

export function Register() {
  return (
    <S.Container>
      <S.Brand>
        <S.Logo>VERZEL</S.Logo>
        <S.Tagline>Crie sua conta para começar</S.Tagline>
      </S.Brand>
      <RegisterForm />
      <S.Footer>
        Já tem conta? <Link to="/login">Entrar</Link>
      </S.Footer>
    </S.Container>
  );
}
