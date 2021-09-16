"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class LoggedIn {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, auth, response }, next) {
    try {
      let user = await auth.getUser();
    } catch (error) {
      return response.status(401).json({
        message: "You are not authorized !",
      });
    }
    await next();
  }
}

module.exports = LoggedIn;
