// store/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItemPayload = {
    id: number;
    quantity: number;
    total_price: number;
    // strongly recommend providing a unique id (product id / sku)
    product: {
        id: number,
        name: string,
        price: number
    }
};

export type CartItemState = {
    id: number;
    total_price: number;
    quantity: number;
    product: {
        id: number,
        name: string,
        price: number
    }
};

type CartState = {
    items: CartItemState[];
};

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItemPayload>) => {
            const { id, product, quantity, total_price } = action.payload;
            const existing = state.items.find(i => (i.id));

            if (existing) {
                // increment quantity if item already in cart
                existing.quantity += 1;
            } else {
                // add new item with default quantity 1
                state.items.push({
                    id,
                    product,
                    quantity,
                    total_price
                });
            }
        },

        removeFromCart: (state, action: PayloadAction<{ id?: string; productName?: string }>) => {
            // const { id, productName } = action.payload;
            // const key = id ?? productName;
            state.items = state.items.filter(i => (i.id));
        },

        incrementQuantity: (state, action: PayloadAction<{ id?: string; productName?: string; amount?: number }>) => {
            const { amount = 1 } = action.payload;
            const item = state.items.find(i => (i.id));
            if (item) item.quantity = Math.max(0, item.quantity + amount);
            // Optionally remove if zero
            state.items = state.items.filter(i => i.quantity > 0);
        },

        setQuantity: (state, action: PayloadAction<{ id?: string; productName?: string; quantity: number }>) => {
            const { quantity } = action.payload;
            const item = state.items.find(i => (i.id));
            if (item) {
                item.quantity = Math.max(0, Math.floor(quantity));
            }
            state.items = state.items.filter(i => i.quantity > 0);
        },

        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    incrementQuantity,
    setQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
