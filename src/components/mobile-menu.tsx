'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Sheet
      open={isMenuOpen}
      onOpenChange={setIsMenuOpen}>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='md:hidden'>
          <Menu className='h-6 w-6' />
          <span className='sr-only'>Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className='flex flex-col space-y-4 mt-4'>
          <Link
            className='transition-colors hover:text-foreground/80 text-foreground/60'
            href='#'>
            Home
          </Link>
          <Link
            className='transition-colors hover:text-foreground/80 text-foreground/60'
            href='#'>
            Shop
          </Link>
          <Link
            className='transition-colors hover:text-foreground/80 text-foreground/60'
            href='#'>
            About
          </Link>
          <Link
            className='transition-colors hover:text-foreground/80 text-foreground/60'
            href='#'>
            Contact
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
