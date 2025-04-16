import { IEntityStatusDataEntity } from 'entities';
import { E_Data_Load_Status } from 'enums';

export const defaultEntityStatusDataEntity: IEntityStatusDataEntity = {
  setCurrentBU: E_Data_Load_Status.NOT_YET_STARTED,
  workspaceMenu: E_Data_Load_Status.NOT_YET_STARTED,
  list: E_Data_Load_Status.NOT_YET_STARTED,
  pipelineList: E_Data_Load_Status.NOT_YET_STARTED,
  dataAnalyzersStatus: E_Data_Load_Status.NOT_YET_STARTED,
  dataAnalyzerResultsStatus: E_Data_Load_Status.NOT_YET_STARTED,
  workspaceMenuStatus: E_Data_Load_Status.NOT_YET_STARTED,
  getAllUserInteractionsSatus: E_Data_Load_Status.NOT_YET_STARTED,
  getLiveUsersSatus: E_Data_Load_Status.NOT_YET_STARTED,
  getLiveUserChatSatus: E_Data_Load_Status.NOT_YET_STARTED,
};
