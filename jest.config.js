export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-transformer-svg",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  collectCoverageFrom: ["<rootDir>/src/*.tsx", "<rootDir>/src/*.ts"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
