'use client';

import { useLiveQuery } from "dexie-react-hooks";
import { AlertCircle } from 'lucide-react'
import Link from 'next/link';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';

import { db } from '@/db/db.model';

import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Browse() {
  const mangas = useLiveQuery(() => db.mangas.toArray());

  if (!mangas || mangas?.length === 0) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          You don&apos;t have any manga yet. Please retrieve a list from the <Link href="/connectors">connectors</Link> page.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={mangas} />
    </div>
  );
}
