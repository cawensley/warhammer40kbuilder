import checkPropTypes from 'check-prop-types';

export const findByTestAttr = (wrapper, value) => wrapper.find(`[data-test="${value}"]`);

export const checkProp = (component, conformingProps) => {
  const propError = checkPropTypes(
    /* eslint-disable react/forbid-foreign-prop-types */
    component.propTypes,
    conformingProps,
    'prop',
    component.name,
  );
  expect(propError).toBeUndefined();
};
