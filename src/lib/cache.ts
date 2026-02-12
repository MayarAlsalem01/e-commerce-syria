// lib/cache.ts
import client from './redis';

/** Try to parse JSON, otherwise return raw string */
function tryParse<T>(raw: string | null): T | null {
    if (raw === null) return null;
    try { return JSON.parse(raw) as T; }
    catch { return raw as unknown as T; }
}

export async function cacheGet<T = unknown>(key: string): Promise<T | null> {
    const raw = await client.get(key);
    return tryParse<T>(raw);
}

export async function cacheSet<T = unknown>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    const raw = typeof value === 'string' ? value : JSON.stringify(value);
    if (typeof ttlSeconds === 'number') {
        // ioredis uses the command-argument style for EX:
        await client.set(key, raw, 'EX', ttlSeconds);
    } else {
        await client.set(key, raw);
    }
}

export async function cacheDel(key: string): Promise<number> {
    return client.del(key);
}

/**
 * cacheGetOrSet: get value from cache or call getter, store result with optional TTL.
 */
export async function cacheGetOrSet<T = unknown>(
    key: string,
    getter: () => Promise<T>,
    ttlSeconds?: number
): Promise<T> {
    const cached = await cacheGet<T>(key);
    if (cached !== null) return cached;
    const value = await getter();
    await cacheSet(key, value, ttlSeconds);
    return value;
}
export async function Memory(key: string) {
    const t = await cacheGet(key)
    console.log(t)
    const bytes = await client.memory('USAGE', key);
    console.log('memory')
    if (bytes) {

        console.log('bytes used by this key:', bytes);
        const total = 30 * 1024 * 1024;
        console.log('estimated entries:', Math.floor(total / bytes));
    }
}
