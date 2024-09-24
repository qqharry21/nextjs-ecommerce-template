import { HomeHero, HomeProductCarousel } from '@/components/home';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <main className='flex-1'>
      <HomeHero />
      <Suspense fallback={'loading'}>
        <HomeProductCarousel />
      </Suspense>
    </main>
  );
}
