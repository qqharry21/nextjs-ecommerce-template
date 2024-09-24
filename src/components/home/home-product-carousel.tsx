import { Product } from '@/lib/type';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { HomeProductCard } from './home-product-card';

const getProducts = async () => {
  const res = await fetch('https://dummyjson.com/products', {
    cache: 'no-store',
  }).then((res) => res.json());
  return res.products as Product[];
};

export const HomeProductCarousel = async () => {
  const products = await getProducts();

  if (!products) {
    return null;
  }

  return (
    <div className='hidden sm:block relative mt-16 md:mt-32'>
      <Carousel
        className='w-full relative'
        opts={{
          align: 'start',
          loop: true,
        }}>
        <CarouselContent
          wrapperClassName='px-4'
          className='ml-0'>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className='px-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4'>
              <HomeProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className='flex justify-center mt-8'>
          <CarouselPrevious className='relative mr-2 -translate-x-0 translate-y-0' />
          <CarouselNext className='relative ml-2 -translate-x-0 translate-y-0' />
        </div>
      </Carousel>
    </div>
  );
};
