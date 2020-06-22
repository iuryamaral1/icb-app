import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { PregacaoService } from '../services/pregacao.service';
import { Pregacao } from '../pregacao-audio/pregacao.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pregacao-reproducao',
  templateUrl: './pregacao-reproducao.component.html',
  styleUrls: ['./pregacao-reproducao.component.css']
})
export class PregacaoReproducaoComponent implements OnInit, OnDestroy {

  @ViewChild('audioTag') audioTag: ElementRef<HTMLAudioElement>;
  @ViewChild('progressInfo') progressInfo: ElementRef<HTMLDivElement>;

  currentPregacao: Pregacao;
  audio: HTMLAudioElement = null;
  duration;
  currentTime;
  refreshIntervalId;
  playing: boolean;

  constructor(private pregacaoService: PregacaoService) { }

  ngOnInit() {
    this.pregacaoService.currentPregacaoMessage
          .subscribe(pregacao => {
            this.currentPregacao = pregacao;
            this.audio = new Audio();
            this.audio.src = pregacao.url;
            if (this.currentPregacao && this.currentPregacao.url !== undefined) {
              this.audioTag.nativeElement.play();
              this.audioTag.nativeElement.onloadeddata = () => {
                this.duration = this.fancyTimeFormat(this.audioTag.nativeElement.duration);
              };

              this.audioTag.nativeElement.onplaying = () => {
                this.playing = true;
                this.refreshIntervalId = setInterval(() => {
                  this.currentTime = this.fancyTimeFormat(this.audioTag.nativeElement.currentTime);
                  this.progressInfo.nativeElement.style.width = this.calculateProgressInfo();
                }, 1000);
              };
          }
      });
  }

  ngOnDestroy(): void {
    if (this.currentPregacao && this.currentPregacao.url !== undefined) {
      this.audioTag.nativeElement.pause();
      this.audioTag.nativeElement.currentTime = 0;
      this.audioTag.nativeElement.src = null;
      this.playing = false;
    }
  }

  fancyTimeFormat(time: number) {
    let hrs = Math.floor(time / 3600);
    let mins = Math.floor((time % 3600) / 60);
    let secs = Math.floor(time) % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = '';

    if (hrs > 0) {
        ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
    }

    ret += '' + mins + ':' + (secs < 10 ? '0' : '');
    ret += '' + secs;
    return ret;
  }

  calculateProgressInfo(): string {
    const currentTime = this.audioTag.nativeElement.currentTime;
    const duration = this.audioTag.nativeElement.duration;
    const result = currentTime / duration * 100;
    return Math.floor(result) + '%';
  }

  play(): void {
    this.audioTag.nativeElement.play();
    this.playing = true;
  }

  pause(): void {
    this.audioTag.nativeElement.pause();
    this.playing = false;
  }

  reload(): void {
    this.playing = false;
    this.currentTime = 0;
    this.audioTag.nativeElement.currentTime = 0;
    this.play();
  }

  minusFiveSec(): void {
    this.audioTag.nativeElement.currentTime = this.audioTag.nativeElement.currentTime - 5;
  }

  plusFiveSec(): void {
    this.audioTag.nativeElement.currentTime = this.audioTag.nativeElement.currentTime + 5;
  }
}
