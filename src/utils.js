export const activateIfFunction = (value, ...params) => {
    return value instanceof Function? value(...params): value;
};