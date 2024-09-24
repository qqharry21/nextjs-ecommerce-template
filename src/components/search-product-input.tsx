'use client';

import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import useDebounce from '@/hooks/useDebounce';
import { CommandLoading, useCommandState } from 'cmdk';
import { Search, Shirt } from 'lucide-react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { DialogDescription, DialogTitle } from './ui/dialog';

const useProducts = ({ search }: { search: string }) => {
  // let url = 'https://dummyjson.com/products';
  const queryKey = ['products'];
  if (search) {
    // url += `/search?q=${search}`;
    // queryKey.push(search);
  }
  return useQuery(queryKey, {
    queryFn: async () => {
      const data = await fetch('https://dummyjson.com/products').then((res) => res.json());
      return data.products;
    },
  });
};

export const SearchProductInput = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  const { data, isFetching, isError } = useProducts({ search: debouncedSearch });

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    setSearchTerm('');
  };

  return (
    <>
      <Button
        variant='outline'
        role='combobox'
        className='md:w-[200px] size-9 max-md:p-0 md:justify-between md:text-foreground/50'
        onClick={toggleSearch}>
        <span className='max-md:hidden'>搜尋商品...</span>
        <Search className='md:ml-2 h-4 w-4' />
      </Button>
      <CommandDialog
        open={isSearchOpen}
        onOpenChange={setIsSearchOpen}>
        <DialogTitle className='sr-only'>搜尋商品</DialogTitle>
        <DialogDescription className='sr-only'>輸入商品名稱以搜尋。</DialogDescription>
        <CommandInput
          placeholder='搜尋商品...'
          value={searchTerm}
          onValueChange={setSearchTerm}
        />
        <CommandList>
          {isFetching ? (
            <CommandLoading>
              <div className='animate-pulse w-full h-6 rounded-md' />
            </CommandLoading>
          ) : isError ? (
            <CommandEmpty>查詢失敗。</CommandEmpty>
          ) : data.length === 0 ? (
            <SearchProductEmpty />
          ) : (
            <CommandGroup>
              {data.map((product: any) => (
                <CommandItem
                  key={product.id}
                  keywords={[product.title, product.category, product?.brand ?? '']}
                  onSelect={() => {
                    setSearchTerm(product.title);
                    setIsSearchOpen(false);
                  }}>
                  <Shirt className='mr-2 h-4 w-4' />
                  <span>{product.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

const SearchProductEmpty = () => {
  const search = useCommandState((state) => state.search);
  return (
    <CommandEmpty>
      {search.length === 0 ? (
        <div className='flex items-center justify-center'>
          <Search className='h-4 w-4 text-foreground/80 mr-2' />
          <p>請輸入商品名稱以搜尋。</p>
        </div>
      ) : (
        `目前找不到 "${search}" 相關產品。`
      )}
    </CommandEmpty>
  );
};
