import numberAscend from "./numberAscend";

const mockArray = [
    {Codex: "Ninjas",Name: "CoolNinja10",SortOrder: 2},
    {Codex: "Pirates",Name:"BlackBeard",SortOrder: 3},
    {Codex: "Worker",Name:"BusyBee",SortOrder: 3},
    {Codex: "Cops",Name:"Donny",SortOrder: 1},
    {Codex: "Fireman",Name:"Jake",SortOrder: 4}
];

test("numberAscend function sorts array by number ascending properly",()=>{
    const mockDisplayResults = mockArray.sort(numberAscend);
    expect(mockDisplayResults[0].Name).toEqual("Donny");
});