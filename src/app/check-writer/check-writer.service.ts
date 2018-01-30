import { Injectable } from '@angular/core';

@Injectable()
export class CheckWriterService {
  private readonly ONES = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  private readonly TENS = ['ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  private readonly UNIQUE = ['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  private readonly SUFFIX = ['thousand', 'million', 'billion'];

  writeCheck(input: String): String {
    return this.translateCurrencyToEnglish(
      this.parseCurrency(this.convertToFloat(input)));
  }

  convertToFloat(stringInput: String): number {
    return parseFloat(stringInput.replace(new RegExp(',', 'g'), ''));
  }

  parseCurrency(value: number): any {
    return {dollars: Math.floor((value * 100) / 100),
      cents: Math.round((value * 100) % 100)};
  }

  translateCurrencyToEnglish(parsedCurrency: any): String {
    const integerGroups = [];
    let remainder = parsedCurrency.dollars;
    let counter = 0;
    let result = '';

    while (remainder > 0) {
      const valueString = this.translateIntegerToEnglish(Math.floor(remainder % 1000));
      integerGroups.unshift(valueString + ((counter > 0 && valueString !== '') ? this.SUFFIX[counter - 1] : ''));
      remainder = Math.floor(remainder / 1000);
      counter++;
      }

    result = integerGroups.join(' ').replace(/\s+/g, ' ')
    .trim() +
    (parsedCurrency.dollars > 0 ? (parsedCurrency.dollars > 1 ? ' dollars' : ' dollar') : 'No dollars') +
    (parsedCurrency.cents > 0 ? ' and ' + parsedCurrency.cents + '/100' : ' only');

    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  private translateIntegerToEnglish(value: number): String {
    let remainder = value;
    let groupString = '';

    while (remainder !== 0) {
      // hundreds place
      if (Math.floor(remainder / 100) > 0) {
        groupString += this.ONES[Math.floor(remainder / 100) - 1] + ' hundred ';
        remainder = Math.floor(remainder % 100);
      } else if (remainder > 9) {
      // TENS place
        // check unique teen values
        if (remainder > 10 && remainder < 20) {
          groupString += this.UNIQUE[remainder - 11] + ' ';
          break;
        } else {
          // else, just get the TENS place
          groupString += this.TENS[Math.floor(remainder / 10) - 1] + ' ';
          remainder = Math.floor(remainder % 10);
        }
      } else if (remainder <= 9) {
        // ONES place
        groupString += this.ONES[remainder - 1] + ' ';
        break;
      }
    }

    return groupString;
  }
}
