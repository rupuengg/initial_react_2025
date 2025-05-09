export const EnumUtils = () => {
  return {
    enum2Obj: <EV, ET extends { [key: string]: EV }>(e: ET) => {
      const keys: (keyof ET)[] = Object.keys(e);
      const isStringEnum = isNaN(Number(keys[0]));
      const ekeys = isStringEnum ? keys : keys.slice(keys.length / 2);
      return ekeys.map((name: keyof ET) => ({ id: name, name: e[name] }));
    },
  };
};
