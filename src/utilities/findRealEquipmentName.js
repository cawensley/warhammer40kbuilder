import store from '../Redux/store';

export default function findRealEquipmentName(input) {
  const realEquipment = store.getState().equipment.filter((data) => data.id.includes(input));
  if (realEquipment.length > 0) { return realEquipment[0].Name; }
  return input;
}
