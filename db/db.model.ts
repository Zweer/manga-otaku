import { Manga } from '@/lib/models/manga';
import Dexie, { Table } from 'dexie';

export class DB extends Dexie {
  mangas!: Table<Manga>;

  constructor() {
    super('manga-otaku');
  }
}

export const db = new DB();
