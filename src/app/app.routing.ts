import { ContatoComponent } from './contato/contato.component';
import { PregacaoAudioComponent } from './pregacao-audio/pregacao-audio.component';
import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from 'src/app/_helpers/auth.guard';
import { SobreComponent } from './sobre/sobre.component';
import { PresentationComponent } from './presentation/presentation.component';
import { PregacaoReproducaoComponent } from './pregacao-reproducao/pregacao-reproducao.component';
import { BoletimEletronicoComponent } from './boletim-eletronico/boletim-eletronico.component';
import { BibliaComponent } from './biblia/biblia.component';

export const routes: Routes = [
    {
        path: '', component: LoginComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'home', component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '', component: PresentationComponent
            },  {
                path: 'pregacao', component: PregacaoAudioComponent,
                canActivate: [AuthGuard]
            }, {
                path: 'sobre', component: SobreComponent,
                canActivate: [AuthGuard]
            }, {
                path: 'contato', component: ContatoComponent,
                canActivate: [AuthGuard]
            }, {
                path: 'reproduzir-audio', component: PregacaoReproducaoComponent,
                canActivate: [AuthGuard]
            }, {
                path: 'boletim-eletronico', component: BoletimEletronicoComponent,
                canActivate: [AuthGuard]
            }, {
                path: 'biblia', component: BibliaComponent,
                canActivate: [AuthGuard]
            }
        ]
    }
];
