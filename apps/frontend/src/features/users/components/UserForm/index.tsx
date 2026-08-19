import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { useCreateUser } from '../../hooks/useCreateUser';
import { createUserSchema, type CreateUserFormData } from '../../validations/user.schema';

import * as S from './styles';

import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';

export function UserForm() {
  const { mutate, isPending } = useCreateUser();

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserSchema),
  });

  const onSubmit = (data: CreateUserFormData) => {
    mutate(data, {
      onSuccess: () => reset(),
      onError: () => {
        resetField('password');
      },
    });
  };

  return (
    <S.Form onSubmit={void handleSubmit(onSubmit)}>
      <S.Title>Novo usuário</S.Title>

      <Input
        label="Nome"
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

      <Button type="submit" variant="primary" isLoading={isPending}>
        Criar usuário
      </Button>
    </S.Form>
  );
}
