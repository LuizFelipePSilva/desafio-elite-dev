import * as yup from 'yup';

export const createEventSchema = yup.object({
  title: yup
    .string()
    .min(8, 'Título deve ter no mínimo 8 caracteres')
    .required('Título é obrigatório'),
  description: yup
    .string()
    .min(8, 'Descrição deve ter no mínimo 8 caracteres')
    .required('Descrição é obrigatória'),
  externalId: yup.string().required('ID externo é obrigatório'),
  location: yup.string().required('Local é obrigatório'),
  eventDate: yup
    .string()
    .required('Data do evento é obrigatória')
    .test('is-valid-date', 'Data inválida', (value) => {
      return value ? !isNaN(new Date(value).getTime()) : false;
    }),
  capacity: yup
    .number()
    .min(1, 'Capacidade deve ser no mínimo 1')
    .required('Capacidade é obrigatória'),
  status: yup
    .string()
    .oneOf(['OPEN', 'CLOSE', 'MAINTENANCE'], 'Status inválido')
    .required('Status é obrigatório'),
});

export type CreateEventFormData = yup.InferType<typeof createEventSchema>;
