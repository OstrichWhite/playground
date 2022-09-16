// const data=[
//   {name:'rahim',rollno:1,subjects:{maths:40,science:78,language:98}},
//   {name:'kabeer',rollno:2,subjects:{maths:35,science:35,language:35}},
//   {name:'kishore',rollno:3,subjects:{maths:40,science:98,language:78}},
//   {name:'umar',rollno:4,subjects:{maths:34,science:88,language:98}},
// ]

const data=[
  {name:'Sriram',rollno:1,subjects:{language:'90',maths: '80',science: '33'}},
  {name:'ashiq',rollno:1,subjects:{language:'90',maths: '80',science: '33'}},
  {name:'Mani',rollno:1,subjects:{language:'60',maths: '70',science: '46'}},
  {name:'Kishore',rollno:1,subjects:{language:'60',maths: '70',science: '46'}},
  {name:'sai',rollno:1,subjects:{language:'70',maths: '70',science: '75'}},
  {name:'abdul',rollno:1,subjects:{language:'60',maths: '70',science: '46'}},
  {name:'kabeer',rollno:1,subjects:{language:'70',maths: '70',science: '75'}},
  {name:'umar',rollno:1,subjects:{language:'70',maths: '70',science: '75'}},
  {name:'nithis',rollno:1,subjects:{language:'35',maths: '35',science: '35'}}
]

const {collection}= require('@laufire/utils');

let statistics=[];

collection.map(data,(e)=>{
  let total= Number(e.subjects.language)+Number(e.subjects.maths)+Number(e.subjects.science);
  (e.subjects.language<35 || e.subjects.maths<35 || e.subjects.science<35)
    ?statistics.push({ name: e.name, rollno: e.rollno, total: total, test: 'fail' })
    :statistics.push({ name: e.name, rollno: e.rollno, total: total, test: 'pass' })
})


let failStatistics = collection.filter(statistics,e=>e.test=='fail')
collection.map(failStatistics,e=>e.rank='-')

let passStatistics = collection.filter(statistics,e=>e.test!=='fail')//.sort(function (a, b) {return b.total- a.total});//sort the passed student marks
passStatistics=collection.sort(passStatistics,((a, b)=> {return b.total- a.total}))

let rank=1,check=0, count=1
collection.map(passStatistics,(e,i)=>{ 
    // if(check!=e.total){
    //   check=e.total;
    //   rank++
    // }
    // e.rank = rank;

    if(check!=e.total){
      check=e.total;
      rank=count
    }
    e.rank=rank
    count++
  })
  .sort(function (a, b) {return a.rank - b.rank}); //Sort by rank here to show in the table

// const studentStatistics= passStatistics.concat(failStatistics)
const studentStatistics=[]
collection.combine(studentStatistics,passStatistics,failStatistics)

console.table(studentStatistics)
console.log(`passed count ${passStatistics.length} failed count ${failStatistics.length}`)

