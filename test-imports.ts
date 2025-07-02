// Test file to verify imports work correctly
import { capitalize } from "advanced-js-kit/string/capitalize";
import { chunk } from "advanced-js-kit/array/chunk";
import { clamp } from "advanced-js-kit/number/clamp";

console.log("Testing imports:");
console.log("capitalize('hello'):", capitalize('hello'));
console.log("chunk([1,2,3,4], 2):", chunk([1,2,3,4], 2));
console.log("clamp(15, 0, 10):", clamp(15, 0, 10));
