#! /usr/bin/env node
import inquirer from "inquirer";

let myBalance: number = 10000;
let myPin: number = 1234;

let userPin = await inquirer.prompt({
  name: "pin",
  type: "number",
  message: "Enter you Pin Number: ",
});

if (userPin.pin === myPin) {
  console.log("Welcome To ATM");

  let userOperation = await inquirer.prompt([
    {
      name: "accountType",
      type: "list",
      message: "Please select account type: ",
      choices: ["Current Account", "Saving Account"],
    },
    {
      name: "operation",
      message: "Please select any operation: ",
      type: "list",
      choices: ["Check Balance", "Cash WithDrawal"],
    },
  ]);

  //Check Balance
  if (userOperation.operation === "Check Balance") {
    console.log(`Your current balance: Rs.${myBalance}`);
    console.log("Thank you for using ATM!");
  }

  // Cash WithDrawal
  else if (userOperation.operation === "Cash WithDrawal") {
    let withDrawMethod = await inquirer.prompt({
      name: "withDrawMethod",
      type: "list",
      message: "Please select any option: ",
      choices: ["Enter Amount", "Fast Cash"],
    });

    // Fast Cash
    if (withDrawMethod.withDrawMethod === "Fast Cash") {
      let fastCashAmount = await inquirer.prompt([
        {
          name: "amount",
          message: "Please select any amount: ",
          type: "list",
          choices: [1000, 2000, 4000, 5000, 10000, 20000],
        },
      ]);

      if (fastCashAmount.amount <= myBalance) {
        myBalance -= fastCashAmount.amount;

        console.log(
          `You have successully withdraw Rs.${fastCashAmount.amount}`
        );
        console.log(`Remaining balance: Rs.${myBalance}`);
        console.log("Thank you for using ATM!");
      } else {
        console.log("Sorry you have insufficient balance!");
      }
    }

    // Enter Cash Withdrawal Amount
    else if (withDrawMethod.withDrawMethod === "Enter Amount") {
      let withDrawAmount = await inquirer.prompt({
        name: "amount",
        type: "number",
        message: "Please select any amount: ",
      });

      if (withDrawAmount.amount <= myBalance) {
        myBalance -= withDrawAmount.amount;

        console.log(
          `You have successully withdraw Rs.${withDrawAmount.amount}`
        );
        console.log(`Remaining balance: Rs.${myBalance}`);
        console.log("Thank you for using ATM!");
      } else {
        console.log("Sorry you have insufficient balance!");
      }
    }
  }
}
// Wrong Pin
else {
  console.log("Please Enter Correct Pin Number!");
}
