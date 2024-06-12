export const storeStepper = (set) => ({
  OpenStepper: false,
  IndexProcess: 0,
  ErrorProcess: false,
  TypeStepper: [],
  TypeStepperSale: [
    { label: "Uploading assets and Metadata" },
    { label: "Mint your nft" },
    { label: "Put on Marketplace" },
    { label: "All steps completed - you are finished" },
  ],
  TypeStepperNoSale: [
    { label: "Uploading assets and Metadata" },
    { label: "Mint your nft" },
    { label: "All steps completed - you are finished" },
  ],
  TypeStepperCollection: [
    { label: "Uploading assets and Metadata" },
    { label: "Mint your Collection" },
    { label: "All steps completed - you are finished" },
  ],
  ChangeOpenStepper: (value) => set({ OpenStepper: value }),
  ChangeIndexProcess: (value) => set({ IndexProcess: value }),
  ChangeErrorProcess: (value) => set({ ErrorProcess: value }),
  ChangeTypeStepper: (value) => set({ TypeStepper: value }),
});
