import { readFileSync, writeFileSync } from 'node:fs';

import axios from 'axios';

import { Connector } from '..';
import { Manga, MangaWithChapters } from '../../models/manga';
import { MangaParkGetMangas } from './interfaces/getMangas';
import { join } from 'node:path';
import { MangaParkGetManga } from './interfaces/getManga';

export class MangaParkConnector extends Connector {
  static BASE_URL = 'https://mangapark.net';

  constructor() {
    super();

    this.request = axios.create({
      baseURL: MangaParkConnector.BASE_URL,
      headers: {
        'x-origin': MangaParkConnector.BASE_URL,
        'x-referer': `${MangaParkConnector.BASE_URL}/`,
        'x-cookie': 'set=h=1;',
      },
    });
  }

  async getMangas(): Promise<Manga[]> {
    const mangas: Manga[] = [];
    const operationName = 'getMangas';
    const query = readFileSync(join(__dirname, 'graphql', 'getMangas.graphql'), { encoding: 'utf8' });
    const variables = {
      select: {
        page: 0,
        size: 1,
      },
    };

    for (let page = 1, run = true; run; page += 1) {
      variables.select.page = page;

      const { data } = await this.request.post<MangaParkGetMangas>('apo/', { operationName, query, variables });

      mangas.push(...data.data.get_searchComic.items.map((manga) => ({
        title: manga.data.name!,
        abstract: manga.data.summary,
        image: manga.data.urlCoverOri,
        url: `${MangaParkConnector.BASE_URL}${manga.data.urlPath}`,
        releasedAt: manga.data.dateCreate ? new Date(manga.data.dateCreate) : undefined,
        isCompleted: manga.data.originalStatus === 'completed',
        genres: manga.data.genres ?? [],
        score: manga.data.score_avg,
        chaptersCount: (manga.data.chaps_normal ?? 0) + (manga.data.chaps_others ?? 0),
      })));

      run = page > data.data.get_searchComic.paging.pages;
    }

    return mangas;
  }

  async getManga(id: string): Promise<MangaWithChapters> {
    const operationName = 'getManga';
    const query = readFileSync(join(__dirname, 'graphql', 'getManga.graphql'), { encoding: 'utf8' });
    const variables = {
      getComicNodeId: id,
      comicId: id,
    };

    const { data } = await this.request.post<MangaParkGetManga>('apo/', { operationName, query, variables });

    const manga: MangaWithChapters = {
      title: data.data.get_comicNode.data.name!,
      abstract: data.data.get_comicNode.data.summary,
      image: data.data.get_comicNode.data.urlCoverOri,
      url: `${MangaParkConnector.BASE_URL}${data.data.get_comicNode.data.urlPath}`,
      isCompleted: data.data.get_comicNode.data.originalStatus === 'completed',
      genres: data.data.get_comicNode.data.genres ?? [],
      score: data.data.get_comicNode.data.score_avg,
      chaptersCount: (data.data.get_comicNode.data.chaps_normal ?? 0) + (data.data.get_comicNode.data.chaps_others ?? 0),
      chapters: data.data.get_comicChapterList.map((chapter) => ({
        title: chapter.data.title!,
        index: chapter.data.serial!,
        url: chapter.data.urlPath!,
        releasedAt: chapter.data.dateCreate ? new Date(chapter.data.dateCreate) : undefined,
        images: chapter.data.imageFile?.urlList ?? [],
      }))
    };

    return manga;
  }
}
