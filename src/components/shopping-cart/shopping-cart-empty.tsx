import { ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export const ShoppingCartEmpty = () => {
  const router = useRouter();

  const onClick = () => {
    router.push('/products');
  };
  return (
    <div className='flex flex-col items-center justify-center flex-grow text-center'>
      <h3 className='text-xl font-bold mb-4'>你的購物車是空的</h3>
      <p className='text-muted-foreground mb-6 text-balance'>
        看起來您尚未將任何商品添加到購物車中。
      </p>
      <Button onClick={onClick}>
        <ShoppingBag className='mr-2 h-4 w-4' />
        開始購物
      </Button>
    </div>
  );
};
