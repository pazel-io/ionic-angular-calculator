import { Component, OnDestroy } from '@angular/core';
import { buttonsRows } from '../utils/buttons';
import { Button } from '../utils/Button';
import { ComponentStore } from '@ngrx/component-store';
import { Subscription } from 'rxjs';

interface CalculatorState {
  title: string;
  sumHistory: string;
  sum: string;
}

const initialState = {
  title: '_______',
  sumHistory: 'Ionic Calculator',
  sum: '0',
};

const evaluate = (value): number => Function('"use strict";return (' + value + ')')();

const formatNumber = (value: string) => {
  const [whole, fraction] = value.split('.');
  const formattedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return fraction ? [formattedWhole, fraction].join('.') : formattedWhole;
};


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {
  public state: CalculatorState;
  public buttonsRows: Button[][] = buttonsRows;
  private componentStoreSub$$: Subscription;

  constructor(private readonly componentStore: ComponentStore<CalculatorState>) {
    this.componentStore.setState(initialState);
    this.componentStoreSub$$ = this.componentStore.state$.subscribe(state => this.state = state);
  }

  public ngOnDestroy() {
    this.componentStoreSub$$.unsubscribe();
  }

  public handleClick = (event: MouseEvent, button: Button) => {

    const tempSumHistory = this.state.sumHistory.replace(initialState.sumHistory, '');

    if (button.value === '=') {
      return this.calculate();
    }
    if (button.value === 'C') {
      return this.reset();
    }
    if (button.value === 'Del') {
      this.backspace();
      return this.calculate();
    }

    this.componentStore.setState({
      ...this.state,
      sumHistory: tempSumHistory + button.value,
    });
    button.shake = true;
    setTimeout(() => {
      button.shake = false;
    }, 500);
    return this.calculate();
  };

  private reset = () => {
    this.componentStore.setState(initialState);
  };

  private backspace = () => {
    const sumHistory = this.state.sumHistory.substr(0, this.state.sumHistory.length - 1);
    return this.componentStore.setState({...this.state, sumHistory});
  };

  private calculate = () => {
    try {
      const sum = evaluate(this.state.sumHistory);
      const formattedSum = formatNumber(sum.toString());
      return this.componentStore.setState({
        ...this.state,
        title: initialState.sumHistory,
        sum: formattedSum,
      });
    } catch (e) {
    }
  };

}
