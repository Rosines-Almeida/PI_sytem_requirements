import { Component } from '@angular/core';
import { RequisitoService, Requisito } from 'src/app/services/requisito.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent {
  
  projeto = '';
  descricao = '';
  tipo = '';
  id = 0;
  titulo = ' ';
  date = Date.now();

  constructor(private requisitoService: RequisitoService) {}

  enviarFormulario() {
    const novoRequisito = {
      date: new Date().toISOString().split('T')[0], 
      projeto: this.projeto,
      descricao: this.descricao,
      tipo: this.tipo, 
      titulo: this.titulo,
      id: Math.floor(Math.random() * 10000) 
    };
    console.log(novoRequisito);

    const requisitos = JSON.parse(localStorage.getItem('requisitos') || '[]');
    requisitos.push(novoRequisito);
    localStorage.setItem('requisitos', JSON.stringify(requisitos));

   

    alert('Requisito adicionado com sucesso!');

    const novoRequisitoBack: Requisito = {
      tipo: this.tipo,
      projeto: this.projeto,
      titulo: this.titulo,
      descricao: this.descricao,
      dataEntrega: new Date().toISOString().split('T')[0],
    };

    this.requisitoService.criarRequisito(novoRequisitoBack).subscribe({
      next: (res:any) => {
        alert('Requisito salvo com sucesso!');
        this.tipo = '';
        this.projeto = '';
        this.titulo = '';
        this.descricao = '';
      },
      error: (err:any) => {
        console.error('Erro ao salvar:', err);
        alert('Erro ao salvar requisito.');
      }
    });

     // limpa o formulário
    //  this.tipo = '';
    //  this.projeto = '';
    //  this.descricao = '';
    //  this.titulo = '';
  
  }
}
