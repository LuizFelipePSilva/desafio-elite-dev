export interface ExternalEvent {
  externalId: string;
  title: string;
  description?: string;
  venue?: string;
  city?: string;
  imageUrl?: string;
  eventDate: Date;
}
