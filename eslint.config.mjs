import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

// eslint-config-next 16 ya publica flat config nativo, así que ya no hace
// falta el puente FlatCompat de @eslint/eslintrc (que además rompía con
// esta versión: "Converting circular structure to JSON").
const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "build/**"],
  },
  ...nextCoreWebVitals,
];

export default eslintConfig;
