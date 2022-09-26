// Decorators (class, parameter, method)

//  Can only be used for class definitions!

import { timing, logTimings, important } from "./16.1-perf-decorators";

const delay = <T>(time: number, data: T): Promise<T> =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(data);
    }, time)
  );

@logTimings // class decorators do not have a () after them
class Users {
  @timing() // method decorators do have a () after them
  async getUsers() {
    return await delay(1000, []);
  }

  @timing() // method decorators do have a () after them
  async getUser(@important id: number) {
    // parameter decorators
    // param decorators
    return await delay(50, {
      id: `user:${id}`,
    });
  }
}

(async function () {
  const users = new Users();
  const user = await users.getUser(22);

  console.log(`Got ${JSON.stringify(user)}`);

  await users.getUser(42);
  await users.getUsers();

  //@ts-ignore
  console.log(users?.printTimings());
})();

function first() {
  console.log("first(): factory evaluated");
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("first(): called");
  };
}

function second() {
  console.log("second(): factory evaluated");
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("second(): called");
  };
}

class ExampleClass {
  @first()
  @second()
  method() {}
}

// first(): factory evaluated
// second(): factory evaluated
// second(): called
// first(): called

// Decorators are executed top to bottom
// Decorators are executed when the class is defined, not when it is instantiated so you can't use them to access the class properties
