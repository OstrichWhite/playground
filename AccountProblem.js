const { map } = require('@laufire/utils/collection')
const accounts = [
  { name: 'Babu', accountNo: 2 },
  { name: 'Chandra', accountNo: 3 },
  { name: 'Arun', accountNo: 1 },
];
const balances = { '1': 5000, '2': 2000, '3': 0 }; //accountNo: balance
const transactions = [
  { accountNo: 1, type: 'withdrawal', amount: 1000 },
  { accountNo: 1, type: 'deposit', amount: 500 },
  { accountNo: 1, type: 'withdrawal', amount: 1000 },
  { accountNo: 2, type: 'deposit', amount: 300 },
  { accountNo: 2, type: 'withdrawal', amount: 200 },
  { accountNo: 2, type: 'deposit', amount: 200 },
];

const displayBalance = (data) => {
  const { accounts,balances } = data;
  return map(accounts,(account) =>{ 
    const {name, accountNo} = account;
    return { 
      name, 
      accountNo, 
      Balance:balances[accountNo],
    }; 
  });  
};

const doTransactions = (data) => {
  const{ balances,transactions,accounts } = data;
  map(transactions,(transaction) => {
    (transaction.type === 'withdrawal')
      ?balances[transaction.accountNo]-=transaction.amount
      :balances[transaction.accountNo]+=transaction.amount
  })
  return {balances,transactions,accounts}
}

const displayTransactionReport = (data) => {
  console.log('Before Transactions')
  console.table(displayBalance(data))
  console.log('After Transactions')
  console.table(displayBalance(doTransactions(data)))
};

const main = () => {
  displayTransactionReport({accounts,balances,transactions});
};

main();