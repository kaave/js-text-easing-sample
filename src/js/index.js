/* eslint import/first: off */
import './common/initializer';
import { format } from 'date-fns';
import createEasing from 'bezier-easing';

const text = '吾輩は猫である名前はまだ無い';
const easing = createEasing(0.19, 1, 0.22, 1);
const intervalMsec = 3000;
const totalEasingMsec = intervalMsec / 2;
const textPositions = text.split('').map((_, i) => totalEasingMsec * easing(i / text.length));
// console.log(textPositions);
console.log(text.split('').map((_, i) => [i, easing(i / text.length)]));

function wait(msec) {
  return new Promise(resolve => setTimeout(() => resolve(), msec));
}

class Main {
  constructor() {
    this.onDOMContentLoaded = this.onDOMContentLoaded.bind(this);
  }

  onDOMContentLoaded() {
    const elements = Array.from(document.getElementsByClassName('-js-char-panel'));

    setInterval(() => {
      const changeChar = async (str, index) => {
        elements.forEach((element) => { element.innerHTML = str[index]; });
        const strLength = str.length;
        const nextIndex = index + 1;
        if (nextIndex < strLength) {
          await wait(textPositions[nextIndex] - textPositions[index]);
          changeChar(str, nextIndex);
        }
      };

      changeChar(text, 0);
      // for (let i = 0; i < 100; i += 1) {
      //   console.log(easing(i / 100));
      // }
    }, intervalMsec);
  }
}

const main = new Main();
window.addEventListener('DOMContentLoaded', main.onDOMContentLoaded);
