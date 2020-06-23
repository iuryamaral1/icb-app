import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/config';
import { format } from 'url';

@Component({
  selector: 'app-biblia',
  templateUrl: './biblia.component.html',
  styleUrls: ['./biblia.component.css']
})
export class BibliaComponent {

  books: any = [];
  chapters: number[] = [];
  headers = {
    Authorization: 'Bearer ' + config.token_bible_api,
  };
  bookSelected: any = null;
  chapterSelected: any = null;
  verses: any = [];
  versions: any = [];
  versionSelected: string;
  selectedVerses = [];
  isVerseSelected: boolean;

  constructor(public http: HttpClient) {
    this.http.get(`${config.bible_url_api}/books`, { headers: this.headers })
        .subscribe(res => {
          this.books = res;
          this.bookSelected = this.books[0];
          this.loadChaptersAndFirstOneText();
        });
    this.http.get(`${config.bible_url_api}/versions`, { headers: this.headers })
        .subscribe(res => {
          this.versions = res;
          this.versionSelected = 'acf';
        });
  }

  loadChaptersAndFirstOneText(): void {
    if (this.chapters) { this.chapters = []; }
    const chaptersQtd = this.bookSelected.chapters;
    for (let i = 1; i <= chaptersQtd; i++) {
      this.chapters.push(i);
    }

    this.loadText();
  }

  loadText(): void {

    if (!this.chapterSelected) {
      this.chapterSelected = 1;
    }

    if (!this.bookSelected) {
      this.bookSelected = this.books[0];
    }

    if (!this.versionSelected) {
      this.versionSelected = 'acf';
    }

    const abbrev = this.bookSelected.abbrev.pt;
    this.http.get<any>(`${config.bible_url_api}/verses/${this.versionSelected}/${abbrev}/${this.chapterSelected}`)
    .subscribe(res =>
      this.verses = res.verses
    );
  }

  displayShareOption(): boolean {
    return this.selectedVerses.length > 0;
  }

  shareSelectedVerses(): void {
    let formattedText = this.formatMessage();
    window.open('https://api.whatsapp.com/send?text=' + formattedText);
  }

  formatMessage(): string {
    let formattedText = '';
    this.selectedVerses.forEach(item => {
      formattedText = formattedText.concat(item.number + ' ' + item.text + '\n');
    });

    return formattedText;
  }

  onSelectVerse(verse: any) {
    const resultFilter = this.selectedVerses.filter(v => verse.number === v.number);
    if (resultFilter.length > 0) {
      // tslint:disable-next-line: forin
      resultFilter.forEach(item => {
        const indexOf = this.selectedVerses.indexOf(item);
        this.selectedVerses.splice(indexOf, 1);
      });
    } else {
      this.selectedVerses.push(verse);
      console.log(this.selectedVerses);
    }
  }
}
