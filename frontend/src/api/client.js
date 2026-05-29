const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const contentType = response.headers.get('content-type');
  const data = contentType?.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    const message = data?.errors?.[0] ?? data?.message ?? 'Não foi possível concluir a operação.';
    throw new Error(message);
  }

  return data;
}
