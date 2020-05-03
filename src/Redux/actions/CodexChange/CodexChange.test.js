import store from '../../store';
import CodexChange from './CodexChange';

test('Redux Action CodexChange is successful in redux state change', () => {
  store.dispatch(CodexChange('Ninjas'));
  const CodexState = store.getState().codex;

  expect(CodexState).toBe('Ninjas');
});
