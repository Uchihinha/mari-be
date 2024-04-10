export const isLocal = () => process.env.NODE_ENV === 'local';

export const frontEndPath = (path: string) => {
  return `${process.env.FRONT_URL}${path}`;
};
