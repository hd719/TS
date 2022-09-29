import { RecordHandler, loader } from "./loader";

interface Pokemon {
  id: string;
  name: string;
  attack: number;
  defense: number;
}

interface BaseRecord {
  id: string;
}

interface Database<T extends BaseRecord> {
  get: (id: string) => T;
  set: (value: T) => void;
}

class InMemoryDatabase<T extends BaseRecord> implements Database<T> {
  private db: Record<string, T> = {};

  public set(value: T): void {
    this.db[value.id] = value;
  }

  public get(id: string) {
    return this.db[id];
  }
}

const pokemonDb = new InMemoryDatabase<Pokemon>();
pokemonDb.set({ id: "1", name: "mew", attack: 10, defense: 10 });

// 1. Factory Pattern - a function that returns an object (or a class) that implements an interface or extends a class (or abstract class)

function createDatabase<T extends BaseRecord>() {
  class InMemoryDatabase implements Database<T> {
    // constructor(private name: string, private author: string);

    protected db: Record<string, T> = {} as Record<string, T>;

    public get(id: string): T {
      return this.db[id];
    }

    public set(value: T): void {
      this.db[value.id] = value;
    }
  }

  return InMemoryDatabase;
}

const PokemonDBSetup = createDatabase<Pokemon>();
const PokemonDb2 = new PokemonDBSetup();

// 2. Singleton Pattern - a class that can only be instantiated once (example: database connection, state management)

function createDatabaseSingleton<T extends BaseRecord>() {
  class InMemoryDatabase implements Database<T> {
    // constructor(private name: string, private author: string);

    protected db: Record<string, T> = {} as Record<string, T>;

    public get(id: string): T {
      return this.db[id];
    }

    public set(value: T): void {
      this.db[value.id] = value;
    }
  }

  const db = new InMemoryDatabase();
  return db;
}

// Returns an instance of the InMemoryDatabase class
const PokemonDb3 = createDatabaseSingleton<Pokemon>();

// 3. Observer Pattern - a class that can subscribe to other classes (example: event listeners, pub sub, redux, rxjs)
// Observer Pattern - design pattern in which an object, called the subject, maintains a list of its dependents, called observers, and notifies them automatically of any state changes, usually by calling one of their methods.

// 4. Visitor Pattern - a class that can visit other classes (example: DOM traversal, redux, rxjs)

// 5. Strategy Pattern - a class that can be configured with different strategies (example: sorting, validation, logging)

type Listener<EventType> = (event: EventType) => void;

function createObserver<EventType>(): {
  subscribe: (listener: Listener<EventType>) => () => void;
  publish: (event: EventType) => void;
  listeners: () => void;
} {
  let listeners: Listener<EventType>[] = [];

  return {
    subscribe: (listener: Listener<EventType>): (() => void) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
    publish: (event: EventType) => {
      listeners.forEach((listenerFunction) => listenerFunction(event));
    },
    listeners: () => listeners,
  };
}

interface BeforeSetEvent<T> {
  value: T;
  newValue: T;
}

interface AfterSetEvent<T> {
  value: T;
}

interface DatabaseWithEvents<T extends BaseRecord> {
  get: (id: string) => T | undefined;
  set: (value: T) => void;
  onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void;
  onAfterSet(listener: Listener<AfterSetEvent<T>>): () => void;
  visit: (visitor: (item: T) => void) => void;
}

function createDatabaseObserver<T extends BaseRecord>() {
  class InMemoryDatabase implements DatabaseWithEvents<T> {
    // constructor(private name: string, private author: string);

    private db: Record<string, T> = {} as Record<string, T>;
    private beforeAddListners = createObserver<BeforeSetEvent<T>>();
    private afterAddListeners = createObserver<AfterSetEvent<T>>();
    private listeners: Listener<BeforeSetEvent<T>>[] = [];
    public get(id: string): T {
      return this.db[id];
    }
    public set(value: T): void {
      this.beforeAddListners.publish({
        value: this.db[value.id],
        newValue: value,
      });

      this.db[value.id] = value;

      this.afterAddListeners.publish({
        value: value,
      });
    }

    onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void {
      return this.beforeAddListners.subscribe(listener);
    }

    onAfterSet(listener: Listener<AfterSetEvent<T>>): () => void {
      return this.afterAddListeners.subscribe(listener);
    }

    getDb(): Record<string, T> {
      console.log("this.db;:", this.db);
      return this.db;
    }

    getListers(): Listener<BeforeSetEvent<T>>[] {
      console.log("this.listeners;:", this.listeners);
      return this.listeners;
    }

    // Visitor Pattern
    visit(visitor: (item: T) => void): void {
      Object.values(this.db).forEach(visitor);
    }

    // Strategy Pattern
    selectTheBest(scoreStrategy: (item: T) => number): T | undefined {
      const found: {
        max: number;
        item: T | undefined;
      } = {
        max: 0,
        item: undefined,
      };

      Object.values(this.db).reduce((a, v) => {
        const score = scoreStrategy(v);
        if (score >= a.max) {
          a.max = score;
          a.item = v;
        }
        return a;
      }, found);

      return found.item;
    }
  }

  const db = new InMemoryDatabase();
  return db;
}

const PokemonDb4 = createDatabaseObserver<Pokemon>();

PokemonDb4.onBeforeAdd((event) => {
  console.log("Before add", event);
});
PokemonDb4.set({ id: "1", name: "mew", attack: 10, defense: 10 });
PokemonDb4.set({ id: "2", name: "mewtwo", attack: 20, defense: 20 });
PokemonDb4.onAfterSet((event) => {
  console.log("after add", event);
});
PokemonDb4.set({ id: "3", name: "mewthree", attack: 30, defense: 30 });

PokemonDb4.getDb();

PokemonDb4.visit((item) => {
  console.log("item:", item);
});

// select by best defense or attack
const bestPokemonDefense = PokemonDb4.selectTheBest((item) => item.defense);
const bestPokemonAttack = PokemonDb4.selectTheBest((item) => item.attack);

console.log("bestPokemonDefense:", bestPokemonDefense);
console.log("bestPokemonAttack:", bestPokemonAttack);
