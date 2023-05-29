import React, { ReactElement } from "react";
import { HomeScreenStyled } from "./HomeScreen.styles";
import { BaseButton } from "../../components";

export const HomeScreenDesktop = (): ReactElement => {
  return (
    <HomeScreenStyled>
      <BaseButton> Click Homeview</BaseButton>
    </HomeScreenStyled>
  );
};
