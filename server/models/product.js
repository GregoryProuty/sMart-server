const knex = require('../db/knex')
const bookshelf = require('bookshelf')(knex)
const ModelBase = require('bookshelf-modelbase')(bookshelf)
bookshelf.plugin(require('bookshelf-modelbase').pluggable)

const Product = ModelBase.extend({
  tableName: 'products',

  seller: function() {
    const User = require('./user')
    return this.belongsTo(User, 'seller_id')
  },

  buyer: function() {
    const User = require('./user')
    return this.belongsTo(User, 'buyer_id')
  },

  category: function() {
    const Category = require('./category')
    return this.belongsTo(Category)
  },
  
  transaction: function() {
    const Transaction = require('./transaction')
    return this.hasOne(Transaction)
  }
  
}, {

  getWithSeller: function(id) {
    return this.where({id: id}).fetch({withRelated: ['seller']})
  },

  getWithAllRelated: function(id) {
    return this.where({id: id}).fetch({withRelated: ['seller', 'buyer', 'transaction']})
  },

  getAllBySellerId: function(seller_id) {
    return this.where({seller_id: seller_id}).fetchAll()
  },

  buyProduct: function (product_id, buyer_id) {
    return this.findById(product_id)
    .then(product => {
      return product.set({buyer_id: buyer_id, sold: true}).save()
    })
    .then(product => {
      return transaction.addNewTransaction(product)
    })
  },

  createFromSeller: function(reqObject) {
    // console.log(reqObject)
    return this.create({
      seller_id: reqObject.seller_id,
      address: reqObject.address,
      address_2: reqObject.address_2,
      postal_code: reqObject.postal_code,
      category_id: reqObject.category_id,
      title: reqObject.title,
      description: reqObject.description,
      asking_price: reqObject.asking_price,
      image_links: reqObject.imageUrl  //make sure is array
    })
  }
})
module.exports = Product