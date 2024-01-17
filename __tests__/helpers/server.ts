import {http, HttpResponse} from 'msw';
import {setupServer} from 'msw/node';
import {IMoviesResponse} from '@src/interfaces';

const server = setupServer();

export function setupMockServer() {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());
}

function createRequest(response: IMoviesResponse) {
  const {data = null, error = null, status = 200} = response;

  if (data === null && error === null) {
    return {
      result: {error: 'No data and no error provided'},
      status: 500,
    };
  }

  const errorMessage =
    error && error.error && error.error.message
      ? error.error.message
      : undefined;

  const result = errorMessage ? {error: errorMessage} : data;

  const validStatus =
    typeof status === 'number' && status >= 100 && status < 600 ? status : 500;

  return {result, status: validStatus};
}

function addMockHandler(url: string, result: any, status: number) {
  server.use(
    http.get(url, () => {
      return HttpResponse.json(result, {status});
    }),
  );
}

function mockApiResponse(url: string, response: IMoviesResponse) {
  const {result, status} = createRequest(response);
  addMockHandler(url, result, status);
}

export function mockMoviesListResponse(response: IMoviesResponse) {
  mockApiResponse('*/trending/movie/day', response);
}
