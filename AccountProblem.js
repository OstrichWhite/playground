const accounts = [
  {
    name: 'Babu',
    accountNo: 2,
  },
  {
    name: 'Chandra',
    accountNo: 3,
  },
  {
    name: 'Arun',
    accountNo: 1,
  },
];
const balances = {
  //accountNo: balance
  '1': 5000,
  '2': 2000,
  '3': 0,
};
const transactions = [
  {
    accountNo: 1,
    type: 'withdrawal',
    amount: 1000,
  },
  {
    accountNo: 1,
    type: 'deposit',
    amount: 500,
  },
  {
    accountNo: 1,
    type: 'withdrawal',
    amount: 1000,
  },
  {
    accountNo: 2,
    type: 'deposit',
    amount: 300,
  },
  {
    accountNo: 2,
    type: 'withdrawal',
    amount: 200,
  },
  {
    accountNo: 2,
    type: 'deposit',
    amount: 200,
  },
];

const getBalance = (accountNo) => balances[accountNo];
// const getBalance = (account) =>{ return { Name:account.name, Account:account.accountNo, Balance:balances[account.accountNo]} }

const displayBalance = () => accounts.map(e=>{ return { Name : e.name, Account : e.accountNo, Balance : getBalance(e.accountNo)} })  
// const displayBalance = () => accounts.map(getBalance)  

const updateBalance = (data) => {
  const{ balances,transactions } = data
  transactions.map((transaction) => {
    const updateBalanceConditions = {
      withdrawal: ()=> balances[transaction.accountNo]-=transaction.amount,
      deposit: ()=> balances[transaction.accountNo]+=transaction.amount,
    };
    return updateBalanceConditions[transaction.type]();
  })
}

const displayAccountsReport = (data) => {
  console.log('Before Update Balance')
  console.table(displayBalance())
  updateBalance(data)
  console.log('After Update Balance')
  console.table(displayBalance())
};

const main = () => {
  displayAccountsReport({accounts,balances,transactions});
};

main();