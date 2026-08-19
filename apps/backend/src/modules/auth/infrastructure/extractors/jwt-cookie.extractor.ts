import type { Request } from 'express';

type AuthCookies = {
  access_token?: string;
};

export const jwtCookieExtractor = (req: Request): string | null => {
  const cookies = req.cookies as AuthCookies | undefined;

  return cookies?.access_token ?? null;
};
