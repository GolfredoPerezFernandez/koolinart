export const storeCertificates = (set) => ({
  MovementCertificateArray: [],
  TotalMovementCertificateArray: 0,

  ChangeMovementCertificateArray: (value) =>
    set({ MovementCertificateArray: value }),
  ChangeTotalMovementCertificateArray: (value) =>
    set({ TotalMovementCertificateArray: value }),
});
