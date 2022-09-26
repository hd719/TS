// Utility Types (Partial, Required, Pick, Omit, Record, Parameters, Constructor Params, ReturnType, and Instance Type)

interface MyUser {
  name: string;
  id: string;
  email?: string;
}

// interface MyUserOptional {
//   name?: string;
//   id?: string;
//   email?: string;
// }
type MyUserOptional = Partial<MyUser>;

const merge = (user: MyUser, overrides: MyUserOptional): MyUser => {
  return {
    ...user,
    ...overrides,
  };
};

console.log(
  merge({ name: "jack", id: "foo", email: "" }, { email: "test@gmail.com" })
);

type RequiredMyUser = Required<MyUser>;

type JustEmailAndName = Pick<MyUser, "email" | "name">;

type UserWithoutId = Omit<MyUser, "id">;

const mapById = (users: MyUser[]): Record<MyUser["id"], MyUser> => {
  return users.reduce((a, v) => {
    return {
      ...a,
      [v.id]: v,
    };
  }, {});
};

console.log(mapById([{ id: "foo", name: "mr.foo" }]));

// {
//   foo: {id: "foo", name: "mr.foo"}
// }

const mapByIdPropertyRemoved = (
  users: MyUser[]
): Record<string, UserWithoutId> => {
  return users.reduce((a, v) => {
    const { id, ...other } = v;
    return {
      ...a,
      [v.id]: other,
    };
  }, {});
};

console.log(mapByIdPropertyRemoved([{ id: "foo", name: "mr.foo" }]));

// {
//   foo: {, name: "mr.foo"}
// }

// Utility Part 2

type Name = {
  first: string;
  last: string;
};

function returnCompleteName(name: Name): Name & { fullName: string } {
  return {
    ...name,
    fullName: `${name.first} ${name.last}`,
  };
}
// T must extend a function the most easiest way to do is (T extends () => any, if you want to get more specific (...args: any[]) => any)
function permuteRows<T extends (...args: any[]) => any>(
  iteratorFunc: T,
  data: Parameters<T>[0][]
): ReturnType<T>[] {
  return data.map(iteratorFunc);
}

console.log(permuteRows(returnCompleteName, [{ first: "H", last: "D" }]));

class PersonWithFullName {
  public constructor(public name: Name) {}

  get fullName() {
    return `${this.name.first} ${this.name.last}`;
  }
}

//ConstructorParameters<T>[0] is referring to the constructor parameters that is being passed in the constructor
// <T extends new (...args: any[]) => any>: match any constructor because it has the new keyword compared the example above that will match any function
function createObjects<T extends new (...args: any[]) => any>(
  ObjectType: T,
  data: ConstructorParameters<T>[0][]
): InstanceType<T>[] {
  return data.map((item) => new ObjectType(item));
}

console.log(
  createObjects(PersonWithFullName, [{ first: "HD", last: "DD" }]).map(
    (obj) => obj.fullName
  )
);
