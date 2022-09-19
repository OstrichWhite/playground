const { transpose } = require('@laufire/utils/crunch');
/* Data */
const rates ={
  Carrot: 10,
  Apple: 200,
  Guava: 50,
};

const discounts = {
  // values are in percentages.
  Apple: 10,
};

const taxes = {
  // values are in percentages.
  Carrot: 5,
  Guava: 10,
};

const purchases =[
  {
    item: 'Carrot',
    units: 20,
  },
  {
    item: 'Apple',
    units: 2,
  },
  {
    item: 'Guava',
    units: 1,
  },
];
const transposed = transpose({ rates, discounts, taxes, purchases });
/* Functions */
const getDiscountPercent = (productName) => (discounts[productName] || 0) /100 ;

const getTaxPercent = (productName) => (taxes[productName] || 0) /100 ;

const getUnitPrice = (itemName) => {
  const rate = rates[itemName]
  const discount=rate*getDiscountPercent(itemName)
  const tax=rate*getTaxPercent(itemName)
  return rate-discount+tax
};

const getItemTotalPrice = (lineItem) => lineItem.units*getUnitPrice(lineItem.item);

const getSum = () => {
  return purchases.map(getItemTotalPrice).reduce((a,b)=>a+b,0);
};

// Do not change below this line.
/* Main Function */
const main = function main() {
  console.log(getSum());
}

main();
