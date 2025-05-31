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
  mainNavigation?: E_Data_Load_Status;
  sidebarNavigation?: E_Data_Load_Status;
  getAllGalleries?: E_Data_Load_Status;
  allPhotos?: E_Data_Load_Status;
  testimonial?: E_Data_Load_Status;
  offers?: E_Data_Load_Status;
  blogs?: E_Data_Load_Status;
  basicConfig?: E_Data_Load_Status;

  [x: string]: E_Data_Load_Status | undefined;
}
