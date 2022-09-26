// Abstract keyword

// Saying you can never instantiate this class directly
abstract class StreetFigher {
  constructor() {}

  move() {}
  fight() {
    console.log(`${this.name} attacks with ${this.getSpecialAttack()}`);
  }

  abstract get name(): string;

  abstract getSpecialAttack(): string;
}

class Ryu extends StreetFigher {
  getSpecialAttack(): string {
    return "Hadoken";
  }

  get name() {
    return "Ryu";
  }
}

// const ryu = new StreetFigher(); // this will give you an error

const ryu = new Ryu();
console.log(ryu.getSpecialAttack());
console.log(ryu.fight());
