import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'evento',
        loadChildren: () => import('./evento/evento.module').then(m => m.AaaaEventoModule)
      },
      {
        path: 'ingresso',
        loadChildren: () => import('./ingresso/ingresso.module').then(m => m.AaaaIngressoModule)
      },
      {
        path: 'usuario',
        loadChildren: () => import('./usuario/usuario.module').then(m => m.AaaaUsuarioModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class AaaaEntityModule {}
