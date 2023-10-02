import ButtonPrimary from "../components/buttons/ButtonPrimary";

export default {
  component: ButtonPrimary,
};

export const Default = {
  args: {
    children: "click me",
  },
};

export const SmallButton = {
  args: {
    children: "click me",
    small: true,
  },
};

export const FullWidthButton = {
  args: {
    children: "click me",
    fullwidth: true,
  },
};

export const SmallFullwidthButton = {
  args: {
    children: "click me",
    fullwidth: true,
    small: true,
  },
};
