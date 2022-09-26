// Mapped Types

// type MyFlexibleDogInfo = {
//   name: string;
// } & Record<string, string>;

type MyFlexibleDogInfo = {
  // name: string;
  [key: string]: string | number;
};

const dog: MyFlexibleDogInfo = {
  name: "bob",
  breed: "havanese",
  age: 10,
};

interface DogInfo {
  name: string;
  age: number;
}

type OptionsFlag<Type> = {
  // basically take all the properties in Type and set them too booleans
  [Property in keyof Type]: boolean;
  // [Property in keyof Type]: null;
};

// Mapped the keys into booleans
type DogInfoOptions = OptionsFlag<DogInfo>;

type Listeners<Type> = {
  [Property in keyof Type as `on${Capitalize<string & Property>}Change`]?: (
    newValue: Type[Property]
  ) => void;
} & {
  [Property in keyof Type as `on${Capitalize<string & Property>}Delete`]?: (
    newValue: Type[Property]
  ) => void;
};

function listenToObject<T>(obj: T, listeners: Listeners<T>): void {
  throw "Needs to be implemented";
}

const lg: DogInfo = {
  name: "LG",
  age: 13,
};

type DogInfoListeners = Listeners<DogInfo>;

listenToObject(lg, {
  onNameChange: (v: string) => {},
  onAgeChange: (v: number) => {},
  onAgeDelete: () => {},
  //  onSubmit: () => {},
});
