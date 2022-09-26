class Lizard {
  constructor(public readonly name: string, public readonly age: number) {}
}

// can create public/private/protected variables

const lgg = new Lizard("LG", 13);
// lgg.name = "Foo";
console.log(lgg.name);

// Singleton meaning only 1 instance can exist
class LizardList {
  private lizards: Lizard[] = [];

  // Adding static creates 1 instance of the LizardList
  static instance: LizardList = new LizardList();

  // By making the constructor private you cannot instantiate more than 1 LizardList class
  private constructor() {}

  static addLizard(lizard: Lizard) {
    LizardList.instance.lizards.push(lizard);
  }

  getLizards() {
    return this.lizards;
  }
}

LizardList.instance; // can only access this 1 and only instance
// const newLL = new LizardList(); // Will throw an error cause the constructor is private

LizardList.addLizard(lgg);
console.log(LizardList.instance.getLizards());
