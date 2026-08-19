import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { useRegister } from '../../hooks/useRegister';
import { registerSchema, type RegisterFormData } from '../../validations/auth.schema';

import * as S from './styles';

import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';

export function RegisterForm() {
  const { mutate, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    mutate(data);
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.Title>Criar conta</S.Title>
      <S.Subtitle>Preencha seus dados para se cadastrar</S.Subtitle>

      <Input
        label="Nome completo"
        type="text"
        placeholder="John Doe"
        error={errors.name?.message}
        {...register('name')}
      />

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

      <Input
        label="Confirmar senha"
        type="password"
        placeholder="••••••••"
        error={errors.confirm_password?.message}
        {...register('confirm_password')}
      />

      <Button type="submit" variant="primary" size="lg" isLoading={isPending}>
        Criar conta
      </Button>
    </S.Form>
  );
}
