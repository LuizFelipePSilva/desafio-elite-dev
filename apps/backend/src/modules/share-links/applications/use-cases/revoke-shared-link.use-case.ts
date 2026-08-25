import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
import {
  SHARE_LINK_REPOSITORY,
  type IShareLinkRepository,
} from '../../domain/repositories/share-link.repository.interface';

@Injectable()
export class RevokeShareLinkUseCase {
  constructor(
    @Inject(SHARE_LINK_REPOSITORY)
    private readonly shareLinkRepository: IShareLinkRepository,
  ) {}

  async execute(ticketId: string, userId: string) {
    const owned = await this.shareLinkRepository.findTicketOwnedByUser(
      ticketId,
      userId,
    );

    if (!owned) {
      throw new ForbiddenException('Você não possui este ingresso');
    }

    const link = await this.shareLinkRepository.findByTicketId(ticketId);

    if (!link) {
      return;
    }

    await this.shareLinkRepository.softDelete(link.id);
  }
}
