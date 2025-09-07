
import styled from "styled-components";

const StyledAddPackageButton = styled.button`
  display: flex;
  justify-content: flex-start; 
  align-items: center;

  width: 100%; 
  padding-left: 24px; 
  padding-right: 24px;
  height: 40px;

  font-size: 14px;
  font-weight: 500;

  background-color: #d8c9ff;
  color: #4b0082;

  border: none;
  border-radius: 9999px;
  cursor: pointer;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  transition: background-color 0.2s, transform 0.1s;

  &:hover {
    background-color: #cbb7f9;
  }

  &:active {
    transform: scale(0.98);
  }
`;

type Props = {
  label?: string;
  onClick?: () => void;
};

const AddPackageButton: React.FC<Props> = ({ label = "Add", onClick }) => {
  return <StyledAddPackageButton onClick={onClick}>{label}</StyledAddPackageButton>;
};

export default AddPackageButton;