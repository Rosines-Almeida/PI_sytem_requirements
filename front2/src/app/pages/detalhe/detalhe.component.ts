import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequisitoService } from 'src/app/services/requisito.service';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css'],
})
export class DetalheComponent implements OnInit {
  requisito: any;

  constructor(private route: ActivatedRoute, private router: Router, private requisitoService: RequisitoService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const dados = JSON.parse(localStorage.getItem('requisitos') || '[]');
    // this.requisito = dados.find((r: any) => r.id === id);
    this.getRequisito(id);
  }
  getRequisito(id: number) {
    this.requisitoService.getRequisito(id).subscribe({
      next: (res) => {
        this.requisito = res;
      },
      error: (err) => {
        console.error('Erro ao buscar requisito:', err);
        alert('Erro ao carregar requisito.');
      }
    });
  }
  voltar() {
    this.router.navigate(['/painel']);
  }
}
