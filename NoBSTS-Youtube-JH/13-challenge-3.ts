// type FilterFunction<T> = (data: T[keyof T]) => boolean;
// type Filters<T> = Record<keyof T, FilterFunction<T>[]>;
// // type MapFunction<T> = (data: T[keyof T]) => T[keyof T];
// // type Maps<T> = Record<keyof T, FilterFunction<T>[]>;
// type MapFunction<T> = (data: T) => T;
// type Maps<T> = {
//   [Property in keyof T]: MapFunction<T[Property]>[];
// };
// type ProcessedEvent<T> = {
//   eventName: keyof T;
//   data: T[keyof T];
// };

// class EventProcessor<T extends {}> {
//   private filters: Filters<T> = {} as Filters<T>;
//   private maps: Maps<T> = {} as Maps<T>;
//   private processed: ProcessedEvent<T>[] = [];

//   handleEvent<K extends keyof T>(eventName: K, data: T[K]): void {
//     let allowEvent = true;
//     for (const filter of this.filters[eventName] ?? []) {
//       if (!filter(data)) {
//         allowEvent = false;
//         break;
//       }
//     }

//     if (allowEvent) {
//       let mappedData: T[K] = { ...data };
//       for (const map of this.maps[eventName] ?? []) {
//         mappedData = map(mappedData) as T[K];
//       }

//       this.processed.push({
//         eventName,
//         data: mappedData,
//       });
//     }
//   }

//   addFilter<K extends keyof T>(
//     eventName: K,
//     filter: (data: T[K]) => boolean
//   ): void {
//     this.filters[<string>eventName] ||= [];
//     this.filters[<string>eventName].push(filter);
//   }

//   addMap<K extends keyof T>(eventName: K, map: (data: T[K]) => T[K]): void {
//     this.maps[<string>eventName] ||= [];
//     this.filters[<string>eventName].push(map);
//   }

//   getProcessedEvents() {
//     return this.processed;
//   }
// }

// interface EventMap {
//   login: { user?: string | null; name?: string; hasSession?: boolean };
//   logout: { user?: string };
// }

// class UserEventProcessor extends EventProcessor<EventMap> {}

// const uep = new UserEventProcessor();

// uep.addFilter("login", ({ user }) => Boolean(user));

// uep.addMap("login", (data) => ({
//   ...data,
//   hasSession: Boolean(data.user && data.name),
// }));

// uep.handleEvent("login", {
//   user: null,
//   name: "jack",
// });
// uep.handleEvent("login", {
//   user: "tom",
//   name: "tomas",
// });
// uep.handleEvent("logout", {
//   user: "tom",
// });

// console.log(uep.getProcessedEvents());

// /*
// Result:
// [
//   {
//     eventName: 'login',
//     data: { user: 'tom', name: 'tomas', hasSession: true }
//   },
//   { eventName: 'logout', data: { user: 'tom' } }
// ]
// */
