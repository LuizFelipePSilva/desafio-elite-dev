import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { useLogin } from '../../hooks/useLogin';
import { loginSchema, type LoginFormData } from '../../validations/auth.schema';

import * as S from './styles';

import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';

export function LoginForm() {
  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data, {
      onError: () => {
        resetField('password');
      },
    });
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.Title>Entrar</S.Title>
      <S.Subtitle>Digite suas credenciais para acessar a plataforma</S.Subtitle>

      <Input
        label="E-mail"
        type="email"
        placeholder="john@example.com"
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        label="Senha"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register('password')}
      />

      <Button type="submit" variant="primary" size="lg" isLoading={isPending}>
        Entrar
      </Button>
    </S.Form>
  );
}
