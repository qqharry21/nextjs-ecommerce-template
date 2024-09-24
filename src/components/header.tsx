import { DesktopMenu } from './desktop-menu';
import { MobileMenu } from './mobile-menu';
import { SearchProductInput } from './search-product-input';
import { ShoppingCartSheet } from './shopping-cart/shopping-cart-sheet';

export const Header = () => {
  return (
    <header className='sticky top-0 z-50 w-full bg-background'>
      <div className='container gap-4 justify-between flex h-16 items-center'>
        <MobileMenu />
        <DesktopMenu />
        <div className='flex flex-1 items-center space-x-2 justify-end'>
          <SearchProductInput />
          <ShoppingCartSheet />
        </div>
      </div>
    </header>
  );
};
