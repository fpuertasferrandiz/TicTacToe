import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface State {
    turn: string;
    values: string[][];
    movements: number;
    hasWinner: boolean;
  }

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _state$: BehaviorSubject<State>;

  constructor() {

    const initialState = {
      turn: 'PLAYERX',
      values: [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
      ],
      movements : 0,
      hasWinner : false
    };

    this._state$ = new BehaviorSubject(initialState);

  }

  get state$ (): BehaviorSubject<State> {
    return this._state$;
  }

  get state (): State {
    return this._state$.getValue();
  }

  set state (state: State) {
    this._state$.next(state);
  }

  updateValue(row, col) {
    if (this.state.values[row][col] === '-') {
      const newValue = this.state.turn === 'PLAYERX' ? 'X' : '0';
      const newTurn = this.state.turn === 'PLAYERX' ? 'PLAYER0' : 'PLAYERX';
       this.state.movements++;
      this.state.values[row][col] = newValue;
      if (this.hasWinner()) {
        this.state.hasWinner = true;
        this._state$.next(this.state);
        return;
      }
      this.state.turn = newTurn;
      this._state$.next(this.state);
    }
  }


  reset() {
    this.state = {
      turn: 'PLAYERX',
      values: [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
      ],
      movements : 0,
      hasWinner : false
    };
  }

  private hasWinner(): boolean {
    const tablero: string[][] = this.state.values;
    let primerValor = '';
    let contador = 0;
    /**
     * recorremos por filas para localizar un ganador
     */
    for (let i = 0; i < tablero.length; i++) {
      primerValor = tablero[i][0];
      contador = 0;
      for (let j = 0; j < tablero[i].length; j++) {
        const valor = tablero[i][j];
        if (primerValor === valor && valor !== '-') {
          contador++;
        }
      }
      if (contador === 3) {
        return true;
      }
    }
    /**
     * recorremos por columnas
     */
    for (let i = 0; i < tablero.length; i++) {
      primerValor = tablero[0][i];
      contador = 0;
      for (let j = 0; j < tablero[i].length; j++) {
        const valor = tablero[j][i];
        if (primerValor === valor && valor !== '-') {
          contador++;
        }
      }
      if (contador === 3) {
        return true;
      }
    }
    /**
     * recorrido en diagonal
     */
    primerValor = tablero[0][0];
    contador = 0;
    for (let i = 0; i < tablero.length; i++) {
      const valor = tablero[i][i];
      if (primerValor === valor && valor !== '-') {
        contador++;
      }
      if (contador === 3) {
        return true;
      }
    }
    /**
     * recorrido en diagonal
     */
    primerValor = tablero[0][2];
    contador = 0;
    for (let i = 0; i < tablero.length; i++) {
      const j = 2 - i;
      const valor = tablero[i][j];
      if (primerValor === valor && valor !== '-') {
        contador++;
      }
      if (contador === 3) {
        return true;
      }
    }
    return false;
  }

}
