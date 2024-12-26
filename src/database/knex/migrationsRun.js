const knex = require("./index");

async function migrationsRun() {
  try {
    await knex.migrate.latest();
    console.log("Migrations executed successfully!");
  } catch (error) {
    console.error("Error running migrations:", error);
  }
}

module.exports = migrationsRun;
