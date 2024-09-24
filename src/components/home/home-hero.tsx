import { Button } from '@/components/ui/button';
import Image from 'next/image';

import HeroBanner from '@/public/assets/home-page-hero-banner.webp';

export const HomeHero = () => {
  return (
    <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center relative'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center space-y-4 text-center'>
          <div className='space-y-2'>
            <h1 className='text-3xl font-bold text-pretty tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white'>
              HAO Store
            </h1>
            <p className='mx-auto max-w-[700px] text-balance font-normal text-white md:text-xl dark:text-gray-200'>
              發現您的時尚風格，從這裡開始。
            </p>
          </div>
          <div className='space-x-4'>
            <Button>開始購物</Button>
            <Button
              variant='outline'
              className='bg-white text-black hover:bg-gray-200'>
              了解更多
            </Button>
          </div>
        </div>
      </div>
      <Image
        src={HeroBanner}
        alt='Home page hero banner'
        className='object-cover object-top -z-[1] brightness-50'
        fill
      />
      <div className='absolute bottom-0 left-0 right-0 h-12 md:h-20 lg:h-24 xl:h-32 bg-gradient-to-t from-background to-transparent'></div>
    </section>
  );
};
