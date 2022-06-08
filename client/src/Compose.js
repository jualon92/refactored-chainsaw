//composicion de funciones similar a haskell, evitar f3(f2(f1(p)))

const compose =
  (...fns) =>
  (initialVal) =>
    fns.reduceRight((val, fn) => fn(val), initialVal);

export default compose;
