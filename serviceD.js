class SerializerD {
  constructor(logger) {
    this.logger = logger;
  }
  async serialize(data) {
    this.logger("[SerializerD]", data);
    return { data };
  }
}

class ServiceD {
  constructor(serializer) {
    this.serializer = serializer;
  }
  calculate(a, b) {
    const result = Number(a) + Number(b);
    return this.serializer.serialize(result);
  }
}

module.exports = {
  SerializerD,
  ServiceD,
};
