'use client';

import { Product } from '@/lib/type';
import { useCartStore } from '@/store/use-cart-store';
import { ShoppingBasket } from 'lucide-react';
import { toast } from 'sonner';
import { BlurImage } from '../blur-image';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';

export const HomeProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCartStore();
  const discountPercentage = Math.round(product.discountPercentage);
  const discountedPrice = product.price * ((100 - discountPercentage) / 100);

  const onAddItem = () => {
    addItem({ ...product, quantity: 1 });
    toast.success('商品已添加到購物車');
  };

  return (
    <Card className='h-full flex flex-col'>
      <CardHeader className='flex-grow-0'>
        <div className='aspect-square relative'>
          <BlurImage
            src={product.thumbnail}
            alt={product.title}
            className='object-cover w-full h-full rounded-md'
            loading='lazy'
            fill
          />
          <Badge className='absolute hover:bg-red-500 top-2 right-2 bg-red-500'>
            {discountPercentage}% OFF
          </Badge>
        </div>
      </CardHeader>
      <CardContent className='flex-grow flex flex-col justify-between'>
        <CardTitle className='text-lg mb-2 line-clamp-2'>{product.title}</CardTitle>
        <div className='flex items-center gap-2 mt-auto'>
          <span className='text-xl font-bold'>${discountedPrice.toFixed(2)}</span>
          <span className='text-sm text-muted-foreground line-through'>
            ${product.price.toFixed(2)}
          </span>
        </div>
      </CardContent>
      <CardFooter className='flex justify-center'>
        <Button
          variant='default'
          onClick={onAddItem}>
          加入購物車
          <ShoppingBasket
            size={16}
            className='ml-2'
          />
        </Button>
      </CardFooter>
    </Card>
  );
};
