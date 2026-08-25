import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  SHARE_LINK_REPOSITORY,
  type IShareLinkRepository,
} from '../../domain/repositories/share-link.repository.interface';
import { SharedTicketOutput } from '../dto/shared-ticket-output.dto';

@Injectable()
export class GetSharedTicketUseCase {
  constructor(
    @Inject(SHARE_LINK_REPOSITORY)
    private readonly shareLinkRepository: IShareLinkRepository,
  ) {}

  async execute(token: string): Promise<SharedTicketOutput> {
    const shareLink = await this.shareLinkRepository.findByToken(token);
    console.log('1');
    if (!shareLink) {
      throw new NotFoundException('Link inválido');
    }

    if (shareLink.expiresAt < new Date()) {
      throw new BadRequestException('Link expirado');
    }

    return {
      ticketId: shareLink.ticket.id,
      ticketCode: shareLink.ticket.ticketCode,
      qrCode: shareLink.ticket.qrCode,
      status: shareLink.ticket.status,
    };
  }
}
