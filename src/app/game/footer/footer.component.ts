import { Component, OnInit } from '@angular/core';
import { StateService, State } from '../state.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  private _stateService: StateService;
  private estado: State;
  private movimientos: number;

  constructor(stateService: StateService) {
    this._stateService = stateService;
  }

  ngOnInit() {
    this._stateService.state$.subscribe((data) => {
      this.estado = data;
      if (this.estado.turn === 'PLAYERX') {
        this.movimientos = this.estado.movementsX;
      } else {
        this.movimientos = this.estado.movementsO;
      }
    });
  }

}
