import { type ShareLinkResponse } from '../types/share-link.types';

import { apiDelete, apiPost } from '@/shared/lib/httpClient';

export async function createShareLink(ticketId: string): Promise<ShareLinkResponse> {
  return apiPost(`/share-links/tickets/${ticketId}`, {});
}

export async function revokeShareLink(ticketId: string): Promise<void> {
  return apiDelete(`/share-links/tickets/${ticketId}`);
}
