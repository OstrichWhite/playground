const { map,reduce } = require('@laufire/utils/collection')
const {transpose,index} = require('@laufire/utils/crunch')

/* Data */
const rates = {
  carrot: 10,
  apple: 200,
  guava: 50,
};

const discounts = {
  apple: 10,
}; // values are in percentages.

const taxes = {
  carrot: 5,
  guava: 10,
}; // values are in percentages.

const purchases ={
  1:[ 
    { item: 'carrot', units: 20, },
    { item: 'apple', units: 2, },
    { item: 'guava', units: 1, },
  ],
  2:[
    { item: 'carrot', units: 20, },
    { item: 'apple', units: 2, },
    { item: 'guava', units: 1, },
  ],
  3:[
    { item: 'carrot', units: 20, },
    { item: 'apple', units: 2, },
    { item: 'guava', units: 1, },
  ],
  4:[]
};
/* Functions */
const getDiscountPercent = (productName) => (discounts[productName] || 0) /100 
const getTaxPercent = (productName) => (taxes[productName] || 0) /100

const getUnitPrice = (itemName) => {
  const rate = rates[itemName]
  const discount=rate*getDiscountPercent(itemName)
  const tax=rate*getTaxPercent(itemName)
  return rate-discount+tax
}
const getLineItemPrice = (lineItem) => lineItem.units*getUnitPrice(lineItem.item)
const getPurchaseTotal = () => {
  const result = map(purchases,(customer)=>{
    const purchasedItem = map(customer,(getLineItemPrice))
    return reduce(purchasedItem,(a,b)=>a+b,0)
  })
  return result;
}

// Do not change below this line.
/* Main Function */
const main = function main() {
  console.log(getPurchaseTotal());
}

main();
