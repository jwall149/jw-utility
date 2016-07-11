class Counter {
  constructor() {
    this.counter = 0;
  }
  get() {
    this.counter++;
    return this.counter;
  }
}

export default Counter;
