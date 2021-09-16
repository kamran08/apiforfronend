"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Admin extends Model {
  static get hidden() {
    return ["admin_password"];
  }
}

module.exports = Admin;
