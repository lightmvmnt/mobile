export const socialAccountType = (type_id: number) => {
  let type: 'FB' | 'TT' | 'YT' | 'LDIN' = 'FB';

  switch (type_id) {
    case 1:
      type = 'FB';
      break;
    case 2:
      type = 'LDIN';
      break;
    case 3:
      type = 'TT';
      break;
    case 4:
      type = 'YT';
      break;
    default:
      break;
  }

  return type;
};
