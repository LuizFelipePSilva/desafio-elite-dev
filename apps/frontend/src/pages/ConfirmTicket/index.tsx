import { useEffect, useRef, useState, useCallback } from 'react';

import * as S from './styles';

import { usePlatformEvents } from '@/features/events';
import type { PlatformEvent } from '@/features/events/types/platform-event.types';
import { useValidateTicket } from '@/features/tickets';
import type { TicketValidationResult } from '@/features/tickets/types/ticket.types';
import { Button } from '@/shared/components/Button';
import { Container } from '@/shared/components/Container';
import { EmptyState } from '@/shared/components/EmptyState';
import { Grid, GridItem } from '@/shared/components/Grid';
import { Input } from '@/shared/components/Input';
import { Navbar } from '@/shared/components/Navbar';
import { Pagination } from '@/shared/components/Pagination';
import { Skeleton } from '@/shared/components/Skeleton';

const RESULT_LABEL: Record<TicketValidationResult, string> = {
  VALID: 'Ingresso Válido',
  ALREADY_USED: 'Já Utilizado',
  WRONG_EVENT: 'Evento Errado',
  CANCELLED: 'Ingresso Cancelado',
  NOT_FOUND: 'Ingresso Não Encontrado',
};

declare global {
  interface Window {
    BarcodeDetector?: new (options: { formats: string[] }) => {
      detect: (source: CanvasImageSource) => Promise<Array<{ rawValue: string }>>;
    };
  }
}

export function ConfirmTicket() {
  const [selectedEvent, setSelectedEvent] = useState<PlatformEvent | null>(null);

  return selectedEvent ? (
    <ScanStep event={selectedEvent} onChangeEvent={() => setSelectedEvent(null)} />
  ) : (
    <EventSelectStep onSelect={setSelectedEvent} />
  );
}

function EventSelectStep({ onSelect }: { onSelect: (event: PlatformEvent) => void }) {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading, isError } = usePlatformEvents(page, limit);

  const events = data?.data ?? [];
  const totalPages = data?.last_page ?? 0;

  return (
    <S.Wrapper>
      <Navbar />
      <Container size="lg">
        <S.Content>
          <S.Title>Selecione o Evento</S.Title>

          {isLoading && (
            <Grid cols={3} colsTablet={2} colsMobile={1} gap="lg">
              {Array.from({ length: 3 }).map((_, i) => (
                <GridItem key={i}>
                  <Skeleton height="120px" />
                </GridItem>
              ))}
            </Grid>
          )}

          {isError && (
            <EmptyState
              title="Erro ao carregar eventos"
              description="Tente novamente mais tarde."
            />
          )}

          {!isLoading && !isError && events.length === 0 && (
            <EmptyState
              title="Nenhum evento encontrado"
              description="Não há eventos disponíveis."
            />
          )}

          {!isLoading && !isError && events.length > 0 && (
            <>
              <Grid cols={3} colsTablet={2} colsMobile={1} gap="lg">
                {events.map((event) => (
                  <GridItem key={event.id}>
                    <S.EventOption onClick={() => onSelect(event)}>
                      <S.EventOptionTitle>{event.title}</S.EventOptionTitle>
                      <S.EventOptionMeta>
                        {new Date(event.eventDate).toLocaleDateString('pt-BR')}
                      </S.EventOptionMeta>
                    </S.EventOption>
                  </GridItem>
                ))}
              </Grid>
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </>
          )}
        </S.Content>
      </Container>
    </S.Wrapper>
  );
}

function ScanStep({ event, onChangeEvent }: { event: PlatformEvent; onChangeEvent: () => void }) {
  const { mutate, data, isPending, reset } = useValidateTicket();

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number>();
  const scanningRef = useRef(false);

  const [manualCode, setManualCode] = useState('');
  const [cameraSupported, setCameraSupported] = useState(true);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const handleValidate = useCallback(
    (code: string) => {
      if (!code.trim() || isPending) return;
      scanningRef.current = false;
      mutate({ code: code.trim(), eventId: event.id });
    },
    [event.id, isPending, mutate],
  );

  useEffect(() => {
    if (data) return;

    if (!window.BarcodeDetector) {
      setCameraSupported(false);
      return;
    }

    let cancelled = false;
    const detector = new window.BarcodeDetector({ formats: ['qr_code'] });

    async function start() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        scanningRef.current = true;
        loop();
      } catch {
        setCameraError('Não foi possível acessar a câmera. Use a digitação manual.');
      }
    }

    async function loop() {
      if (!scanningRef.current || !videoRef.current) return;
      try {
        const codes = await detector.detect(videoRef.current);
        if (codes.length > 0) {
          handleValidate(codes[0].rawValue);
          return;
        }
      } catch {
        // frame inválido, ignora
      }
      rafRef.current = requestAnimationFrame(loop);
    }

    start();

    return () => {
      cancelled = true;
      scanningRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [data, handleValidate]);

  const handleManualSubmit = () => {
    handleValidate(manualCode);
    setManualCode('');
  };

  return (
    <S.Wrapper>
      <Navbar />
      <Container size="sm">
        <S.Content>
          <S.HeaderRow>
            <S.Title>{event.title}</S.Title>
            <Button variant="ghost" size="sm" onClick={onChangeEvent}>
              Trocar Evento
            </Button>
          </S.HeaderRow>

          {!data && (
            <>
              {cameraSupported ? (
                <S.ScannerBox>
                  <video ref={videoRef} muted playsInline />
                  <S.ScanFrame />
                </S.ScannerBox>
              ) : (
                <S.UnsupportedText>
                  Leitura de QR não suportada neste navegador. Use a digitação manual.
                </S.UnsupportedText>
              )}

              {cameraError && <S.UnsupportedText>{cameraError}</S.UnsupportedText>}

              <S.Divider>ou digite o código</S.Divider>

              <S.ManualRow>
                <Input
                  label="Código do Ingresso"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleManualSubmit()}
                />
                <Button
                  variant="primary"
                  size="sm"
                  isLoading={isPending}
                  disabled={!manualCode.trim()}
                  onClick={handleManualSubmit}
                >
                  Validar
                </Button>
              </S.ManualRow>
            </>
          )}

          {data && (
            <>
              <S.ResultCard $status={data.result === 'VALID' ? 'VALID' : 'INVALID'}>
                <S.ResultStatus $status={data.result === 'VALID' ? 'VALID' : 'INVALID'}>
                  {RESULT_LABEL[data.result]}
                </S.ResultStatus>
                <S.ResultMessage>{data.message}</S.ResultMessage>
                {data.ticket && (
                  <S.ResultMeta>
                    {data.ticket.ticketCode}
                    {data.ticket.validatedAt &&
                      ` · validado em ${new Date(data.ticket.validatedAt).toLocaleString('pt-BR')}`}
                  </S.ResultMeta>
                )}
              </S.ResultCard>
              <Button variant="ghost" size="sm" onClick={() => reset()}>
                Validar Próximo
              </Button>
            </>
          )}
        </S.Content>
      </Container>
    </S.Wrapper>
  );
}
