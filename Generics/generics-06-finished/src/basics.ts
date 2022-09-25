// Generics Basics

// Ex. 1

function returnGenericValue<T>(value: T): T {
  return value;
}

returnGenericValue(10);
returnGenericValue(false);

// Ex. 2

function returnLastValue<T>(arr: T[]): T {
  return arr[arr.length - 1];
}

returnLastValue([1, 2, 3]);
returnLastValue(["hi", "hello", "hi"]);

function returnLengthOfArray<T>(arr: T[]): number {
  return arr.length;
}

returnLengthOfArray([1, 2, 3]);
returnLengthOfArray(["hi", "hello", "hi"]);

// Ex. 3

function createArray<T, U>(value: T, value2: U): [T, U] {
  // this now returns a tuple
  return [value, value2];
}

createArray("hi", 8);

// Ex. 4 Overwrite inferences

function createNewArray<T, U = number>(value: T, value2: U): [T, U] {
  // this now returns a tuple
  return [value, value2];
}

createNewArray<string | null, number>("hi", 8); // You dont need to set default value to number (U = number)
createNewArray<string | null>("hi", 8); // if you override the first value you have to add a default value to the second

// Ex. 5 Extends with Objects

interface Person {
  firstName: string;
  lastName: string;
}

function createFullName<
  T extends { firstName: string; lastName: string } // Person (can also extend Person)
>(obj: T) {
  return {
    ...obj,
    fullName: obj.firstName + obj.lastName,
  };
}

createFullName({ firstName: "hamel", lastName: "desai", age: 20 });

// Ex. 5 Extends with Interfaces

interface Tab<T> {
  id: string;
  position: number;
  data: T;
}

type NumberTab = Tab<number>; // same thing as type NumberTab = {id: string; position: string; data: number }
type StringTab = Tab<string>;
