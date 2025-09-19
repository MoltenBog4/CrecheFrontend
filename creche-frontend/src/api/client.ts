// Base URL for your backend. Set in .env.development as VITE_API_BASE_URL=http://localhost:8086
const BASE = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');

export class ApiError extends Error {
  status: number;
  body?: string;
  constructor(status: number, body?: string) {
    super(`HTTP ${status}${body ? `: ${body}` : ''}`);
    this.status = status;
    this.body = body;
  }
}

async function request<T = any>(path: string, init: RequestInit = {}): Promise<T> {
  const url = `${BASE}${path}`;
  const res = await fetch(url, {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...(init.headers || {}) },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new ApiError(res.status, text || res.statusText);
  }
  const ct = res.headers.get('content-type') || '';
  if (!ct.includes('application/json')) {
    // @ts-expect-error allow non-JSON responses (e.g., text/void)
    return (await res.text()) as T;
  }
  return res.json() as Promise<T>;
}

/* ====== Creche endpoints you already had ====== */
export type ParentSummary = {
  id: number; firstName: string; lastName: string; email: string; cellNumber?: string;
};
export type ChildRegistrationRequest = {
  firstName: string; lastName: string; dateOfBirth?: string;
  gender?: string; classGroup?: string; allergies?: string; medicalNotes?: string;
};
export type ParentRegistrationRequest = {
  firstName: string; lastName: string; idNumber?: string;
  cellNumber?: string; email: string; address?: string;
  children: ChildRegistrationRequest[];
};

export const listParents = () => request<ParentSummary[]>('/api/parents');
export const registerParent = (payload: ParentRegistrationRequest) =>
  request('/api/registration/parent', { method: 'POST', body: JSON.stringify(payload) });
export const addChild = (parentId: number, payload: ChildRegistrationRequest) =>
  request(`/api/parents/${parentId}/children`, { method: 'POST', body: JSON.stringify(payload) });

/* ====== Newsletter (subscribe + browse/download + RSS) ====== */
export type NewsletterItem = {
  fileName: string;
  title: string;
  sizeBytes: number;
  publishedAt?: string | null;
  url: string; // e.g. "/api/newsletter/files/August-2025.pdf"
};

export const subscribeNewsletter = (email: string) =>
  request<{ id?: number; email: string; createdAt?: string; alreadySubscribed?: boolean }>(
    '/api/newsletter/subscribe',
    { method: 'POST', body: JSON.stringify({ email }) }
  );

export const listNewsletters = () => request<NewsletterItem[]>('/api/newsletter/list');
export const latestNewsletter = () => request<NewsletterItem | null>('/api/newsletter/latest');
