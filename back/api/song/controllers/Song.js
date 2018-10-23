'use strict';

/**
 * Song.js controller
 *
 * @description: A set of functions called "actions" for managing `Song`.
 */

module.exports = {

  /**
   * Retrieve song records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.song.search(ctx.query);
    } else {
      return strapi.services.song.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a song record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.song.fetch(ctx.params);
  },

  /**
   * Count song records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.song.count(ctx.query);
  },

  /**
   * Create a/an song record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.song.add(ctx.request.body);
  },

  /**
   * Update a/an song record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.song.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an song record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.song.remove(ctx.params);
  },

  /**
   * Find potential musers.
   *
   * @return {Object}
   */

  findMusers: async (ctx) => {
    // Pour récupérer tous les utilisateurs
    // let allUsers = await strapi.plugins['users-permissions'].services.user.fetchAll(ctx.query);

    // On récupère le user dont l'id est ctx.params.userId
    let user = await strapi.plugins['users-permissions'].services.user.fetch({
      "_id": ctx.params.userId
    });

    // On affiche ses chansons dans la consone
    console.log('user.userId', user.songs);

    // Pour chaque chanson de user, on récupère les utilisateurs qui l'ont aimé et on les 
    // stock dans matchs
    let matchs = {};

    for (let song of user.songs){
      for (let user of song.users){
        if (matchs[user])
          matchs[user] = matchs[user] + 1;
        else
          matchs[user] = 1;
      }
    }

    // On renvoi matchs qui est un dictionnaire avec comme clé
    // les ids de toutes les personnes qui ont au moins une chanson en  
    // commun avec notre user et comme valeur le nombre de chansons en commun
    ctx.send(matchs);
  }
};
