# Add New Admin Menu and Its Table Content

## Create new Entity(Model) for new menu

Goto [Entities](https://github.com/rupuengg/pw-frontend/tree/development/src/entities)
**Create new Entity for Menu**

```
export interface INewMenuEntity {
  id?: number;
  ...etc,
}

```

## Create mock value for new Entity

Goto [mock](https://github.com/rupuengg/pw-frontend/tree/development/src/mock)

```
export const defaultMenuEntity: INewMenuEntity = {
  id: 1,
  ...etc,
};
```

## Add Column Setting

Goto [TableColumnSetting](https://github.com/rupuengg/pw-frontend/tree/development/src/constant/TablesColumnsSetting)
**Create New Directory for Same Menu**
**Add Column Setting for the new Menu**

```
export function getNewMenuColumnSetting(anaInfo?: any): (ColDef<INewMenuEntity> | ColGroupDef<INewMenuEntity>)[] {
  return [
    {
      field: 'id',
      headerName: 'ID.',
    },
    ...(getCommonColumnSetting(anaInfo) as (ColDef<INewMenuEntity> | ColGroupDef<INewMenuEntity>)[]),
  ];
}
```

## Create Form if you want add/edit/view values for new Menu

Goto [Forms](https://github.com/rupuengg/pw-frontend/tree/development/src/forms)
**Create form file for new menu**

```
export const NewMenuEntityForm: IBaseForm[] = [
  {
    type: E_Form_Type.COLUMN,
    rows: [
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'firstName',
            fieldLabel: 'Firstname',
            isRequired: true,
          },
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'lastName',
            fieldLabel: 'Lastname',
            isRequired: true,
          },
        ],
      },
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'email',
            fieldLabel: 'Email',
            isRequired: true,
          },
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'phone',
            fieldLabel: 'Phone',
            isRequired: true,
          },
        ],
      },
    ],
  },
  {
    type: E_Form_Type.COLUMN,
  },
  {
    type: E_Form_Type.COLUMN,
  },
];
```

## Add Mapper for new Menu

Goto [Mapper](https://github.com/rupuengg/pw-frontend/tree/development/src/mapper/index.ts)
**Create form file for new menu**
**Add new mapper for new Menu in switch statement line 54**

## Bind Endpoint for new Menu

Goto [Mapper](https://github.com/rupuengg/pw-frontend/tree/development/src/store/constants/DatApiPath.ts)
**Add endpoint as string**

```
export
 const DataApiPath: { [x: string]: string | IEndpoint } = {
  ...older,
  newMenu: 'api-path',
};
```

**Add Endpoint as object**

```
export
 const DataApiPath: { [x: string]: string | IEndpoint } = {
  ...older,
  newMenu: {
    list: 'api-path-for-list',
    get: 'api-path-for-get',
    save: 'api-path-for-save',
    update: 'api-path-for-update',
    delete: 'api-path-for-delete',
  },
};
```
