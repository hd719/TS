// Mixins

function myLogFunction() {
  return (str: string) => {
    return str;
  };
}

function createLoggerClass() {
  return class MyLoggerClass {
    private completeLog: string = "";
    log(str: string) {
      this.completeLog += str + "\n";
    }
    dumpLog() {
      return this.completeLog;
    }
  };
}

const MyLogger = createLoggerClass();
const logger2 = new MyLogger();
logger2.log("Foo");
console.log(logger2.dumpLog());

function CreateSimpleMemoryDatabase<T>() {
  return class SimpleMemoryDatabase {
    private db: Record<string, T> = {};

    get(id: string) {
      return this.db[id];
    }

    set(id: string, value: T) {
      this.db[id] = value;
    }

    getObject(): object {
      return this.db;
    }
  };
}

const StringDatabase = CreateSimpleMemoryDatabase<string>();

type Constructor<T> = new (...args: any[]) => T;

function Dumpable<
  T extends Constructor<{
    getObject(): object;
  }>
>(Base: T) {
  return class Dumpable extends Base {
    dump() {
      console.log(this.getObject());
    }
  };
}

const DumpableStringDatabase = Dumpable(StringDatabase);
const sdb2 = new DumpableStringDatabase();
sdb2.set("name", "Jack");
sdb2.dump();
