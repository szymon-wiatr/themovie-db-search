import { browser, element, by } from 'protractor';

export class MoviesAppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('md-card-title.mat-card-title')).getText();
  }
}
