'use client';

import { useLiveQuery } from 'dexie-react-hooks';
import { RefreshCw } from 'lucide-react';
import { useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { db } from '@/db';

export default function Connectors() {
  const connectors = useLiveQuery(() => db.connectors.toArray());
  const [loadingIndices, setLoadingIndices] = useState(new Set<number>());

  async function fetch(slug: string, index: number) {
    console.log(slug)

    setLoadingIndices((prev) => new Set([...prev, index]));

    setTimeout(() => {
      setLoadingIndices((prev) => {
        const updated = new Set(prev);
        updated.delete(index);
        return updated;
      });
    }, 5000);
  }

  return (
    <div>
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">Connectors</h1>
        <span className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl" data-br=":ri:" data-brr="1">
          Bring your collection to life, retrieve mangas from your favourite website.
        </span>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {connectors?.map((connector, index) => (
          <Card key={connector.slug}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className="text-sm font-medium">
                <h3 className='font-semibold leading-none tracking-tight'>{connector.name}</h3>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className='grid gap-1'>
                <li className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>Updated at:</span>
                  <span>{connector.updatedAt ? connector.updatedAt.toLocaleString() : 'never'}</span>
                </li>
                <li className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>Mangas:</span>
                  <span>{connector.mangaCount ? connector.mangaCount : '???'}</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between">
              {loadingIndices.has(index) ? (
                <RefreshCw className='animate-spin' />
              ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button>
                    <RefreshCw /> Fetch
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will fetch the ENTIRE {connector.name} website.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => fetch(connector.slug, index)}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              )}
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
