import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  private _stateService: StateService;
  constructor(stateService: StateService) {
    this._stateService = stateService;
  }

  ngOnInit() {
  }

  _reset() {
    this._stateService.reset();
  }
}
