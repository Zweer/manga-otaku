export interface MangaParkGetMangas {
  data: {
    get_searchComic: {
      paging: {
        page: number;
        pages: number;
      };
      items: {
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
      }[];
    };
  };
}
