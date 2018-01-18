/* eslint import/first: off */
import './common/initializer';
import { format } from 'date-fns';
import BezierEasing from 'bezier-easing';

class Main {
  constructor() {
    this.onDOMContentLoaded = this.onDOMContentLoaded.bind(this);
  }

  onDOMContentLoaded() {
    console.log(`DOMContentLoaded: ${format(new Date())}`);
  }
}

const main = new Main();
window.addEventListener('DOMContentLoaded', main.onDOMContentLoaded);

const easing = BezierEasing(0.19, 1, 0.22, 1);
for (let i = 0; i < 100; i += 1) {
  console.log(easing(i / 100));
}
