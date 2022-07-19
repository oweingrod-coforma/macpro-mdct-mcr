import { object, string, array, number } from "yup";

export default object({
  // checkbox example
  test1: array()
    .required("Field is required")
    .min(1, "Must make at least one selection"),
  "test1-o1-c": array().when("test1", {
    is: (value: any) => value && value.indexOf("option1") != -1,
    then: (schema: any) =>
      schema
        .required("Field is required")
        .min(1, "Must make at least one selection"),
  }),
  "test1-o1-c-o1-c": string().when("test1-o1-c", {
    is: (value: any) => value && value.indexOf("option1-1") != -1,
    then: (schema: any) => schema.required("Field is required"),
  }),
  // radio example
  test2: array()
    .required("Field is required")
    .min(1, "Must make at least one selection"),
  "test2-o1-c": array().when("test2", {
    is: (value: any) => value && value.indexOf("option1") != -1,
    then: (schema: any) =>
      schema
        .required("Field is required")
        .min(1, "Must make at least one selection"),
  }),
  "test2-o1-c-o1-c": string().when("test2-o1-c", {
    is: (value: any) => value && value.indexOf("option1-1") != -1,
    then: (schema: any) => schema.required("Field is required"),
  }),

  test3: number().required().typeError("Please input a number"),
  test4: number().required().typeError("Please input a number"),
  test5: number().required().typeError("Please input a number"),
  test6: number().required().typeError("Please input a number"),
  test7: number().required().typeError("Please input a number"),
  test8: number().required().typeError("Please input a number"),
  test9: number().required().typeError("Please input a number"),
  test10: number().required().typeError("Please input a number"),
});
