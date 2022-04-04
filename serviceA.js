class SerializerA {
  async serialize(data) {
    console.log(req.id);
    return { data };
  }
}

class ServiceA {
  constructor(serializer) {
    this.serializer = serializer;
  }
  calculate(a, b) {
    const result = Number(a) + Number(b);
    return this.serializer.serialize(result);
  }
}

module.exports = {
  SerializerA,
  ServiceA,
};
