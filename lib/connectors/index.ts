import axios from 'axios';

import { Manga, MangaWithChapters } from '@/db/models/manga';

export abstract class Connector {
  protected request = axios.create();

  abstract getMangas(): Promise<Manga[]>;
  abstract getManga(id: string): Promise<MangaWithChapters>;
}
