import React, { VFC, memo } from "react";
import styled from "styled-components";
import { colors } from "../../../styles/const/colors";

const Footer: VFC = memo(() => {
  return (
    <SFooter>
      <SFooterInner>
        <SFooterCopy>
          <small>&copy; 2021 Tatsuki Suehiro</small>
        </SFooterCopy>
      </SFooterInner>
    </SFooter>
  );
});

const SFooter = styled.footer`
  background-color: ${colors.black01};
  padding: 20px 0;
`;

const SFooterInner = styled.div`
  max-width: 1200px;
  padding: 0 40px;
  margin: 0 auto;
`;

const SFooterCopy = styled.p`
  color: ${colors.white01};
  text-align: center;
`;

export default Footer;
