const { map,reduce } = require('@laufire/utils/collection')
/* Data */
const rates = { Carrot: 10, Apple: 200, Guava: 50 };
const discounts = { Apple: 10 }; // values are in percentages.
const taxes = { Carrot: 5, Guava: 10 }; // values are in percentages.
const purchases = [
  { item: 'Carrot', units: 20 },
  { item: 'Apple', units: 2, },
  { item: 'Guava', units: 1, },
];
/* Functions */
const getDiscountPercent = (discounts,productName) => (discounts[productName] || 0) /100 
const getTaxPercent = (taxes,productName) => (taxes[productName] || 0) /100

const getUnitPrice = (data) => {
  const {rates, discounts, taxes, purchases} = data
  const newPurchase = map(purchases,purchase=>{
    const rate = rates[purchase.item]
    const discount=rate*getDiscountPercent(discounts,purchase.item)
    const tax=rate*getTaxPercent(taxes,purchase.item)
    return { 
      ...purchase,
      unitPrice:rate-discount+tax,
    }
  })
  return {rates, discounts, taxes, purchases: newPurchase}
}
const getLineItemPrice = (data) =>{
  const {rates, discounts, taxes, purchases} = data;
  const newPurchase = map(purchases,purchase=>{
    return{
      ...purchase,
      itemPrice:purchase.units*purchase.unitPrice,
    }
  })
  return {rates, discounts, taxes, purchases: newPurchase}
} 
const getSum = (data) => {
  const { purchases } =data
  let sum=reduce(purchases,(a,b)=> {
    return {itemPrice: a.itemPrice+b.itemPrice}
  },{itemPrice:0});
  return sum.itemPrice
}

// Do not change below this line.
/* Main Function */
const main = function main() {
  console.log(getSum(getLineItemPrice(getUnitPrice({rates, discounts, taxes, purchases}))));
}

main();