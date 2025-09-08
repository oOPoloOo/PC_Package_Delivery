import React, { useContext, useState } from "react";
import styled from "styled-components";
import type { Package, PackageContextType, PackageStatus } from "../../../types";
import {
  Package as PackageIcon,
  Send,
  CheckCircle2,
  RotateCcw,
  XCircle,
} from "lucide-react";
import PackageContext from "../../../contexts/PackageContext";

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
  font-size: 18px;
  margin-bottom: 4px;
`;

const StyledTitleTop = styled(StyledTitle)`
  margin-top: 0;
`;

const StyledText = styled.p`
  color: #dcccfe;
  line-height: 1.4;
  margin-top: 2px;
`;

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  margin-top: 8px;
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`;

const DropdownButton = styled.button`
  background: #2c2f38;
  color: #dcccfe;
  border: none;
  border-radius: 6px;
  padding: 4px 8px;
  cursor: pointer;
`;

const DropdownList = styled.div`
  position: absolute;
  top: 36px;
  right: 0;
  background: #2c2f38;
  border-radius: 6px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  z-index: 100;
`;

const DropdownItem = styled.div`
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  &:hover {
    background: #3a3f4b;
  }
`;

const PackageCard = ({ data }: Props) => {
  
  const { changeStatus } = useContext(PackageContext) as PackageContextType;
  const [currentStatus, setCurrentStatus] = useState(data.currentStatus);
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const nextStatuses = allowedTransitions[currentStatus];

  const handleStatusChange = async (status: string) => {
    setCurrentStatus(status);
    setDropdownOpen(false);
    
    try {
      const result = await changeStatus(data.id, status as PackageStatus);

      if ("error" in result)
      {
        console.error("Failed to update status:", result.error);
        setCurrentStatus(data.currentStatus);
      } else {
        console.log("Status updated successfully");
      }
    } catch (err) {
      console.error("Unexpected error updating status", err);
      setCurrentStatus(data.currentStatus); 
    }  
  };

  // Format createdAt
  const createdAt = new Date(data.packageCreatedAt).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <StyledCard>
      {nextStatuses.length > 0 && (
        <DropdownContainer>
          <DropdownButton onClick={() => setDropdownOpen((prev) => !prev)}>
            Change Status
          </DropdownButton>
          {dropdownOpen && (
            <DropdownList>
              {nextStatuses.map((status) => (
                <DropdownItem key={status} onClick={() => handleStatusChange(status)}>
                  {statusIcons[status]}
                  <span>{status}</span>
                </DropdownItem>
              ))}
            </DropdownList>
          )}
        </DropdownContainer>
      )}

      <StyledTitleTop>From:</StyledTitleTop>
      <StyledText>{data.senderName}</StyledText>

      <StyledTitle>To:</StyledTitle>
      <StyledText>{data.recipientName}</StyledText>

      <StyledTitle>Tracking:</StyledTitle>
      <StyledText>{data.trackingNumber}</StyledText>

      <StyledTitle>Status:</StyledTitle>
      <StatusRow>
        {statusIcons[currentStatus]}
        <span style={{ color: statusColors[currentStatus]?.text || "#dcccfe" }}>
          {currentStatus}
        </span>
      </StatusRow>

      <StyledTitle>Created:</StyledTitle>
      <StyledText>{createdAt}</StyledText>
    </StyledCard>
  );
};

export default PackageCard;
