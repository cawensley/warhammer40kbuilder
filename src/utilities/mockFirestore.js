const docData = { data: "MOCK_DATA" };
const docResult = {data: () => docData};
const get = jest.fn(() => Promise.resolve(docResult));
const set = jest.fn();
const doc = jest.fn(() => {return {set, get, delete: jest.fn()};});
const onSnapshot = jest.fn(() => Promise.resolve(docResult));
const add = jest.fn();
const collection = jest.fn(() => {return {doc, get, add , onSnapshot};});
const firestore = () => {return { collection };};

firestore.FieldValue = {
    serverTimestamp: () => {
        return "MOCK_TIME";
    }
};

export { firestore };