const docData = {Name:"Bob",SortOrder:1,Cost:0,Role:"Hero",MinSize:1,MaxSize:10,Abilities:"None",Gear:[],Units:[]};
const documents = {docs: [{id: "1111",data:()=>docData}]};
const singleDoc = {data:()=>docData};
const getColl = jest.fn(() => Promise.resolve(documents));
const getDoc = jest.fn(() => Promise.resolve(singleDoc));
const set = jest.fn();
const doc = jest.fn(() => {return {set, get: getDoc, delete: jest.fn()};});
const onSnapshot = jest.fn((success,error) => success(documents));
const add = jest.fn();
const collection = jest.fn(() => {return {doc, get: getColl, add , onSnapshot};});
const firestore = () => {return { collection }};

export { firestore };