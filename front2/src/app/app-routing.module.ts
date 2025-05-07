import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { PainelComponent } from './pages/painel/painel.component';
import { DetalheComponent } from './pages/detalhe/detalhe.component';

const routes: Routes = [
  { path: '', component: FormularioComponent },
  { path: 'painel', component: PainelComponent },
  { path: 'detalhe/:id', component: DetalheComponent },
  { path: '**', redirectTo: '' } // redireciona se rota não existir
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
