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
import { PregacaoReproducaoComponent } from './pregacao-reproducao/pregacao-reproducao.component';
import { PregacaoService } from './services/pregacao.service';
import { HttpClientModule } from '@angular/common/http';
import { BoletimEletronicoComponent } from './boletim-eletronico/boletim-eletronico.component';
import { VersionNamePipe } from './pipes/version-name.pipe';
import { VersiculoComponent } from './biblia/versiculo/versiculo.component';
import { BoletimService } from './services/boletim-service.service';
import { MonthNamePipe } from './pipes/mes-pipe.pipe';
import { DayNamePipe } from './pipes/day-pipe.pipe';
import { BoletimMensagemComponent } from './boletim-mensagem/boletim-mensagem.component';
import { ServiceWorkerModule } from '@angular/service-worker';

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
    PregacaoReproducaoComponent,
    BoletimEletronicoComponent,
    VersiculoComponent,
    VersionNamePipe,
    MonthNamePipe,
    DayNamePipe,
    BoletimMensagemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthService,
              PregacaoService,
              BoletimService,
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }
