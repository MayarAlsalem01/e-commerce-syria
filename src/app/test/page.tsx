import LoadingDots from '@/components/LoadingDots/LoadingDots';
import Container from '@/components/ui/Container';
import { cacheGet } from '@/lib/cache';
import { getTranslations } from 'next-intl/server';

export default async function page() {
    const t = await getTranslations('auth');
    console.log(t('signIn'))
    return (
        <Container>
            <div className='w-full h-[calc(100vh-9rem)] flex items-center justify-center'>
                <p className='text-8xl  font-bold  -tracking-tight text-primary px-4 py-2 rounded-2xl'><LoadingDots /></p>
            </div>
        </Container>
    )
}
