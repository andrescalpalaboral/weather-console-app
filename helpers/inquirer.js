const inquirer = require("inquirer");
require("colors");

const menuQuestion = [
  {
    type: "list",
    name: "option",
    message: "What would you like to do?",
    choices: [
      {
        value: 0,
        name: `${"0.".green} Exit`,
      },
      {
        value: 1,
        name: `${"1.".green} Search location `,
      },
      {
        value: 2,
        name: `${"2.".green} List locations`,
      },
    ],
  },
];

const confirmation = {
  type: "input",
  name: "confirmation",
  message: `Press ${"ENTER".blue} to confirm`,
};

const inquirerMenu = async () => {
  console.log("=======================".green);
  console.log("   Choose an option    ".green);
  console.log("=======================\n".green);

  const { option } = await inquirer.prompt(menuQuestion);

  return option;
};

const pause = async () => {
  await inquirer.prompt(confirmation);
};

const readInput = async (message) => {
  const question = {
    type: "input",
    name: "description",
    message,
    validate(value) {
      if (value === 0) return "Please enter a value";
      return true;
    },
  };

  const { description } = await inquirer.prompt(question);
  return description;
};

const listOfPlaces = async (places = []) => {
  const choices = places.map((place, index) => {
    const indice = `${index + 1}.`.green;
    return {
      value: place.id,
      name: `${indice} ${place.name}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0.".green + "Cancel",
  });

  const menuQuestion = [
    {
      type: "list",
      name: "id",
      message: "Select a place",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(menuQuestion);
  return id;
};

const listOfTaskToComplete = async (tasks = []) => {
  const choices = tasks.map((task, index) => {
    const indice = `${index + 1}.`.green;
    return {
      value: task.id,
      name: `${indice} ${task.description}`,
      checked: task.createdAt ? true : false,
    };
  });

  const menuQuestion = [
    {
      type: "checkbox",
      name: "ids",
      message: "Select task(s)",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(menuQuestion);
  return ids;
};

const confirmAction = async (message = "Are you sure?") => {
  const messageQuestion = [{ type: "confirm", name: "confirm", message }];

  return await inquirer.prompt(messageQuestion);
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listOfPlaces,
  confirmAction,
  listOfTaskToComplete,
};
