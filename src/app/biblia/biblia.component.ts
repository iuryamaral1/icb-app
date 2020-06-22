import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/config';

@Component({
  selector: 'app-biblia',
  templateUrl: './biblia.component.html',
  styleUrls: ['./biblia.component.css']
})
export class BibliaComponent {

  books: any = [];
  chapters: number[] = [];
  headers = {
    token: config.token_bible_api,
  };
  bookSelected: any = null;
  chapterSelected: any = null;
  verses: any = [];

  constructor(public http: HttpClient) {
    this.http.get(`${config.bible_url_api}/books`, { headers: this.headers })
        .subscribe(res => {
          this.books = res;
          this.bookSelected = this.books[0];
          this.loadChaptersAndFirstOneText();
        });
  }

  loadChaptersAndFirstOneText(): void {
    if (this.chapters) { this.chapters = []; }
    const chaptersQtd = this.bookSelected.chapters;
    for (let i = 1; i <= chaptersQtd; i++) {
      this.chapters.push(i);
    }

    this.chapterSelected = 1;

    const abbrev = this.bookSelected.abbrev.pt;

    // https://bibleapi.co/api/verses/:version/:abbrev/:chapter

    this.http.get<any>(`${config.bible_url_api}/verses/acf/${abbrev}/1`)
      .subscribe(res =>
        this.verses = res.verses
      );
  }

  loadText(): void {
    if (this.chapterSelected) {
      const abbrev = this.bookSelected.abbrev.pt;
      this.http.get<any>(`${config.bible_url_api}/verses/acf/${abbrev}/${this.chapterSelected}`)
      .subscribe(res =>
        this.verses = res.verses
      );
    }
  }
}
