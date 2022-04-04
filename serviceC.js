class SerializerC {
  constructor(store) {
    this.store = store;
  }
  async serialize(data) {
    const id = this.store.getStore();
    console.log(`[SerializerC] ${id}:${data}`);
    return { data };
  }
}

class ServiceC {
  constructor(serializer) {
    this.serializer = serializer;
  }
  calculate(a, b) {
    const result = Number(a) + Number(b);
    return this.serializer.serialize(result);
  }
}

module.exports = {
  SerializerC,
  ServiceC,
};
