import { Component } from '@angular/core';
import { buttonsRows } from '../utils/buttons';
import { Button } from '../utils/Button';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public buttonsRows: Button[][] = buttonsRows;
  public title = '_______';
  public sumHistory = 'Ionic Calculator';
  public sum = '0';

  public sumToString(sum: string) {
    console.log('sumToString', sum, sum.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    return sum.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  public reset = () => {
    this.title = '_______';
    this.setSumHistory('Ionic Calculator');
    this.setSum('0');
  };

  public backspace = () => {
    const tempSum = this.sumHistory.substr(0, this.sumHistory.length -1);
    this.setSumHistory(tempSum);
  };

  public handleClick = (e, operator) => {

    const tempSumHistory = this.sumHistory.replace('Ionic Calculator', '');

    if (operator === '=') {
      this.calculate();
    } else if (operator === 'C') {
      this.reset();
    } else if (operator === 'Del') {
      this.backspace();
    } else {
      this.setSumHistory(tempSumHistory + operator);
      e.target.classList.add('animate__headShake');

      setTimeout(() => {
        e.target.classList.remove('animate__headShake');
      }, 500);
    }
  };

  private calculate = () => {
    try {
      this.setSum(this.sumHistory.length > 5 ?
        Number(this.sumHistory).toFixed(4) : this.sumHistory);
      this.title = 'Ionic Calculator';
    } catch (e) {
    }
  };

  private setSum(sum: string): string {
    return this.sum = sum;
  }

  private setSumHistory(sumHistory: string): string {
    return this.sumHistory = sumHistory;
  }

}
