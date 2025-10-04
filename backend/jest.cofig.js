// jest.config.js
export default {
  testEnvironment: "node",               
  extensionsToTreatAsEsm: [".js"],       
  moduleDirectories: ["node_modules", "src"], 
  transform: {},                          
  testTimeout: 10000,                    
  setupFilesAfterEnv: [],                
  verbose: true                           
};
