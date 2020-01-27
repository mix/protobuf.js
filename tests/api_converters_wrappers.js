var tape = require("tape");

var protobuf  = require("..");

tape.test("converters", function(test) {

    protobuf.load("tests/data/convert_wrappers.proto", function(err, root) {
        if (err)
            return test.fail(err.message);

        var Message = root.lookup("TestMessage");

        test.test(test.name + " - Message.fromObject - wrappers happy path", function(test) {

            var obj = {
              id: 1,
              simpleField: "string value",
              wrappedField: "string value",
              simpleId: 1,
              wrappedId: 1,
              simpleBool: true,
              wrappedBool: true,
            };
            var msg = Message.fromObject(obj);

            test.same(Message.ctor.fromObject(obj), msg, "should convert the same using the static and the instance method");
            test.equal(Message.fromObject(msg), msg, "should just return the object if already a runtime message");

            test.same(msg.id, 1, "should set id from a number");
            test.same(msg.simpleField, "string value", "should set simpleField from a string");
            test.same(msg.wrappedField, {value: "string value"}, "should set wrappedField from a string");
            test.same(msg.simpleId, 1, "should set simpleId from a number");
            test.same(msg.wrappedId, {value: 1}, "should set wrappedId from a number");
            test.same(msg.simpleBool, true, "should set simpleBool from a boolean");
            test.same(msg.wrappedBool, {value: true}, "should set wrappedBool from a boolean");

            var response = msg.toJSON()

            test.same(response, obj, "original and resultant json representation should be the same")

            test.end();
        });

        test.end();
    });
});
