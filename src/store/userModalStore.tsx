/**
 * This code defines a Zustand store for managing a modal state with properties for open, title,
 * message, and a function to update the state.
 * @property {boolean} open - A boolean value indicating whether the modal is open or not.
 * @property {string} title - A string that represents the title of the modal.
 * @property {string} message - The `message` property is a string that represents the content or
 * message of the modal. It can be used to display information or instructions to the user.
 * @property setStateModalGlobal - setStateModalGlobal is a function that can be used to update the
 * state of the modal globally. It takes three parameters:
 */
import { create } from "zustand";

type State = {
  open: boolean;
  title: string;
  message: string;
  setStateModalGlobal: (open: boolean, title: string, message: string) => void;
};

const useModalStore = create<State>((set) => ({
  open: false,
  title: "",
  message: "",
  setStateModalGlobal: (open, title, message) =>
    set({ open: open, title: title, message: message }),
}));

export default useModalStore;
