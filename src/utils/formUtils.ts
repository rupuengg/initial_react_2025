export const FormUtils = () => {
  return {
    getValue: (fieldName?: string, entity?: { [x: string]: any }) => {
      if (fieldName && entity && entity[fieldName]) return entity[fieldName];
      else if (fieldName && entity && fieldName.indexOf('.') >= 0) {
        const splits = fieldName.split('.');
        if (splits.length > 1 && entity[splits[0]] && entity[splits[0]][splits[1]]) return entity[splits[0]][splits[1]];
      }

      return '';
    },
    groupIntoPairs: (entities: { [x: string]: any }) => {
      let data: { [x: string]: any } = {};

      for (const key in entities) {
        if (key.indexOf('.') >= 0) {
          const splits = key.split('.');
          let single: { [x: string]: any } = {};
          if (splits.length === 3) {
            single = {
              [splits[1]]: {
                [splits[2]]: entities[key],
              },
            };
          } else if (splits.length === 2) {
            single = {
              [splits[1]]: entities[key],
            };
          }

          data = {
            ...data,
            [splits[0]]: {
              ...(data[splits[0]] ? data[splits[0]] : {}),
              ...single,
            },
          };
        } else {
          data[key] = entities[key];
        }
      }

      return data;
    },
  };
};
