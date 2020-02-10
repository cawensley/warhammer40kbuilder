const docData = {data: {Name:"Bob",SortOrder:1}};
const documents = {docs: [{id: "1111",data:()=>docData}]};
const get = jest.fn(() => Promise.resolve(documents));
const set = jest.fn();
const doc = jest.fn(() => {return {set, get, delete: jest.fn()};});
const onSnapshot = jest.fn((success,error) => success(documents));
const add = jest.fn();
const collection = jest.fn(() => {return {doc, get, add , onSnapshot};});
const firestore = () => {return { collection }};

export { firestore };