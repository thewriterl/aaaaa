import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIngresso } from 'app/shared/model/ingresso.model';

@Component({
  selector: 'jhi-ingresso-detail',
  templateUrl: './ingresso-detail.component.html'
})
export class IngressoDetailComponent implements OnInit {
  ingresso: IIngresso;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ingresso }) => {
      this.ingresso = ingresso;
    });
  }

  previousState() {
    window.history.back();
  }
}
