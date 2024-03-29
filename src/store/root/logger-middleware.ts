export default () => (next) => (action) => {
  const { type, payload, meta } = action;

  console.groupCollapsed(type);
  // tslint:disable-next-line
  console.log("Payload:", payload);
  // tslint:disable-next-line
  console.log("Meta:", meta);
  console.groupEnd();

  return next(action);
};
