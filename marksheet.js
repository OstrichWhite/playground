const { values,reduce,map,filter,combine,sort } = require('@laufire/utils/collection');

const students=[
  {name:'rahim',rollno:1,subjects:{maths:40,science:78,language:98}},
  {name:'kabeer',rollno:2,subjects:{maths:35,science:35,language:35}},
  {name:'kishore',rollno:3,subjects:{maths:40,science:98,language:78}},
  {name:'umar',rollno:4,subjects:{maths:34,science:88,language:98}},
]

const studentResults=map(students,(student)=>{
  const {subjects} =student;
  const total=reduce(subjects,(sum,mark)=>sum+mark,0)
  const result=values(subjects).some((subject)=>subject<35)?'fail':'pass';
  
  return {
    ...student,
    total,
    result,
  };
})

const passStatistics=sort(filter(studentResults,e=>e.result==='pass'),(a,b)=>b.total-a.total)
const failStatistics=filter(studentResults,e=>e.result==='fail');

let rank=1,check=0, count=1;
map(passStatistics,(e,i)=>{ 
    if(check!=e.total){
      check=e.total;
      rank=count;
    }
    e.rank=rank;
    count++;
  });

let studentStatistics=[];
combine(studentStatistics,passStatistics,failStatistics);
console.table(studentStatistics);
console.log(`passed count ${passStatistics.length} failed count ${failStatistics.length}`);