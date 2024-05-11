import { Connector } from '.';
import { MangaParkConnector } from './manga-park';

const connectors: Record<string, Connector> = {
  'manga-park': new MangaParkConnector(),
};

export default connectors;
