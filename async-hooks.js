const { AsyncLocalStorage } = require("async_hooks");

const store = new AsyncLocalStorage();

const someAsyncFunction = async () => {
  console.log(store.getStore(), "someAsyncFunction");
};

const anotherAsyncFunction = async () => {
  console.log(store.getStore(), "anotherAsyncFunction");
};

const nestedFunction = async () => {
  console.log("====>", store.getStore(), "i am nested");
};
const parentFunction = () => {
  console.log("parentFunction");
  return nestedFunction();
};

const main = async () => {
  const data = "lore impusm";
  await store.run(data, async () => {
    console.log("start");
    await someAsyncFunction();
    await anotherAsyncFunction();
    await parentFunction();
    console.log("end");
    return "some data";
  });
};

main().catch(console.log);
