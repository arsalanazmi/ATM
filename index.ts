#! /usr/bin/env node
import inquirer from "inquirer";

let myBalance = 10000;
let myPin = 1234;

let userPin = await inquirer.prompt({
  name: "pin",
  type: "number",
  message: "Enter you Pin Number: ",
});

if (userPin.pin === myPin) {
  console.log("Welcome To ATM");

  let userOperation = await inquirer.prompt({
    name: "operation",
    message: "Please select any operation: ",
    type: "list",
    choices: ["Check Balance", "WidthDraw"],
  });

  if (userOperation.operation === "Check Balance") {
    console.log(`Your current balance: Rs.${myBalance}`);
    console.log("Thank you for using ATM!");
  } else if (userOperation.operation === "WidthDraw") {
    let widthDrawMethod = await inquirer.prompt({
      name: "withDrawMethod",
      type: "list",
      message: "Please select any option: ",
      choices: ["Enter Amount", "Fast Cash"],
    });

    if (widthDrawMethod.withDrawMethod === "Fast Cash") {
      let fastCashAmount = await inquirer.prompt([
        {
          name: "amount",
          message: "Please select any amount: ",
          type: "list",
          choices: [1000, 2000, 4000, 5000, 10000, 20000],
        },
      ]);

      if (fastCashAmount.amount > myBalance) {
        console.log("Sorry you have insufficient balance!");
      } else {
        myBalance -= fastCashAmount.amount;

        console.log(
          `You have successully withdraw Rs.${fastCashAmount.amount}`
        );
        console.log(`Remaining balance: Rs.${myBalance}`);
        console.log("Thank you for using ATM!");
      }
    } else if (widthDrawMethod.withDrawMethod === "Enter Amount") {
      let widthDrawAmount = await inquirer.prompt({
        name: "amount",
        type: "number",
        message: "Please select any amount: ",
      });

      if (widthDrawAmount.amount > myBalance) {
        console.log("Sorry you have insufficient balance!");
      } else {
        myBalance -= widthDrawAmount.amount;
        console.log(
          `You have successully withdraw Rs.${widthDrawAmount.amount}`
        );
        console.log(`Remaining balance: Rs.${myBalance}`);
        console.log("Thank you for using ATM!");
      }
    }
  }
} else {
  console.log("Please Enter Correct Pin Number!");
}
