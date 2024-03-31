'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Manga } from '@/db/models/manga';

export const columns: ColumnDef<Manga>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'genres',
    header: 'Genres',
    cell: (info) => {
      const genres = info.getValue() as string[];
      return <>{genres.map((genre) => <p key={genre}>{genre}</p>)}</>
    },
  },
  {
    accessorKey: 'chaptersCount',
    header: 'Chapters',
  },
  {
    accessorKey: 'isCompleted',
    header: 'Completed?',
  },
  {
    accessorKey: 'releasedAt',
    header: 'Release date'
  },
];
