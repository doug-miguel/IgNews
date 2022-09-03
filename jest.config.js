module.exports = {
  testPathIgnorePatterns: ["/node_module/", "/.next/"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  testEnvironment: "jest-environment-jsdom-global",
  moduleNameMapper: {
    "^.+\\.(css|scss)$": "identity-obj-proxy"
  }
}