import './style.css';
import './index.less'
// import './index.html';
//index.js
class Animal {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}

const dog = new Animal('dog');

// console.log('12312');