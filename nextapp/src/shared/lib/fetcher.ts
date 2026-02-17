export const fetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);

  if (!res.ok) {
    const message = `Ошибка ${res.status}: ${res.statusText}`;
    throw new Error(message);
  }

  return res.json();
};
