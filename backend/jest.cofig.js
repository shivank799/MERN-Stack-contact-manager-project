export default {
  testEnvironment: "node",
  transform: {},                       // disable babel transform
  extensionsToTreatAsEsm: [".js"],     // tell Jest .js files are ESM
  moduleFileExtensions: ["js", "json"],
  verbose: true
};
