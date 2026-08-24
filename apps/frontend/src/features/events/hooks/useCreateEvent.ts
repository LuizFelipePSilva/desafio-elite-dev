import { useMutation } from '@tanstack/react-query';

import { createEvent } from '../api/create-event';
import type { CreateEventInput } from '../types';

export function useCreateEvent() {
  return useMutation({
    mutationFn: (data: CreateEventInput) => createEvent(data),
  });
}
