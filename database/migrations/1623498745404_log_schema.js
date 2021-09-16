"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LogSchema extends Schema {
  up() {
    this.create("logs", (table) => {
      table.increments();
      table.string("method_name");
      table.string("request");
      table.text("response");
      table.integer("user_id");
      table.timestamps();
    });
  }

  down() {
    this.drop("logs");
  }
}

module.exports = LogSchema;
