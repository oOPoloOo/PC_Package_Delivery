import React from "react";
import styled from "styled-components";
import { type PersonInfo } from "../../../types";

type Props = {
  sender: PersonInfo;
  recipient: PersonInfo;
};

const StyledCard = styled.div`
  background: #1a252f;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  width: 350px;
`;

const StyledTitle = styled.h3`
  color: #dcccfe;
  font-size: 20px;
  margin: 10px 0 8px 0;
`;

const Section = styled.div`
  margin-bottom: 12px;
`;

const SectionTitle = styled.h4`
  color: #dcccfe;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const StyledText = styled.p`
  color: #dcccfe;
  font-size: 16px;
  margin: 2px 0;
`;

const DetailsPersonInfoCard = ({ sender, recipient }: Props) => {
  return (
    <StyledCard>
      <StyledTitle>History</StyledTitle>

      <Section>
        <SectionTitle>Sender</SectionTitle>
        <StyledText>{sender.name}</StyledText>
        <StyledText>{sender.address}</StyledText>
        <StyledText>{sender.phone}</StyledText>
      </Section>

      <Section>
        <SectionTitle>Recipient</SectionTitle>
        <StyledText>{recipient.name}</StyledText>
        <StyledText>{recipient.address}</StyledText>
        <StyledText>{recipient.phone}</StyledText>
      </Section>
    </StyledCard>
  );
};

export default DetailsPersonInfoCard;
