import { baseUrl } from "@/lib/httpClient";

export function getImagePath(path: string) {
    return `${baseUrl}/storage/${path}`
}