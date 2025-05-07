import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequisitoService } from 'src/app/services/requisito.service';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css'],
})
export class PainelComponent implements OnInit {
  requisitos: any[] = [];
  filtrados: any[] = [];

  // Filtros
  filtroProjeto = '';
  filtroTipo = '';

  // Opções dos filtros
  projetos: any[] = ['Projeto A', 'Projeto B', 'Projeto C'];
  tipos: string[] = ['Funcional', 'Não funcional'];

  constructor(private router: Router, private requisitoService: RequisitoService) {}

  ngOnInit() {
    const dados = JSON.parse(localStorage.getItem('requisitos') || '[]');
    this.requisitos = dados;
    this.filtrados = dados;

    // Preenche lista de projetos únicos
    // this.projetos = [...new Set(dados.map((r: any) => r.projeto))];
    this.carregarRequisitos();
  }

  carregarRequisitos() {
    this.requisitoService.getRequisitos().subscribe({
      next: (res) => { 
        this.requisitos = res;
        this.filtrar();
      },

      error: (err) => {
        console.error('Erro ao buscar requisitos:', err);
        alert('Erro ao carregar requisitos.');
      }
    });
  }

  filtrar() {
    this.filtrados = this.requisitos.filter(req => {
      const combinaProjeto = this.filtroProjeto ? req.projeto === this.filtroProjeto : true;
      const combinaTipo = this.filtroTipo ? req.tipo === this.filtroTipo : true;
      return combinaProjeto && combinaTipo;
    });
  }

  verDetalhes(id: number) {
    console.log('id do requisito:', id); 
    this.router.navigate(['/detalhe', id]);
  }
}
