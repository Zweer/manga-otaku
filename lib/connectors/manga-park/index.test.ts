import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { MangaParkConnector } from '.';

describe('libs -> connectors -> Manga Park', () => {
  let connector: MangaParkConnector;
  const axiosMock = new MockAdapter(axios);

  axiosMock
    .onPost('apo/', {
      asymmetricMatch: ({ operationName, variables }: { operationName: string; variables: { select: { page: number } } }) =>
        operationName === 'getMangas'
    })
    .reply(200, require('./mocks/getMangas.json'))
    .onPost('apo/', {
      asymmetricMatch: ({ operationName }: { operationName: string; }) =>
        operationName === 'getManga'
    })
    .reply(200, require('./mocks/getManga.json'));

  beforeEach(() => {
    connector = new MangaParkConnector();
  });

  afterAll(() => {
    axiosMock.restore();
  })

  it('should retrieve the list of mangas', async () => {
    const mangas = await connector.getMangas();

    expect(mangas).toHaveLength(1);
    expect(mangas).toHaveProperty('0.title', 'One Piece');
  });

  it('should retrieve one single manga', async () => {
    const manga = await connector.getManga('10953');

    expect(manga).toHaveProperty('title', 'One Piece');
    expect(manga.chapters).toHaveLength(2);
    expect(manga).toHaveProperty('chapters.0.title', 'Romance Dawn');
  });
});
