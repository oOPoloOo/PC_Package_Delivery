import React from "react";
import styled from "styled-components";
import type { StatusChange }from "../../../types";

type Props = {
  history: StatusChange[];
};

const CardContainer = styled.div`
  background: #1a252f;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  width: 350px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  color: #dcccfe;
  font-size: 20px;
  margin-bottom: 12px;
`;

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: 30px;
`;

const HistoryLine = styled.div<{ completedCount: number; total: number }>`
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(
    to bottom,
    #0284c7 ${(props) => (props.completedCount / props.total) * 100}%,
    #555 ${(props) => (props.completedCount / props.total) * 100}%
  );
`;

const Entry = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
`;

const StatusDot = styled.div<{ active?: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #555;
  background-color: ${(props) => (props.active ? "#0284c7" : "transparent")};
  position: absolute;
  left: -16px;
`;

const EntryContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatusText = styled.span<{ active?: boolean }>`
  color: ${(props) => (props.active ? "#0284c7" : "#dcccfe")};
  font-weight: 600;
  font-size: 16px;
`;

const DateText = styled.span`
  color: #dcccfe;
  font-size: 14px;
`;

const DetailsHistoryCard = ({ history }: Props) => {
  const completedCount = history.length;

  return (
    <CardContainer>
      <Title>History</Title>
      <HistoryContainer>
        <HistoryLine completedCount={completedCount} total={history.length} />
        {history.map((entry, index) => (
          <Entry key={index}>
            <StatusDot active />
            <EntryContent>
              <StatusText active>{entry.status}</StatusText>
              <DateText>{new Date(entry.changedAt).toLocaleString()}</DateText>
            </EntryContent>
          </Entry>
        ))}
      </HistoryContainer>
    </CardContainer>
  );
};

export default DetailsHistoryCard;
