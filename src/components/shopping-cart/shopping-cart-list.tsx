'use client';

import { BlurImage } from '@/components/blur-image';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CartItem, useCartStore } from '@/store/use-cart-store';
import { Minus, Plus, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

export const ShoppingCartList = () => {
  const [itemToRemove, setItemToRemove] = useState<CartItem | null>(null);
  const { items, removeItem, updateQuantity } = useCartStore();

  const onUpdateQuantity = useCallback(
    (id: number, newQuantity: number) => {
      if (newQuantity < 1) {
        const item = items.find((item) => item.id === id);
        if (item) setItemToRemove(item);
        return;
      }
      updateQuantity(id, newQuantity);
      toast.success(`商品數量已更新`);
    },
    [items, updateQuantity]
  );

  const onRemoveItem = useCallback(
    (id: number) => {
      const item = items.find((item) => item.id === id);
      if (item) setItemToRemove(item);
    },
    [items]
  );

  const onConfirmRemoveItem = useCallback(() => {
    if (!itemToRemove) return;
    removeItem(itemToRemove.id);
    toast.success(`商品已從購物車中移除`);
  }, [removeItem, itemToRemove]);

  return (
    <>
      <ScrollArea className='flex-grow'>
        {items.map((item) => (
          <ShoppingCartItem
            key={item.id}
            item={item}
            updateQuantity={onUpdateQuantity}
            removeItem={onRemoveItem}
          />
        ))}
      </ScrollArea>
      <AlertDialog
        open={!!itemToRemove}
        onOpenChange={() => setItemToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>移除購物車商品</AlertDialogTitle>
            <AlertDialogDescription>
              您確定要從購物車中移除 <strong>{itemToRemove?.title}</strong> 此商品嗎？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>後悔了</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmRemoveItem}>確認</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

interface ShoppingCartItemProps {
  item: CartItem;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
}

const ShoppingCartItem = ({ item, updateQuantity, removeItem }: ShoppingCartItemProps) => {
  return (
    <div
      key={item.id}
      className='flex items-center py-4 border-b'>
      <BlurImage
        src={item.thumbnail}
        alt={item.title}
        width={50}
        height={50}
        className='rounded-md mr-4'
        loading='lazy'
      />
      <div className='flex-grow'>
        <h3 className='font-semibold text-balance line-clamp-2'>{item.title}</h3>
        <p className='text-sm text-muted-foreground'>${item.price.toFixed(2)}</p>
      </div>
      <div className='flex items-center space-x-1'>
        <Button
          variant='outline'
          size='icon'
          className='w-6 h-6'
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          aria-label={`Decrease quantity of ${item.title}`}>
          <Minus className='h-3 w-3' />
        </Button>
        <Input
          type='number'
          min='1'
          value={item.quantity}
          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
          className='w-12 h-6 text-center p-1'
          aria-label={`Quantity of ${item.title}`}
        />
        <Button
          variant='outline'
          size='icon'
          className='w-6 h-6'
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          aria-label={`Increase quantity of ${item.title}`}>
          <Plus className='h-3 w-3' />
        </Button>
        <Button
          variant='destructive'
          size='icon'
          className='w-6 h-6'
          onClick={() => removeItem(item.id)}
          aria-label={`Remove ${item.title} from cart`}>
          <X className='h-3 w-3' />
        </Button>
      </div>
    </div>
  );
};
