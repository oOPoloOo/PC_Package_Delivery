import React, { useContext, useState } from "react";
import styled from "styled-components";
import type { Package, PackageContextType, PackageStatus } from "../../../types";
import {
  Package as PackageIcon,
  Send,
  CheckCircle2,
  RotateCcw,
  XCircle,
  Menu,
} from "lucide-react";
import PackageContext from "../../../contexts/PackageContext";
import { useNavigate } from "react-router";

type Props = {
  data: Package;
};

const statusColors: Record<string, { text: string }> = {
  Created: { text: "#0284c7" },
  Sent: { text: "#4338ca" },
  Accepted: { text: "#15803d" },
  Returned: { text: "#ea580c" },
  Canceled: { text: "#b91c1c" },
};

const statusIcons: Record<string, React.ReactElement> = {
  Created: <PackageIcon />,
  Sent: <Send />,
  Accepted: <CheckCircle2 />,
  Returned: <RotateCcw />,
  Canceled: <XCircle />,
};

const allowedTransitions: Record<string, string[]> = {
  Created: ["Sent", "Canceled"],
  Sent: ["Accepted", "Returned", "Canceled"],
  Returned: ["Sent", "Canceled"],
  Accepted: [],
  Canceled: [],
};

const StyledCard = styled.div`
  position: relative;
  background: #1a252f;
  padding: 15px;
  margin-top: 20px;
  border-radius: 8px;
  width: 350px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
`;

const StyledTitle = styled.h3`
  color: #dcccfe;
  font-size: 20px;
  margin: 10px 0 2px 0;  
`;

const StyledTitleTop = styled(StyledTitle)`
  margin-top: 0;
`;

const StyledText = styled.p`
  color: #dcccfe;
  font-size: 18px;
  line-height: 1.5;
  margin: 2px 0 8px 0;  
`;

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 17px;
  margin: 2px 0 8px 0;  
`;

const IconColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: absolute;  
  bottom: 18px;
  right: 22px;
`;

const IconButton = styled.div`
  position: relative;
  cursor: pointer;
  color: #dcccfe;
  padding: 4px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px; 

  &:hover {
    background: #3a3f4b;
  }

  &:hover span {
    visibility: visible;
    opacity: 1;
  }

  svg {
    width: 2em;
    height: 2em;
  }
`;

const Tooltip = styled.span`
  visibility: hidden;
  opacity: 0;
  width: max-content;
  background-color: #2c2f38;
  color: #dcccfe;
  text-align: center;
  border-radius: 4px;
  padding: 4px 8px;
  position: absolute;
  right: 110%; 
  top: 50%;
  transform: translateY(-50%);
  transition: opacity 0.2s;
  white-space: nowrap;
  font-size: 12px;
  z-index: 10;
`;

const TruncatedTextWrapper = styled.div`
  position: relative;
  display: inline-block;
  max-width: 100%;
`;

const TruncatedText = styled.p`
  color: #dcccfe;
  font-size: 18px;
  line-height: 1.5;
  margin: 2px 0 8px 0;  
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: default;
`;

const TextTooltip = styled.span`
  visibility: hidden;
  opacity: 0;
  background-color: #2c2f38;
  color: #dcccfe;
  text-align: center;
  border-radius: 6px;
  padding: 6px 10px;   
  position: absolute;
  top: 125%; 
  left: 50%;
  transform: translateX(-50%);
  transition: opacity 0.2s;
  white-space: nowrap;
  font-size: 16px;    
  z-index: 10;

  ${TruncatedTextWrapper}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

const PackageCard = ({ data }: Props) => {
  const { changeStatus } = useContext(PackageContext) as PackageContextType;
  const [currentStatus, setCurrentStatus] = useState(data.currentStatus);
  const nextStatuses = allowedTransitions[currentStatus];
  const navigate = useNavigate();

  const handleStatusChange = async (status: string) => {
    setCurrentStatus(status as PackageStatus);

    try {
      const result = await changeStatus(data.id, status as PackageStatus);

      if ("error" in result) {
        console.error("Failed to update status:", result.error);
        setCurrentStatus(data.currentStatus as PackageStatus);
      } else {
        console.log("Status updated successfully");
      }
    } catch (err) {
      console.error("Unexpected error updating status", err);
      setCurrentStatus(data.currentStatus);
    }
  };

  const createdAt = new Date(data.packageCreatedAt).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <StyledCard>

      <StyledTitleTop>From:</StyledTitleTop>
      <TruncatedTextWrapper>
      <TruncatedText>{data.senderName}</TruncatedText>
      <TextTooltip>{data.senderName}</TextTooltip>
      </TruncatedTextWrapper>
      
      <StyledTitle>To:</StyledTitle>
      <TruncatedTextWrapper>
        <TruncatedText>{data.recipientName}</TruncatedText>
        <TextTooltip>{data.recipientName}</TextTooltip>
      </TruncatedTextWrapper>

      <StyledTitle>Tracking ID:</StyledTitle>
      <StyledText>{data.trackingNumber}</StyledText>

      <StyledTitle>Package Status:</StyledTitle>
      <StatusRow>
        {statusIcons[currentStatus]}
        <span style={{ 
          color: statusColors[currentStatus]?.text || "#dcccfe", 
          fontSize: "18px"   
        }}>
          {currentStatus}
        </span>
      </StatusRow>

      <StyledTitle>Created:</StyledTitle>
      <StyledText>{createdAt}</StyledText>

      <IconColumn>
        <IconButton onClick={() => navigate(`details/${data.id}`)}>      
          <Menu />
        <Tooltip>To Package Details</Tooltip>
      </IconButton>
      
      {nextStatuses.map((status) => (
        <IconButton key={status} onClick={() => handleStatusChange(status)}>
          {statusIcons[status]}
          <Tooltip>{`Change to ${status}`}</Tooltip>
        </IconButton>
      ))}        
      </IconColumn>      
    </StyledCard>
  );
};

export default PackageCard;
