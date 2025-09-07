import styled from "styled-components";
import type { Package } from "../../../types";

type Props = {
  data: Package
}

const StyledCard = styled.div`
  position: relative; 
  background: #1a252f;
  padding: 15px;
  margin-top: 20px;
  border-radius: 8px;
  width: 350px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);  
`;

const StyledText = styled.p`
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  margin-top: 10px;
  color: #dcccfe;
  line-height: 1.4;
`;

const StyledTitle = styled.h3`
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  color: #dcccfe;
  font-size: 18px;
  margin-bottom: 8px;
`;

const PackageCard = ({ data }: Props) => {

  return (
    <StyledCard>     
    <StyledTitle>{data.senderName}</StyledTitle>
    <StyledText>{data.recipientName}</StyledText>
    <StyledTitle>{data.trackingNumber}</StyledTitle>
    <StyledText>{data.currentStatus}</StyledText>
    <StyledTitle>{data.packageCreatedAt}</StyledTitle>
    </StyledCard>
  );
};

export default PackageCard;