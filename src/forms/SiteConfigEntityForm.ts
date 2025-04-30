import { defaultNavigation } from 'mock';
import { INavigation } from 'entities';
import { E_FieldType, E_Form_Type } from 'enums';
import { IBaseForm, IOption } from './BaseForm';

const getNavs = (navs: INavigation[]): IOption[] => {
  let options: IOption[] = [];

  navs.forEach((nav: INavigation) => {
    options.push({ key: nav.link, value: nav.link });

    if (nav.items && nav.items.length > 0) options = options.concat(getNavs(nav.items));
  });

  return options;
};

export const SiteConfigEntityForm: IBaseForm[] = [
  {
    type: E_Form_Type.COLUMN,
    rows: [
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'title',
            fieldLabel: 'Title',
            isRequired: true,
          },
        ],
      },
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXTAREA,
            fieldName: 'description',
            fieldLabel: 'Meta Description',
            isRequired: true,
          },
        ],
      },
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.DROPDOWN_ONE_SELECT,
            fieldName: 'route',
            fieldLabel: 'Route',
            options: getNavs(defaultNavigation),
          },
        ],
      },
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TAG,
            fieldName: 'keywords',
            fieldLabel: 'Meta Keywords',
          },
        ],
      },
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'ogSiteName',
            fieldLabel: 'OG Site name',
          },
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'ogUrl',
            fieldLabel: 'OG Url',
          },
        ],
      },
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'ogTitle',
            fieldLabel: 'OG Title',
          },
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXTAREA,
            fieldName: 'ogDescription',
            fieldLabel: 'OG Description',
          },
        ],
      },
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'ogType',
            fieldLabel: 'OG Type',
          },
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'ogSeeAlso',
            fieldLabel: 'OG See Also',
          },
        ],
      },
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'ogLocale',
            fieldLabel: 'OG Locale',
          },
        ],
      },
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'ogLocaleAlternate1',
            fieldLabel: 'OG Locale Alternate 1',
          },
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'ogLocaleAlternate2',
            fieldLabel: 'OG Locale Alternate 2',
          },
        ],
      },
    ],
  },
  {
    type: E_Form_Type.COLUMN,
    rows: [
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.URL_CAPTURE,
            fieldName: 'ogImageUrl',
            fieldLabel: 'OG Image Url',
          },
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'ogImageSecureUrl',
            fieldLabel: 'OG Image Secure Url',
          },
        ],
      },
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'ogImageType',
            fieldLabel: 'OG Image Type',
          },
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'ogImageAlt',
            fieldLabel: 'OG Image Alt',
          },
        ],
      },
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'ogImageWidth',
            fieldLabel: 'OG Image Width',
          },
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'ogImageHeight',
            fieldLabel: 'OG Image Height',
          },
        ],
      },
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'ogVideoSecureUrl',
            fieldLabel: 'OG Video Secure Url',
          },
        ],
      },
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'ogVideoType',
            fieldLabel: 'OG Video Type',
          },
        ],
      },
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'ogVideoWidth',
            fieldLabel: 'OG Video Width',
          },
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'ogVideoHeight',
            fieldLabel: 'OG Video Height',
          },
        ],
      },
    ],
  },
];
