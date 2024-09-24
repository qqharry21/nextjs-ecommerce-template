'use client';

import { useCartStore } from '@/store/use-cart-store';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { ShoppingCartEmpty } from './shopping-cart-empty';
import { ShoppingCartList } from './shopping-cart-list';

export const ShoppingCartSheet = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCartStore();

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const shippingCost = subtotal > 80 ? 0 : 10;
  const totalPrice = subtotal + shippingCost;

  return (
    <Sheet
      open={isCartOpen}
      onOpenChange={setIsCartOpen}>
      <SheetTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='ml-auto relative'>
          <ShoppingCart className='h-4 w-4' />
          {totalItems > 0 && (
            <Badge
              variant='destructive'
              className='absolute -top-2 -right-2 px-2 py-1'>
              {totalItems}
            </Badge>
          )}
          <span className='sr-only'>購物車</span>
        </Button>
      </SheetTrigger>
      <SheetContent className='flex flex-col'>
        <SheetHeader>
          <SheetTitle>購物車</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <ShoppingCartEmpty />
        ) : (
          <>
            <ShoppingCartList />
            <div className='mt-6 space-y-4'>
              <div className='flex justify-between items-center'>
                <span className='text-sm'>小結:</span>
                <span className='font-semibold'>${subtotal.toFixed(2)}</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm'>運費:</span>
                <span className='font-semibold'>
                  {shippingCost === 0 ? '免運費' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              {shippingCost > 0 && (
                <p className='text-sm text-muted-foreground'>
                  還差 ${(80 - subtotal).toFixed(2)} 免運費
                </p>
              )}
              <div className='flex justify-between items-center pt-2 border-t'>
                <span className='text-lg font-semibold'>總金額:</span>
                <span className='text-lg font-bold'>${totalPrice.toFixed(2)}</span>
              </div>
              <Link
                href='/payment'
                className='block w-full'
                passHref>
                <Button
                  className='w-full'
                  size='lg'>
                  前往結帳
                </Button>
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
