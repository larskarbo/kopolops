import formPhrase from "font-ascii";
import { writeFile } from "fs/promises";
import { pathExists } from "fs-extra";

import execa from "execa";
import Listr from "listr";
import { say } from "cowsay";
import { writeJsonFile } from "write-json-file";
import delay from "delay";
import { loadJsonFile } from "load-json-file";

const cowError = (sayThis) => {
  console.log("ERROR: ↓");
  console.log(say({ text: sayThis }));
  process.exit(1);
};

const go = async () => {
  formPhrase.default("KOPOLOPS", { typeface: "PatorjkCheese" });

  if (!(await pathExists("./.kopolops"))) {
    cowError(".kopolops indicator file not found");
  }

  const tasks = new Listr([
    {
      title: "Initing",
      task: async () => {
        await delay(1000);
      },
    },
    {
      title: "Clearing package.json",
      task: async () => {
        const packageJson = {
          name: "kopolops-generated",
          dependencies: {},
          devDependencies: {},
          scripts: {},
        };
        await writeJsonFile("./package.json", packageJson);
      },
    },
    {
      title: "Add check-types to web",
      task: async () => {
        const currentJsonFile = await loadJsonFile("./web/package.json");
        const packageJson = {
          ...currentJsonFile,
          scripts: {
            ...currentJsonFile.scripts,
            "check-types": "tsc  --pretty --noEmit",
          },
        };
        await writeJsonFile("./web/package.json", packageJson);
      },
    },
    {
      title: "Add husky",
      task: () => execa("npx", ["husky-init"]),
    },
    {
      title: "Copy precommit file",
      task: () => writeFile(".husky/pre-commit", precommit_file),
    },
    {
      title: "Add kopolops",
      task: () => execa("yarn", ["add", "-D", "kopolops"]),
    },
    {
      title: "Updating and seal package.json",
      task: async () => {
        const currentJsonFile = await loadJsonFile("./package.json");
        const packageJson = {
          ...currentJsonFile,
          scripts: {
            start: "vercel dev",
            preinstall: 'echo "Don\'t add packages here" && exit 1',
          },
        };
        await writeJsonFile("./package.json", packageJson);
      },
    },
  ]);

  tasks.run();

  console.log("lets go");
};

export default go;
console.log("horse");


const precommit_file = `#!/bin/sh

. "$(dirname "$0")/_/husky.sh"

# WEB SHIT
cd web

npm run check-types ||
(
    echo '🤡😂❌🤡 Failed Type check. 🤡😂❌🤡
            Are you seriously trying to write that? Make the changes required above.'
    false;
)
`