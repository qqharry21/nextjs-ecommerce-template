import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const DesktopMenu = () => {
  return (
    <div className='mr-4 hidden md:flex'>
      <Link
        className='mr-6 flex items-center space-x-2'
        href='#'>
        <span className='hidden font-bold sm:inline-block'>HAO Store</span>
      </Link>
      <nav className='flex items-center space-x-6 text-sm font-medium'>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>服飾</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                  <li className='row-span-3'>
                    <NavigationMenuLink asChild>
                      <Link
                        className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                        href='/products?filter=new-season'>
                        <Star className='h-6 w-6 -rotate-12' />
                        <div className='mb-2 mt-4 text-lg font-medium'>本季新品</div>
                        <p className='text-sm leading-tight text-muted-foreground'>
                          精選本季最新款服飾，讓您時尚不落伍。
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <ListItem
                    href='/products?filter=men'
                    title='男裝'>
                    含有男裝的所有商品，包括上衣、褲子、鞋子、配件等等。
                  </ListItem>
                  <ListItem
                    href='/products?filter=women'
                    title='女裝'>
                    含有女裝的所有商品，包括上衣、裙子、鞋子、配件等等。
                  </ListItem>
                  <ListItem
                    href='/products?filter=accessories'
                    title='配件'>
                    各種配件，包括帽子、眼鏡、包包、手錶等等。
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>品牌</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'></ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href='/docs'
                legacyBehavior
                passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  聯絡我們
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}>
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-xs leading-snug text-muted-foreground'>{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
