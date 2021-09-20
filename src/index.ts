#!/usr/bin/env node

import { say } from "cowsay";
import formPhrase from 'font-ascii';
 

const letsGo = async () => {
  console.log()
  formPhrase('KOPOLOPS', { typeface: 'PatorjkCheese' })
};

letsGo();
console.log("horse")