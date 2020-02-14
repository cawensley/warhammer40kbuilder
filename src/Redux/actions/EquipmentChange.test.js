import store from '../store';
import EquipmentChange from './EquipmentChange';

test('Redux Action EquipmentChange is successful in redux state change', () => {
  store.dispatch(EquipmentChange(['Ninjas', 'Pirates']));
  const EquipmentState = store.getState().equipment;
  expect(EquipmentState).toEqual(['Ninjas', 'Pirates']);
});
