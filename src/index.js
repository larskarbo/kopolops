import formPhrase from "font-ascii";
import { pathExists } from "fs-extra";

import { say } from "cowsay";

const cowError = (sayThis) => {
  console.log("ERROR: ↓");
  console.log(say({ text: sayThis }));
  process.exit(1);
};

const go = async () => {
  console.log();
  formPhrase.default("KOPOLOPS", { typeface: "PatorjkCheese" });

  if (!(await pathExists(".kopolops"))) {
    cowError("KOPOLOPS folder not found");
  }

  console.log("lets go");
};

export default go;
console.log("horse");
