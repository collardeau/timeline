import hasher from 'hasher';

let handleChange = (ui) => {
  let hash = hasher.getHash();
  let parts = hash.split('/');
  ui({
    route: parts.shift(),
    routeParams: parts
  });
};

export default () => {
  return {
    start: (ui) => {
      hasher.init();
      hasher.changed.add(handleChange.bind(this, ui));
      hasher.initialized.add(handleChange.bind(this, ui));
    }
  };
};

