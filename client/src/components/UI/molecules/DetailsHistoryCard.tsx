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
  height: 400px; 
  display: flex;
  flex-direction: column;
  justify-content: center; 
`;

const Title = styled.h3`
  color: #dcccfe;
  font-size: 20px;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: 50px; 
  flex: 1;
  overflow-y: auto;
`;
const Line = styled.div`
  position: absolute;
  left: 26px;  
  top: 0;
  bottom: 0;
  width: 2px;
  background: #0284c7;  
`;

const Entry = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
`;

const StatusDot = styled.div<{ active?: boolean }>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid #0284c7;
  background-color: ${(props) => (props.active ? "#0284c7" : "#1a252f")};
  position: absolute;
  left: -30px; 
  top: 4px;  
`;

const EntryContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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

  return (
    <CardContainer>
      <Title>Status Change History</Title>
      <HistoryContainer>
        <Line />
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
