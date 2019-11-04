const test = require("tape");
const _ = require("lodash");

module.exports = compose => {
  test("compose function pojo (Plain Old JavaScript Object)", nest => {
    const objDescriptors = [
      "properties",
      "deepProperties",
      "staticProperties",
      "staticDeepProperties",
      "propertyDescriptors",
      "staticPropertyDescriptors",
      "configuration"
    ];

    objDescriptors.forEach(descriptorName => {
      nest.test("...with pojo descriptor." + descriptorName, assert => {
        const descriptor = {};
        descriptor[descriptorName] = {
          a: {
            b: "b"
          }
        };

        const metadata = compose(descriptor).compose[descriptorName];
        assert.ok(metadata);
        const actual = metadata.a;
        const expected = { b: "b" };

        assert.deepEqual(
          actual,
          expected,
          "should create " + descriptorName + " descriptor"
        );

        assert.end();
      });
    });
  });

  test("compose function pojo", nest => {
    nest.test("...with pojo descriptor.methods", assert => {
      const a = function a() {
        return "a";
      };

      const actual = Object.getPrototypeOf(
        compose({
          methods: { a: a }
        })()
      );

      const expected = { a: a };

      assert.deepEqual(actual, expected, "should create methods descriptor");

      assert.end();
    });

    nest.test("...with pojo descriptor.initializers", assert => {
      const a = function a() {
        return "a";
      };

      const actual = compose({
        initializers: [a]
      }).compose.initializers;

      assert.ok(_.includes(actual, a), "should have initializers descriptor");

      assert.end();
    });
  });
};
