export enum SnackbarType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}

export const SnackbarIcon: { [key in SnackbarType]: string } = {
  [SnackbarType.SUCCESS]: 'celebration',
  [SnackbarType.ERROR]: 'cancel',
  [SnackbarType.INFO]: 'info',
};
