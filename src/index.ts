import formPhrase from 'font-ascii';
import { pathExists } from 'fs-extra';
 

const letsGo = async () => {
  console.log()
  formPhrase('KOPOLOPS', { typeface: 'PatorjkCheese' })

  if(!(await pathExists(".kopolops"))){
      throw new Error("KOPOLOPS folder not found")
  }

  console.log("lets go")
};

letsGo();
console.log("horse")