/*
 * adonis-hexa
 *
 * Contributor: Caleb Mathew <creatrixity@gmail.com>
 *
*/
"use strict";

/**
 * The Repository class is the main warehouse of methods that access data.
 * It is to be extended by other repositories within the Hexa framework as sort of a base repository.
 *
 * **Namespace**: `Src/Data/Repositories/Repository` <br />
 * **Singleton**: No <br />
 * **Alias**: None
 *
 * @class Repository
 * @constructor
 */
class Repository {
  /**
   * @param model - The model which will be the data object for our methods to act upon.
   *
   * @return {Void}
   */
  constructor(model) {
    this.model = model;
  }

  /**
   * Returns the first record in the database.
   *
   * @method first
   *
   * @return {Object} Lucid/ORM
   */
  async first() {
    return await this.model.first();
  }

  /**
   * Returns all records in the database.
   *
   * @method all
   *
   * @return {Object} Lucid/ORM
   */
  async all() {
    return await this.model.all();
  }

  /**
   * Counts all records.
   *
   * @method count
   *
   * @return {Object} Lucid/ORM
   */
  async count() {
    return await this.model.getCount();
  }

  /**
   * Find a record.
   *
   * @method find
   *
   * @param {Integer} id - ID of the record of interest.
   * @param {Array} relations - Array of relations for this record.
   *
   * @return {Object} Lucid/ORM
   */
  find(id, relations = null) {
    return this.findBy(this.model.primaryKey, id, relations);
  }

  /**
   * Find a record by an attribute. Fails if no model is found.
   *
   * @method findBy
   *
   * @param {String} attribute - Attribute of interest. Example: 'username'
   * @param {String} value - Value matching the provided attribute. Example: 'johndoe3001'
   * @param {Array} relations - Array of relations for this record.
   *
   * @return {Object} Lucid/ORM
   */
  async findBy(attribute, value, relations = null) {
    const query = this.model.query().where(attribute, value);

    if (relations !== null && typeof relations === "array") {
      relations.map(relation => {
        query.with(relation);
      });
    }

    return await query.firstOrFail();
  }

  /**
   * Returns a range of records bounded by pagination parameters.
   *
   * @method page
   *
   * @param {Integer} limit - The maximum number of records that may be returned. Example: '15'
   * @param {Integer} offset - The number of records to be skipped. Example: '25'
   * @param {Array} relations - Array of relations for this record.
   * @param {String} orderBy - The column to sort results by. Example: 'created_at'
   * @param {String} sorting - The order to present the results in. Example: 'asc'
   *
   * @return {Object} Lucid/ORM
   */
  async page(
    limit = 10,
    offset = 0,
    relations = [],
    orderBy = "updated_at",
    sorting = "desc"
  ) {
    return await this.model
      .query()
      .with(relations)
      .limit(limit)
      .offset(offset)
      .orderBy(orderBy, sorting)
      .get();
  }

  /**
   * Returns a range of records bounded by pagination parameters where query parameters are satisfied.
   *
   * @method pageWhere
   *
   * @param {Object} query - Parameters that must be satisfied for records to be returned.
   * @param {Integer} limit - The maximum number of records that may be returned. Example: '15'
   * @param {Integer} offset - The number of records to be skipped. Example: '25'
   * @param {Array} relations - Array of relations for this record.
   * @param {String} orderBy - The column to sort results by. Example: 'created_at'
   * @param {String} sorting - The order to present the results in. Example: 'asc'
   *
   * @return {Object} Lucid/ORM
   */
  async pageWhere(
    query = {},
    limit = 10,
    offset = 0,
    relations = "",
    orderBy = "updated_at",
    sorting = "desc"
  ) {
    if (relations.length > 0) {
      return await this.model
        .query()
        .where(query)
        .with(relations)
        .limit(limit)
        .offset(offset)
        .orderBy(orderBy, sorting)
        .fetch();
    } else {
      return await this.model
        .query()
        .where(query)
        .limit(limit)
        .offset(offset)
        .orderBy(orderBy, sorting)
        .fetch();
    }
  }

  /**
   * Find a record by a key value pair of attributes. Fails if no model is found.
   *
   * @method where
   *
   * @param {Object} query - Parameters that must be satisfied for records to be returned.
   * @param {String} operand - The operand to use for this query. Examples: '<', '>', '='
   * @param {String} value - Value matching the provided attribute.
   *
   * @return {Object} Lucid/ORM
   */
  async where(query, operand = null, value = null) {
    let q = this.model.query();

    if (typeof query == "object") {
      q = q.where(query);
    } else {
      q = operand ? q.where(query, operand, value) : q.where(query, value);
    }

    return await q;
  }

  /**
   * Creates a new instance of the model.
   *
   * @method create
   *
   * @param {Object} attributes - Attributes of the new record to be created.
   *
   * @return {Object} Lucid/ORM
   */
  async create(attributes = null) {
    return await this.model.create(attributes);
  }

  /**
   * Creates a new instance of the model if none exists.
   *
   * @method findOrCreate
   *
   * @param {Object} attributes - Attributes of the new record to be created.
   *
   * @return {Object} Lucid/ORM
   */
  async findOrCreate(attributes = null) {
    return await this.model.findOrCreate(attributes);
  }

  /**
   * Fills out an instance of the model.
   *
   * @method fill
   *
   * @param {Object} attributes - Attributes of the new record instance to be filled.
   *
   * @return {Object} Lucid/ORM
   */
  async fill(attributes) {
    return await this.model.fill(attributes);
  }

  /**
   * Fills out an instance of the model and saves it.
   *
   * @method store
   *
   * @param {Object} attributes - Attributes of the new record to be stored.
   *
   * @return {Object} Lucid/ORM
   */
  async store(attributes) {
    const model = new this.model();
    model.fill(attributes);

    return await model.save();
  }

  /**
   * Updates an instance of the model.
   *
   * @method store
   *
   * @param {Object} attributes - Attributes of the record to be updated.
   *
   * @return {Object} Lucid/ORM
   */
  async update(key, data) {
    return await this.model
      .query()
      .where(this.model.primaryKey, key)
      .update(data);
  }

  /**
   * Deletes an instance of the model.
   *
   * @method remove
   *
   * @param {String} key - primary key of the record to be deleted. Example: '1'.
   *
   * @return {Object} Lucid/ORM
   */
  async remove(key) {
    return await this.model
      .query()
      .where(this.model.primaryKey, key)
      .delete();
  }
}

module.exports = Repository;
