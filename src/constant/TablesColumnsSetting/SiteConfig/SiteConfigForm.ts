import { DropdownOptions } from 'store';

export const quayCraneRequiredFieldList: string[] = [
  'quayCraneNo',
  'type',
  'berth',
  'tieDownIndr',
  'operationStartBollard',
  'operationEndBollard',
  'outreachLengthByMeter',
  'outreachLengthByBoxes',
  'liftingHeightLimit',
  'liftingSingleTonnage',
  'liftingTwinTonnage',
  'width',
  'color',
];

export const qcTieDownCheckboxOption: any[] = [{ key: 'tieDownIndr', name: '' }];

export const qcTypeDropdownOption: DropdownOptions[] = [
  { dropdownLabel: 'Quay Crane', tagLabel: 'O1', value: 'Q' },
  { dropdownLabel: 'Jeep Crane', tagLabel: 'O1', value: 'J' },
  { dropdownLabel: 'Dummy Crane', tagLabel: 'O1', value: 'D' },
  { dropdownLabel: 'Self-Sustain', tagLabel: 'O1', value: 'S' },
];

export const qcmaintenanceRadioOption: any[] = [
  {
    inputId: 1,
    key: 'Repair',
    name: 'Repair',
  },
  {
    inputId: 2,
    key: 'Maintenance',
    name: 'Maintenance',
  },
];

export interface quayCraneDynamicDropdownOptions {
  berthDropdownOption: DropdownOptions[];
  subBerthDropdownOption: { [key: string]: DropdownOptions[] };
}
