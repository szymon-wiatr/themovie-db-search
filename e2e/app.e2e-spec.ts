import { MoviesAppPage } from './app.po';
import {} from 'jasmine';

describe('movies-app App', function() {
  let page: MoviesAppPage;

  beforeEach(() => {
    page = new MoviesAppPage();
  });

  it('should display message saying My Collection', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('My Collection');
  });
});
