const Ajv = require("ajv")
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true} 
const schema = {
    type: "object",
    properties: {
        foo: { type: "integer" },
        bar: { type: "string" }
    },
    required: ["foo"],
    additionalProperties: false
}
const validate = ajv.compile(schema)
const data = { foo: "asd", bar: "abc" }
const valid = validate(data)
if (valid) {
    console.log("JSON válido");
} else {
    console.log(validate.errors);
}
