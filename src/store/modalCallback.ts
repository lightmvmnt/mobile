let modalCallback: (() => void) | null = null;

export const setModalCallback = (cb: (() => void) | null) => {
  modalCallback = cb;
};

export const getModalCallback = () => modalCallback;
