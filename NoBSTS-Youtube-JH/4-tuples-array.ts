// Tuples

type ThreeDCoordinate = [x: number, y: number, z: number];

function add3DCoordinate(
  c1: ThreeDCoordinate,
  c2: ThreeDCoordinate
): ThreeDCoordinate {
  return [c1[0] + c2[0], c1[1] + c2[1], c1[2] + c2[2]];
}

console.log(add3DCoordinate([0, 100, 0], [10, 20, 30]));

function simpleStateString(
  initialValue: string
): [() => string, (someValue: string) => void] {
  return [
    () => initialValue,
    (someVal: string) => {
      initialValue = someVal;
    },
  ];
}

const [str1getter, str1setter] = simpleStateString("hello");
const [str2getter, str2setter] = simpleStateString("jack");
console.log(str2getter());
console.log(str1getter());
str1setter("goodbye");
console.log(str1getter());
console.log(str2getter());
