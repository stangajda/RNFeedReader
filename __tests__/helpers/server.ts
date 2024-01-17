import {http, HttpResponse} from 'msw';
import {setupServer} from 'msw/node';
import {IMoviesResponse} from '@src/interfaces';

const server = setupServer();

export function setupMockServer() {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());
}

export function mockResponse(response: IMoviesResponse) {
  const {result, status} = response;
  server.use(
    http.get('*/trending/movie/day', () => {
      return HttpResponse.json(result, {status});
    }),
  );
}
