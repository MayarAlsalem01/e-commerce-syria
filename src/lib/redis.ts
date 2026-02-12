// lib/redis.ts
import Redis from 'ioredis';

const url = process.env.REDIS_URL;
if (!url) throw new Error('Missing REDIS_URL (set REDIS_URL in your env)');

declare global {
    // allow reuse in dev/HMR to avoid multiple connections
    // eslint-disable-next-line no-var
    var __ioredis_client__: Redis | undefined;
}

function makeClient() {
    return new Redis(url!, {
        // recommended options for stability:
        maxRetriesPerRequest: null, // let retryStrategy control reconnections
        enableAutoPipelining: true,
        retryStrategy(times: number) {
            // exponential-ish backoff capped at 2s
            return Math.min(50 * times, 2000);
        },
        // If you hit TLS / cert issues (dev only), you can provide:
        // tls: { rejectUnauthorized: false }
    });
}
/* eslint-disable  @typescript-eslint/no-explicit-any */
const client: Redis = (global as any).__ioredis_client__ ?? makeClient();
/* eslint-disable  @typescript-eslint/no-explicit-any */
if (!(global as any).__ioredis_client__) {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    (global as any).__ioredis_client__ = client;

    client.on('connect', () => {
        console.log('[redis] connected');
    });
    client.on('ready', () => {
        console.log('[redis] ready');
    });
    client.on('error', (err) => {
        console.error('[redis] error', err);
    });
    client.on('close', () => {
        console.log('[redis] closed');
    });
}

export default client;
