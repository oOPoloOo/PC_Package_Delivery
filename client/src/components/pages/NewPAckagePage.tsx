// import { useContext, useState } from 'react';
// import { Formik, Form, Field } from 'formik';
// import styled from 'styled-components';
// import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
// import { useNavigate } from 'react-router';
// import PackageContext from '../../contexts/PackageContext';
// import { toast } from 'react-toastify';

// // Styled Components (tavo kodas)
// const PageWrapper = styled.div`
//   background: linear-gradient(180deg, #0f2027, #203a43, #2c5364);
//   min-height: 100vh;
//   display: flex;
//   justify-content: center;
// `;

// const Container = styled.div`
//   background: linear-gradient(180deg, #0f2027, #203a43, #2c5364);
//   border-radius: 24px;
//   padding: 40px 24px;
//   max-width: 2000px;
//   margin: 80px 0;
//   text-align: center;
//   color: white;
//   box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
// `;

// const StyledMainIconWrapper = styled.div`
//   border: 2px solid rgba(255, 255, 255, 0.2);
//   border-radius: 20px;
//   width: 700px;
//   height: 90px;
//   margin: 0 auto 20px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: rgba(255, 255, 255, 0.05);
// `;

// const StyledMainIcon = styled(SportsEsportsRoundedIcon)`
//   font-size: 150px;
//   color: white;
// `;

// const Title = styled.h2`
//   font-size: 24px;
//   font-weight: bold;
// `;

// const Label = styled.label`
//   font-size: 12px;
//   font-weight: bold;
//   display: block;
//   margin-bottom: 4px;
// `;

// const StyledField = styled(Field)`
//   width: 100%;
//   padding: 6px;
//   font-size: 12px;
//   border: 1px solid #a6a6a6;
//   border-radius: 3px;
//   margin-bottom: 4px;
// `;

// const ErrorText = styled.div`
//   font-size: 12px;
//   color: red;
//   margin-bottom: 8px;
// `;

// const SubmitButton = styled.button`
//   background: transparent;
//   border: 2px solid rgba(255, 255, 255, 0.2);
//   color: white;
//   padding: 14px 20px;
//   width: 100%;
//   font-size: 16px;
//   border-radius: 9999px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 12px;
//   transition: background 0.2s;

//   &:hover {
//     background: rgba(255, 255, 255, 0.05);
//   }
// `;

// const NewPackagePage = () => {
//   const { addPackage } = useContext(PackageContext);
//   const navigate = useNavigate();
//   const [message, setMessage] = useState('');

//   const initialValues = {
//     SenderName: '',
//     SenderAddress: '',
//     SenderPhone: '',
//     RecipientName: '',
//     RecipientAddress: '',
//     RecipientPhone: '',
//   };

//   // Minimal validation
//   const validate = (values: typeof initialValues) => {
//     const errors: Partial<typeof initialValues> = {};
//     const phoneRegex = /^[0-9]{6,15}$/;

//     if (!values.SenderName) errors.SenderName = 'Required';
//     if (!values.SenderAddress) errors.SenderAddress;
//     if (!values.RecipientName) errors.RecipientName = 'Required';
//     if (!values.RecipientAddress) errors.RecipientAddress;

//     if (!values.SenderPhone) errors.SenderPhone = 'Required';
//     else if (!phoneRegex.test(values.SenderPhone)) errors.SenderPhone = 'Invalid phone number';

//     if (!values.RecipientPhone) errors.RecipientPhone = 'Required';
//     else if (!phoneRegex.test(values.RecipientPhone)) errors.RecipientPhone = 'Invalid phone number';

//     return errors;
//   };

//   const handleSubmit = async (values: typeof initialValues) => {
//     const result = await addPackage(values);
//     if ('error' in result) {
//       toast.error(result.error);
//       setMessage(result.error);
//     } else {
//       toast.success('Package added successfully.', {
//         autoClose: 1700,
//         onClose: () => navigate('/', { replace: true }),
//       });
//       setMessage('Package added successfully');
//     }
//   };

//   return (
//     <PageWrapper>
//       <Container>
//         <StyledMainIconWrapper>
//           <Title>Create New Package</Title>
//         </StyledMainIconWrapper>

//         <Formik
//           initialValues={initialValues}
//           validate={validate}
//           onSubmit={handleSubmit}
//         >
//           {({ isSubmitting, errors, touched }) => (
//             <Form>
//               <div>
//                 <Label htmlFor="SenderName">Sender Name</Label>
//                 <StyledField type="text" name="SenderName" />
//                 {errors.SenderName && touched.SenderName && <ErrorText>{errors.SenderName}</ErrorText>}
//               </div>

//               <div>
//                 <Label htmlFor="SenderAddress">Sender Address</Label>
//                 <StyledField as="textarea" name="SenderAddress" />
//                 {errors.SenderAddress && touched.SenderAddress && <ErrorText>{errors.SenderAddress}</ErrorText>}
//               </div>

//               <div>
//                 <Label htmlFor="SenderPhone">Sender Phone</Label>
//                 <StyledField type="tel" name="SenderPhone" />
//                 {errors.SenderPhone && touched.SenderPhone && <ErrorText>{errors.SenderPhone}</ErrorText>}
//               </div>

//               <div>
//                 <Label htmlFor="RecipientName">Recipient Name</Label>
//                 <StyledField type="text" name="RecipientName" />
//                 {errors.RecipientName && touched.RecipientName && <ErrorText>{errors.RecipientName}</ErrorText>}
//               </div>

//               <div>
//                 <Label htmlFor="RecipientAddress">Recipient Address</Label>
//                 <StyledField as="textarea" name="RecipientAddress" />
//                 {errors.RecipientAddress && touched.RecipientAddress && <ErrorText>{errors.RecipientAddress}</ErrorText>}
//               </div>

//               <div>
//                 <Label htmlFor="RecipientPhone">Recipient Phone</Label>
//                 <StyledField type="tel" name="RecipientPhone" />
//                 {errors.RecipientPhone && touched.RecipientPhone && <ErrorText>{errors.RecipientPhone}</ErrorText>}
//               </div>

//               <SubmitButton type="submit" disabled={isSubmitting}>
//                 Save Package
//               </SubmitButton>

//               {message && <p style={{ marginTop: '12px' }}>{message}</p>}
//             </Form>
//           )}
//         </Formik>
//       </Container>
//     </PageWrapper>
//   );
// };

// export default NewPackagePage;

import { useContext, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import { useNavigate } from 'react-router';
import PackageContext from '../../contexts/PackageContext';
import { toast } from 'react-toastify';
import type { PackageContextType } from '../../types';

// Styled Components
const PageWrapper = styled.div`
  background: linear-gradient(180deg, #0f2027, #203a43, #2c5364);
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  background: linear-gradient(180deg, #0f2027, #203a43, #2c5364);
  border-radius: 24px;
  padding: 40px 24px;
  max-width: 2000px;
  margin: 80px 0;
  text-align: center;
  color: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
`;

const StyledMainIconWrapper = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  width: 700px;
  height: 90px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
`;

const StyledMainIcon = styled(SportsEsportsRoundedIcon)`
  font-size: 150px;
  color: white;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: bold;
  display: block;
  margin-bottom: 4px;
`;

const StyledField = styled(Field)`
  width: 100%;
  padding: 6px;
  font-size: 12px;
  border: 1px solid #a6a6a6;
  border-radius: 3px;
  margin-bottom: 4px;
`;

const ErrorText = styled.div`
  font-size: 12px;
  color: red;
  margin-bottom: 8px;
`;

const SubmitButton = styled.button`
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 14px 20px;
  width: 100%;
  font-size: 16px;
  border-radius: 9999px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const NewPackagePage = () => {
const { addPackage } = useContext(PackageContext) as PackageContextType;
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const initialValues = {
    SenderName: '',
    SenderAddress: '',
    SenderPhone: '',
    RecipientName: '',
    RecipientAddress: '',
    RecipientPhone: '',
  };

  // Minimal validation
  const validate = (values: typeof initialValues) => {
    const errors: Partial<typeof initialValues> = {};
    const phoneRegex = /^[0-9]{6,15}$/;

    if (!values.SenderName) errors.SenderName = 'Required';
    if (!values.RecipientName) errors.RecipientName = 'Required';

    if (!values.SenderPhone) errors.SenderPhone = 'Required';
    else if (!phoneRegex.test(values.SenderPhone)) errors.SenderPhone = 'Invalid phone number';

    if (!values.RecipientPhone) errors.RecipientPhone = 'Required';
    else if (!phoneRegex.test(values.RecipientPhone)) errors.RecipientPhone = 'Invalid phone number';

    return errors;
  };

  const handleSubmit = async (values: typeof initialValues) => {
    console.log("Ateina išsiuntimas");
    const result = await addPackage(values);
    if ('error' in result) {
      toast.error(result.error);
      setMessage(result.error);
    } else {
      toast.success('Package added successfully.', {
        autoClose: 1700,
        onClose: () => navigate('/', { replace: true }),
      });
      setMessage('Package added successfully');
    }
  };



  return (
    <PageWrapper>
      <Container>
        <StyledMainIconWrapper>
          <StyledMainIcon />
        </StyledMainIconWrapper>
        <Title>Create New Package</Title>

        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div>
                <Label htmlFor="SenderName">Sender Name</Label>
                <StyledField type="text" name="SenderName" />
                {errors.SenderName && touched.SenderName && <ErrorText>{errors.SenderName}</ErrorText>}
              </div>

              <div>
                <Label htmlFor="SenderAddress">Sender Address</Label>
                <StyledField as="textarea" name="SenderAddress" />
              </div>

              <div>
                <Label htmlFor="SenderPhone">Sender Phone</Label>
                <StyledField type="tel" name="SenderPhone" />
                {errors.SenderPhone && touched.SenderPhone && <ErrorText>{errors.SenderPhone}</ErrorText>}
              </div>

              <div>
                <Label htmlFor="RecipientName">Recipient Name</Label>
                <StyledField type="text" name="RecipientName" />
                {errors.RecipientName && touched.RecipientName && <ErrorText>{errors.RecipientName}</ErrorText>}
              </div>

              <div>
                <Label htmlFor="RecipientAddress">Recipient Address</Label>
                <StyledField as="textarea" name="RecipientAddress" />
              </div>

              <div>
                <Label htmlFor="RecipientPhone">Recipient Phone</Label>
                <StyledField type="tel" name="RecipientPhone" />
                {errors.RecipientPhone && touched.RecipientPhone && <ErrorText>{errors.RecipientPhone}</ErrorText>}
              </div>

              <SubmitButton type="submit" disabled={isSubmitting}>
                Save Package
              </SubmitButton>

              {message && <p style={{ marginTop: '12px' }}>{message}</p>}
            </Form>
          )}
        </Formik>
      </Container>
    </PageWrapper>
  );
};

export default NewPackagePage;
