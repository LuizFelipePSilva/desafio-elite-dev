import { useMutation } from '@tanstack/react-query';

import { validateTicket } from '../api/ticket.service';
import type { ValidateTicketPayload } from '../types/ticket.types';

export function useValidateTicket() {
  return useMutation({
    mutationFn: (payload: ValidateTicketPayload) => validateTicket(payload),
  });
}
