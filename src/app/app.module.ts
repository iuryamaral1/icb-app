import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routing';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AuthService } from './login/auth.service';
import { HomeComponent } from './home/home.component';
import { PregacaoAudioComponent } from './pregacao-audio/pregacao-audio.component';
import { SobreComponent } from './sobre/sobre.component';
import { ContatoComponent } from './contato/contato.component';
import { PresentationComponent } from './presentation/presentation.component';
import { BibliaComponent } from './biblia/biblia.component';
import { VersaoBibliaComponent } from './biblia/versao-biblia/versao-biblia.component';
import { CapitulosBibliaComponent } from './biblia/capitulos-biblia/capitulos-biblia.component';
import { LivroBibliaComponent } from './biblia/livro-biblia/livro-biblia.component';
import { PregacaoReproducaoComponent } from './pregacao-reproducao/pregacao-reproducao.component';
import { PregacaoService } from './services/pregacao.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PregacaoAudioComponent,
    SobreComponent,
    ContatoComponent,
    PresentationComponent,
    BibliaComponent,
    VersaoBibliaComponent,
    CapitulosBibliaComponent,
    LivroBibliaComponent,
    PregacaoReproducaoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService, PregacaoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
