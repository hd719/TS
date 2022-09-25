// Must knows:

// 1. Types vs Interfaces (extentions)

// interface Animal { // THESE ARE MOSTLY USED
//   isAnimal: boolean;
// }

// interface Dog extends Animal {
//   doesBark: boolean;
//   isMammal: boolean;
// }

// interface Cat extends Animal {
//   doesBark: boolean;
//   isMammal: boolean;
// }

type Animal = {
  isAnimal: boolean;
};

type Dog = Animal & {
  doesBark: boolean;
  isMammal: boolean;
};

type Cat = Animal & {
  doesMeow: boolean;
  isMammal: boolean;
};
