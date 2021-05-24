const {
  confirmAction,
  inquirerMenu,
  pause,
  readInput,
  listOfPlaces,
} = require("./helpers/inquirer");
const Searches = require("./models/searches");

console.clear();

const main = async () => {
  let opt;
  const searches = new Searches();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        const input = await readInput("Enter a city:");
        const places = await searches.location(input);
        const id = await listOfPlaces(places);
        if (id === "0") continue;
        const { name, latitude, longitude } = places.find(
          (place) => place.id === id
        );
        searches.savePlaceInHistory(name);
        const weather = await searches.getWeather(latitude, longitude);
        console.log(`Place: ${name.green}`);
        console.log(`Latitude: ${latitude.toString().yellow}`);
        console.log(`Longitude: ${longitude.toString().yellow}`);
        console.log(`Weather: ${weather.description.toUpperCase().green}`);
        console.log(
          `Max temperature: ${weather.max_temperature.toString().yellow}`
        );
        console.log(
          `Min temperature: ${weather.min_temperature.toString().yellow}`
        );
        console.log(`Temperature: ${weather.temperature.toString().yellow}`);

        break;
      case 2:
        searches.locationHistory.forEach((location, i) => {
          const idx = `${i + 1}.`.green;
          const item = `${idx} ${location}`;
          console.log(item);
        });

        break;
    }

    await pause();
  } while (opt !== 0);
};

main();
