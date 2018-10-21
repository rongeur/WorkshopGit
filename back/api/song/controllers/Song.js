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
  }

  /**
   * Find potential musers.
   *
   * @return {Object}
   */

  /*findMusers: async (ctx, nbmusic) => {
    
    MusersList = {}
    for user in users :
      count = 0
      for  music in usermusiclist :
        if music is in mymusic :
          count ++
      if count > nbmusic  :
        MusersList.add(user)

    // return MusersList
    return strapi.services.song.remove(ctx.params);
  }*/
};
