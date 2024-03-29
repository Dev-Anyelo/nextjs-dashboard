'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const WAIT_INTERVAL = 200;

export default function Search({ placeholder }: { placeholder: string }) {
  const { replace } = useRouter(); 
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`);

    //accessing the query string of the URL
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', '1');

    // if the search term is not empty, add it to the query string
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    console.log(params.toString());
    replace(`${pathname}?${params.toString()}`);
  }, WAIT_INTERVAL);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
