// src/lib/queryKeys.ts
export const cartKeys = {
    // base namespace
    all: ['cart'] as const,

    // derived keys
    details: () => [...cartKeys.all, 'details'] as const,
    items: () => [...cartKeys.all, 'items'] as const,
    item: (itemId: string | number) => [...cartKeys.all, 'item', itemId] as const,

    withVersion: (v = 1) => [...cartKeys.all, `v${v}`] as const,
};
export const productKeys = {
    all: ['products'] as const,
    id: (id: string | number) => [...productKeys.all, id]
}