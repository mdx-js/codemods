import path from "path";
import execa from "execa";

export const transformerDirectory = path.join(__dirname, "../", "transforms");
export const jscodeshiftExecutable = require.resolve(".bin/jscodeshift");

export function runTransform(targetDir) {
  const transformerPath = path.join(transformerDirectory, `mdx-v2.js`);

  let args = [];

  args.push("--ignore-pattern=**/node_modules/**");

  args.push("--extensions=mdx");

  args = args.concat(["--transform", transformerPath, targetDir]);

  console.log(`Executing command: jscodeshift ${args.join(" ")}`);

  const result = execa.sync(jscodeshiftExecutable, args, {
    stdio: "inherit",
    stripEof: false,
  });

  if (result.error) {
    throw result.error;
  }
}

export function run() {
  let [targetDir] = process.argv.slice(2);

  if (!targetDir) {
    console.log(
      `You have not provided a target directory to run the codemod against, will default to root.`
    );
    targetDir = `.`;
  }
  runTransform(targetDir);
}
