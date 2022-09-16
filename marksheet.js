const { values,reduce,map,count,sort } = require('@laufire/utils/collection');
const { index } = require('@laufire/utils/crunch');

const assignResult = (students)=>
  map(students,(student)=>{
    const {subjects} =student;
    const total=reduce(subjects,(sum,mark)=>sum+mark,0);
    const result=values(subjects).some((subject)=>subject<35)?'fail':'pass';
    
    return {
      ...student,
      total,
      result,
    };
  });

const assignRank = (students)=>{
  const { pass: passedStudents, fail: failedStudents } = index(students,['result']);
  const sortedStudents=sort(passedStudents,(a,b)=>b.total-a.total);

  const { rankedStudents } = reduce(sortedStudents,(acc,student,i) => { 
    const {rank,check,count,rankedStudents} =acc;
    const {total} = student;
    const updatedRank=check!=total?count:rank;

    return {
      ...acc,
      check:check!=total?total:check,
      count:count+1,
      rank:updatedRank,
      rankedStudents:[...rankedStudents,{...student,rank:updatedRank}],
    };
  },{rank:1,check:0,count:1,rankedStudents:[]});

  return [
    ...rankedStudents,
    ...failedStudents,
  ];
};

const displayMarksheet = (students) => {
  const { pass: passedStudents, fail: failedStudents } = index(students, ['result']);

  console.table(students);
  console.log(`passed count ${count(passedStudents)} failed count ${count(failedStudents)}`); 
};
  
const generateMarksheet = (students) =>
  displayMarksheet(assignRank(assignResult(students)));

generateMarksheet([
  {name:'rahim',rollno:1,subjects:{maths:40,science:78,language:98}},
  {name:'kabeer',rollno:2,subjects:{maths:35,science:35,language:35}},
  {name:'kishore',rollno:3,subjects:{maths:40,science:98,language:78}},
  {name:'umar',rollno:4,subjects:{maths:34,science:88,language:98}},
]);