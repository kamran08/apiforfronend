"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Admin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response, auth }, next) {
    try {
      await auth.authenticator("admin").getUser();
    } catch (error) {
      return response.status(401).json({
        message: "You are not authorized!",
      });
    }
    await next();
  }
}

module.exports = Admin;
