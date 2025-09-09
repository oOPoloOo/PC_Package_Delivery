import React, { useContext, useState } from "react";
import styled from "styled-components";
import type { Package, PackageContextType, PackageStatus } from "../../../types";
import PackageContext from "../../../contexts/PackageContext";
import { PackageIcon, Send, CheckCircle2, RotateCcw, XCircle } from "lucide-react";

type Props = {
  data: Package;
};

const StyledCard = styled.div`
  background: #1a252f;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  width: 350px;
  height: 400px; 
`;

const StyledTitle = styled.h3`
  color: #dcccfe;
  font-size: 20px;
  margin: 10px 0 30px 0;
`;

const StyledText = styled.p`
  color: #dcccfe;
  font-size: 18px;
  line-height: 1.5;
  margin: 2px 0 8px 0;
`;

const allowedTransitions: Record<string, string[]> = {
  Created: ["Sent", "Canceled"],
  Sent: ["Accepted", "Returned", "Canceled"],
  Returned: ["Sent", "Canceled"],
  Accepted: [],
  Canceled: [],
};

const statusIcons: Record<string, React.ReactElement> = {
  Created: <PackageIcon />,
  Sent: <Send />,
  Accepted: <CheckCircle2 />,
  Returned: <RotateCcw />,
  Canceled: <XCircle />,
};

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
`;

const StatusButton = styled.button<{ color: string }>`
  background: #2c2f38;
  border: none;
  color: ${(props) => props.color};
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;

  &:hover {
    background: #3a3f4b;
  }

  svg {
    width: 1.2em;
    height: 1.2em;
  }
`;

const statusColors: Record<string, { text: string }> = {
  Created: { text: "#0284c7" },
  Sent: { text: "#4338ca" },
  Accepted: { text: "#15803d" },
  Returned: { text: "#ea580c" },
  Canceled: { text: "#b91c1c" },
};

const DetailsInfoCard = ({data}: Props) => {

  const { changeStatus } = useContext(PackageContext) as PackageContextType;
  const [currentStatus, setCurrentStatus] = useState(data.currentStatus);
  const nextStatuses = allowedTransitions[currentStatus];

  const handleStatusChange = async (status: string) => 
  {
  
    const confirmed = window.confirm(`Are you sure you want to change status to "${status}"?`);
    if (!confirmed) return;
    
    setCurrentStatus(status as PackageStatus);

    try 
    {
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
      <StyledTitle>Package Info</StyledTitle>
      <StyledText>
        <strong>Tracking Number:</strong> {data.trackingNumber}
      </StyledText>
      <StyledText>
        <strong>Status:</strong> {data.currentStatus}
      </StyledText>
      <StyledText>
        <strong>Created At:</strong> {createdAt}
      </StyledText>     

      {nextStatuses.length > 0 && (
        <>
          <StyledTitle style={{ marginTop: "20px", fontSize: "18px" }}>
            Change Package Status
          </StyledTitle>
          <ButtonRow>
            {nextStatuses.map((status) => (
              <StatusButton
                key={status}
                color={statusColors[status]?.text || "#dcccfe"}
                onClick={() => handleStatusChange(status)}
              >
                {statusIcons[status]}
                {status}
              </StatusButton>
            ))}
          </ButtonRow>
        </>
      )}

    </StyledCard>
  );
};

export default DetailsInfoCard;


