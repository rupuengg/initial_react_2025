import { E_Data_Load_Status } from 'enums';

export interface IEntityStatusDataEntity {
  setCurrentBU?: E_Data_Load_Status;
  workspaceMenu?: E_Data_Load_Status;
  list?: E_Data_Load_Status;
  pipelineList?: E_Data_Load_Status;
  dataAnalyzersStatus?: E_Data_Load_Status;
  dataAnalyzerResultsStatus?: E_Data_Load_Status;
  workspaceMenuStatus?: E_Data_Load_Status;
  getAllUserInteractionsSatus?: E_Data_Load_Status;
  getLiveUsersSatus?: E_Data_Load_Status;
  getLiveUserChatSatus?: E_Data_Load_Status;

  [x: string]: E_Data_Load_Status | undefined;
}
