import { ContatoComponent } from './contato/contato.component';
import { PregacaoAudioComponent } from './pregacao-audio/pregacao-audio.component';
import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from 'src/app/_helpers/auth.guard';
import { SobreComponent } from './sobre/sobre.component';
import { PresentationComponent } from './presentation/presentation.component';

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
            }
        ]
    }
];
