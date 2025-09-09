import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import PackageContext from "../../contexts/PackageContext";
import type { PackageContextType, Package } from "../../types";
import DetailsInfoCard from "../UI/molecules/DetailsInfoCard";
import DetailsPersonInfoCard from "../UI/molecules/DetailsPersonInfoCard";
import DetailsHistoryCard from "../UI/molecules/DetailsHistoryCard";

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  flex-wrap: wrap;

  justify-content: center;    
  align-items: flex-start;

  min-height: 65vh;
  align-items: center; 
`;

const PackageDetailsPage = () => {
  const { id } = useParams();
  const {fetchPackageById } = useContext(PackageContext) as PackageContextType;

  // Local state used to save 
  // the package details object then it returns
  const [pkg, setPkg] = useState<Package | null>(null);
  
  useEffect(() => 
  {
    if (id) {
      fetchPackageById(id).then(setPkg);
    }
  }, [id, fetchPackageById]);
  
  if (!pkg) return <p>Loading full package...</p>;

  return (
    <PageContainer>
      <DetailsInfoCard
      data={pkg}
      />
      {pkg.sender && pkg.recipient && (
        <DetailsPersonInfoCard
          sender={pkg.sender}
          recipient={pkg.recipient}
        />
      )}
      {pkg.history && pkg.history.length > 0 && (
        <DetailsHistoryCard history={pkg.history} />
      )}
    </PageContainer>
  );
};

export default PackageDetailsPage;
