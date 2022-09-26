// Classes Db

interface Database<T, K> {
  get(id: K): T;
  set(id: K, value: T): void;
}

interface Persistable {
  saveToString(): string;
  restoreFromString(storedState: string): string;
}

type DBKeyType = string | number | symbol;

class InMemoryDatabase<T, K extends DBKeyType> implements Database<T, K> {
  protected db: Record<K, T> = {} as Record<K, T>; // member visibility with private/protected field, we type cast the empty object because it could be anything

  get(id: K): T {
    return this.db[id];
  }
  set(id: K, value: T): void {
    this.db[id] = value;
  }
}

class PersistentMemoryDb<T, K extends DBKeyType>
  extends InMemoryDatabase<T, K>
  implements Persistable
{
  saveToString(): string {
    return JSON.stringify(this.db);
  }

  restoreFromString(storedState: string): string {
    return JSON.parse(storedState);
  }
}

const database1 = new InMemoryDatabase();
const persistentDb = new PersistentMemoryDb<number, string>();

database1.set("1", "firstValue");
// database1.db["override"] = "override-value"; // not good
console.log(database1.get("1"));

persistentDb.set("2", 1);
const saved = persistentDb.saveToString();

const myDb2 = new PersistentMemoryDb<number, string>();
const restoreContents = myDb2.restoreFromString(saved);
console.log("restoreContents:", restoreContents);
