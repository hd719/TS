// Immutability (compile time)

interface Cat {
  name: string;
  breed: string;
}

type ReadonlyCat = Readonly<Cat>;

function makeCat(name: string, breed: string): ReadonlyCat {
  return {
    name,
    breed,
  };
}

const cat1 = makeCat("Bob", "Tabby");

const reallyConst = [1, 2, 3] as const;
// reallyConst[0] = 1; Cannot work readonly value
