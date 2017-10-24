import { CloutCompanionPage } from './app.po';

describe('clout-companion App', () => {
  let page: CloutCompanionPage;

  beforeEach(() => {
    page = new CloutCompanionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
