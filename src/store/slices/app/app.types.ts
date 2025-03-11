export interface AppInitialState {
  isModalOpen: boolean;
  modalTitle?: string;
  modalDescription?: string;
  modalButtonHandler: () => void;
  mainButtonTitle?: string;
  secondaryButtonTitle?: string;
  referralLink?: string;
}
