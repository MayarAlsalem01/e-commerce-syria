// components/SafeHtml.tsx
import parse from 'html-react-parser';

type Props = { html: string };

export default async function SafeHtml({ html }: Props) {
    const DOMPurify = (await import('isomorphic-dompurify')).default;
    const clean = DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['ol', 'ul', 'li', 'b', 'strong', 'i', 'em', 'p', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7'],
        ALLOWED_ATTR: []
    });
    // parse converts sanitized HTML string to React elements
    return <div className="prose">{parse(clean)}</div>;
}
