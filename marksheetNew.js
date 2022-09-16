const data=[
  {name:'rahim',rollno:1,subjects:{maths:40,science:78,language:98}},
  {name:'kabeer',rollno:2,subjects:{maths:35,science:35,language:35}},
  {name:'kishore',rollno:3,subjects:{maths:40,science:98,language:78}},
  {name:'umar',rollno:4,subjects:{maths:34,science:88,language:98}},
];

const studentResult = data.map(e => {
  let result= Object.values(e.subjects).some(e=>((e<35)?'pass':'fail'));
  console.log(result);
})