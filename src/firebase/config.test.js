import firebaseConfig from './config';

test('Whether FirebaseConfig file exists', () => {
  const projectID = firebaseConfig.projectId;

  expect(projectID).toBe('warhammer40karmybuilder');
});
