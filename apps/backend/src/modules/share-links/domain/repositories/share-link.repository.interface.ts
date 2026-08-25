import { ShareLink } from '../entities/share-link.entity';

export const SHARE_LINK_REPOSITORY = 'SHARE_LINK_REPOSITORY';

export interface IShareLinkRepository {
  create(data: Partial<ShareLink>): Promise<ShareLink>;
  findByToken(token: string): Promise<ShareLink | null>;
  findByTicketId(ticketId: string): Promise<ShareLink | null>;
  softDelete(id: string): Promise<void>;
  findTicketOwnedByUser(ticketId: string, userId: string): Promise<boolean>;
}
