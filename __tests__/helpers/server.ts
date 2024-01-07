import {http, HttpResponse} from 'msw';
import {setupServer} from 'msw/node';

const server = setupServer();

export function setupMockServer() {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());
}

export function mockResponse(data: any, status: number = 200) {
  server.use(
    http.get('*/trending/movie/day', () => {
      return HttpResponse.json(data, {status});
    }),
  );
}
