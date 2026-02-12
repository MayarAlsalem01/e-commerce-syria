export interface Category {
    id: number;
    name: string;
    image: string;
}

export interface SubCategory {
    id: number;
    category_id: number;
    name: string;
    category_name: string;
}
