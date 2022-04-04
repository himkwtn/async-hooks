const express = require("express");
const { AsyncLocalStorage } = require("async_hooks");

const { SerializerA, ServiceA } = require("./serviceA");
const { SerializerB, ServiceB } = require("./serviceB");
const { SerializerC, ServiceC } = require("./serviceC");
const { SerializerD, ServiceD } = require("./serviceD");

const app = express();

const attachId = () => {
  let id = 0;
  return (req, res, next) => {
    req.id = id++;
    next();
  };
};

{
  const serializerA = new SerializerA();
  const serviceA = new ServiceA(serializerA);

  app.get("/a", attachId(), async (req, res) => {
    const a = 5;
    const b = 10;
    const result = await serviceA.calculate(a, b);
    console.log("a", req.id, result);
    res.send(result);
  });
}

{
  const serializerB = new SerializerB();
  const serviceB = new ServiceB(serializerB);

  app.get("/b", attachId(), async (req, res) => {
    const a = 5;
    const b = 10;
    const result = await serviceB.calculate(a, b, req.id);
    res.send(result);
  });
}

{
  const storeC = new AsyncLocalStorage();
  const serializerC = new SerializerC(storeC);
  const serviceC = new ServiceC(serializerC);

  app.get("/c", attachId(), async (req, res) => {
    const a = 5;
    const b = 10;
    const result = await storeC.run(req.id, () => serviceC.calculate(a, b));
    res.send(result);
  });
}

{
  const storeD = new AsyncLocalStorage();
  const loggerWithId = (name, data) => {
    const req = storeD.getStore();
    console.log(name, `${req.id}:${data}`);
  };
  const serializerD = new SerializerD(loggerWithId);
  const serviceD = new ServiceD(serializerD);

  app.get("/d", attachId(), async (req, res) => {
    const a = 5;
    const b = 10;
    const result = await storeD.run(req, () => serviceD.calculate(a, b));
    res.send(result);
  });
}

app.listen(3000, () => console.log("listening on port 3000"));
