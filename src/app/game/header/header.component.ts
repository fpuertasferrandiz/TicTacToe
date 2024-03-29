import { Component, OnInit } from '@angular/core';

import { StateService, State } from './../state.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private _state$: BehaviorSubject<State>;
  private _state: State;

  constructor(stateService: StateService) {
    this._state$ = stateService.state$;
  }

  ngOnInit() {
    this._state$.subscribe((data) => {
      this._state = data;
    });
  }
}
