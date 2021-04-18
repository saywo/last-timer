import React, { VFC } from "react";
import styled from "styled-components";

const Footer: VFC = () => {
  return (
    <SFooter>
      <SFooterInner>
        <SFooterCopy>
          <small>&copy; 2021 Tatsuki Suehiro</small>
        </SFooterCopy>
      </SFooterInner>
    </SFooter>
  );
};

const SFooter = styled.footer`
  background-color: #333;
  padding: 20px 0;
`;

const SFooterInner = styled.div`
  max-width: 1200px;
  padding: 0 40px;
  margin: 0 auto;
`;

const SFooterCopy = styled.p`
  color: #fff;
  text-align: center;
`;

export default Footer;
