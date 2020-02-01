import checkPropTypes from 'check-prop-types';

export const findByTestAttr = (wrapper,value) => {
    return wrapper.find(`[data-test="${value}"]`)
};

export const checkProp = (component,conformingProps) => {
    const propError = checkPropTypes(
        component.propTypes,
        conformingProps,
        'prop',
        component.name);
    expect(propError).toBeUndefined();
};