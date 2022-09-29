# General Notes

## CSS (specificity order)

[]: # (1) Inline styles
[]: # (2) Internal styles
[]: # (3) External styles
[]: # (4) Browser default styles

Inline styles - Example: <h1 style="color: pink;">
IDs - Example: #navbar
Classes, pseudo-classes, attribute selectors - Example: .test, :hover, [href]
Elements and pseudo-elements - Example: h1, :before

## Flex Box

[]: # (1) display: flex;
[]: # (2) flex-direction: row | row-reverse | column | column-reverse;
[]: # (3) flex-wrap: nowrap | wrap | wrap-reverse;
[]: # (4) flex-flow: <flex-direction> || <flex-wrap>;
[]: # (5) justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
[]: # (6) align-items: flex-start | flex-end | center | baseline | stretch;
[]: # (7) align-content: flex-start | flex-end | center | space-between | space-around | stretch;
[]: # (8) align-self: works on on an individual selector  flex-start | flex-end | center | baseline | stretch;

- flex-flow: is a shorthand for flex-direction and flex-wrap (something like flex-flow: column wrap)
- align-content: determines the spacing between lines, while align-items determines how the items as a whole are aligned within the container
- Notice that when the flex direction is a column, justify-content changes to the vertical and align-items to the horizontal

## React Do's and Don'ts (JH)

### Do's

1. Use functional components over class components (unless you need to use lifecycle methods) - functional components are easier to read and test and they don't have this binding issues (this is a big one)

### useEffect infinite loop

- A common case that generates an infinite loop is updating state in the side-effect without having any dependency argument at all (Alternatively, you can also use a reference. Updating a reference doesn't trigger a re-rendering:)

```js
countRef.current++;

useEffect(() => {
  // No infinite loop
  setState(count + 1);
}, [whenToUpdateValue]);
```

- Is using an object as a dependency of useEffect(), and inside the side-effect updating that object (effectively creating a new object):
- Remember that the state setter will compare (===) the old value with the new value and in this case its comparing two different objects (by reference), so it will trigger a re-render.

```js
useEffect(() => {
  // Infinite loop!
  setObject({
    ...object,
    prop: 'newValue'
  })
}, [object]);

useEffect(() => {
  // No infinite loop
  setObject({
    ...object,
    prop: 'newValue'
  })
}, [object.whenToUpdateProp]);
```

2. Use TS over JS (if you can)

- Does not bloat code (it is run during compile time)

3. Don't worry about react re-rendering

- You are calling Reat.createElement()

4. Dependency array use them!

- If you don't use them, you will get a warning in the console (and you will have a performance issue)
- Dependency array is an array of values that the useEffect() hook will watch for changes
- Is an array of values that the useEffect() hook will watch for changes. If any of the values change, the side-effect will be executed again. If the array is empty, the side-effect will be executed only once, when the component is mounted.

5. Use useCallback() and useMemo() when needed

- useCallback() is used to memoize a function, want retain the referential identity of the function across renders, useful when passing the function to a child component that relies on referential identity to determine if it should re-render
- useMemo() is used to memoize a value, useful when you want to avoid expensive calculations on every render