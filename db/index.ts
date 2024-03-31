import Dexie, { Table } from 'dexie';

import { Connector } from './models/connector';
import { Manga } from './models/manga';

export class DB extends Dexie {
  connectors!: Table<Connector, number>;
  mangas!: Table<Manga, string>;

  constructor() {
    super('manga-otaku');

    this.version(1).stores({
      connectors: '++, name, slug, updatedAt, mangaCount',
      mangas: '++, &id, title, *genres',
    });

    this.on('populate', (transaction) => {
      transaction.table('connectors').bulkPut([
        { name: 'Manga Park', slug: 'manga-park' },
      ]);
    });
  }
}

export const db = new DB();
