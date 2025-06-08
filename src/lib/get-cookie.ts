import { cookies } from "next/headers";

export async function getCookie<T extends string>(
  key: string,
  allowed: readonly T[],
  fallback: T
): Promise<T> {
  const cookieStore = await cookies();
  const value = cookieStore.get(key)?.value;
  return (allowed as readonly string[]).includes(value ?? "")
    ? (value as T)
    : fallback;
}
