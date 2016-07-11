import trim from 'validator/lib/trim';

const Transforms = {
  trim,
  lowerCase(string) {
    return (string || '').toLowerCase();
  },
};

export default Transforms;
