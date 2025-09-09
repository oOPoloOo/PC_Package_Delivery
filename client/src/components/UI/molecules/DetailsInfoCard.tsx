import React from "react";
import styled from "styled-components";

type Props = {
  currentStatus: string;
  trackingNumber: string;
  packageCreatedAt: string;
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
  margin: 10px 0 2px 0;
`;

const StyledText = styled.p`
  color: #dcccfe;
  font-size: 18px;
  line-height: 1.5;
  margin: 2px 0 8px 0;
`;

const DetailsInfoCard = ({ currentStatus, trackingNumber, packageCreatedAt }: Props) => {
  const createdAt = new Date(packageCreatedAt).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <StyledCard>
      <StyledTitle>Package Info</StyledTitle>
      <StyledText>
        <strong>Tracking Number:</strong> {trackingNumber}
      </StyledText>
      <StyledText>
        <strong>Status:</strong> {currentStatus}
      </StyledText>
      <StyledText>
        <strong>Created At:</strong> {createdAt}
      </StyledText>
    </StyledCard>
  );
};

export default DetailsInfoCard;
