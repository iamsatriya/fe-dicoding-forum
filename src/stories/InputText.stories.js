import InputText from "../components/inputs/InputText";

export default {
  component: InputText,
};

const args = {
  title: "title",
  register: () => {},
  name: "name",
  isRequired: true,
};

export const Default = {
  args: {
    ...args,
  },
};

export const WithError = {
  args: {
    ...args,
    error: "invalid value",
  },
};
