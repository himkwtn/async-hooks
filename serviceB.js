class SerializerB {
  async serialize(data, id) {
    console.log(`[SerializerB] ${id}:${data}`);
    return { data };
  }
}

class ServiceB {
  constructor(serializer) {
    this.serializer = serializer;
  }
  calculate(a, b, id) {
    const result = Number(a) + Number(b);
    return this.serializer.serialize(result, id);
  }
}

module.exports = {
  SerializerB,
  ServiceB,
};
