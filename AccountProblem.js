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

const updateBalance = (trans) => (trans.type==='withdrawal')
  ?balances[trans.accountNo]-=trans.amount
  :balances[trans.accountNo]+=trans.amount;

const displayBalance = () => accounts.map(e=>{ return { Name : e.name, Account : e.accountNo, Balance : getBalance(e.accountNo)} })  
// const displayBalance = () => accounts.map(getBalance)  

const displayAccount = (accounts,balances,transactions) => {
  console.log('Before Update Balance')
  console.table(displayBalance())
  transactions.map(updateBalance)
  console.log('After Update Balance')
  console.table(displayBalance())
}


const main = () => {
  displayAccount(accounts,balances,transactions)
}

main()