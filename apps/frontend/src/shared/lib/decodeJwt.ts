export interface JwtPayload {
  sub: string;
  role: 'ORGANIZER' | 'CUSTOMER' | 'GATEKEEPER';
  iat: number;
  exp: number;
}

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payloadPart = parts[1];
    if (!payloadPart) return null;

    const base64 = payloadPart.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );

    const payload = JSON.parse(jsonPayload) as Record<string, unknown>;

    if (typeof payload.sub !== 'string' || typeof payload.role !== 'string') {
      return null;
    }

    if (!['ORGANIZER', 'CUSTOMER', 'GATEKEEPER'].includes(payload.role)) {
      return null;
    }

    return {
      sub: payload.sub,
      role: payload.role as JwtPayload['role'],
      iat: typeof payload.iat === 'number' ? payload.iat : 0,
      exp: typeof payload.exp === 'number' ? payload.exp : 0,
    };
  } catch {
    return null;
  }
}
