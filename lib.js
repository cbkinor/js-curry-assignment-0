'use strict'

const entries =
  obj =>
    Object.keys(obj)
      .map(key => [key, obj[key]])

const listing =
  (name, price) => ({
    name,
    price
  })

const customer =
  (name, shoppingList) => ({
    name,
    shoppingList
  })

const cart =
  (customer, ...items) => ({
    customer,
    items
  })

/**
 * should return an array with the `itemName` repeated `count` number of times
 */
const itemRepeater =
  itemName =>
    count => {
      let array = []
      for (let i = 0; i < count; i++) {
        array.push(itemName)
      }
      return array
    }

/**
 * should return an array of carts with each given customer's shopping list
 * as an array of items
 */
const constructCarts =
  listings =>
    customers => {
      return customers
        .map(customer =>
          ({ customer: customer.name,
             items: (entries(customer.shoppingList)
                .reduce((result, item) =>
                  [...result, ...itemRepeater(item[0])(item[1])], []))
                    .reduce((result, item) =>
                      [...result, ...listings
                        .filter(listing =>
                          item === listing.name)], [])
          })
        )
    }

module.exports = {
  listing,
  customer,
  constructCarts
}
