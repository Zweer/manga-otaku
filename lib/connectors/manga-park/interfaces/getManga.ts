export interface MangaParkGetManga {
  data: {
    get_comicNode: {
      data: {
        artists?: string[];
        authors?: string[];
        chaps_normal?: number;
        chaps_others?: number;
        dateCreate?: number;
        extraInfo?: string;
        genres?: string[];
        id: string;
        name?: string;
        originalStatus: 'ongoing' | 'completed';
        score_avg?: number;
        sfw_result?: boolean;
        slug?: string;
        summary?: string;
        urlCover300?: string;
        urlCover600?: string;
        urlCover900?: string;
        urlCoverOri?: string;
        urlPath?: string;
      };
    },
    get_comicChapterList: {
      data: {
        dateCreate?: number;
        dname?: string;
        imageFile?: {
          urlList?: string[];
        };
        serial?: number;
        sfw_result?: boolean;
        title?: string;
        urlPath?: string;
      }
    }[]
  };
}
