import * as React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { COLORS } from '../../styles';
import { AppContext } from '../../components/Layout';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { FormWrapper } from '../../components/Form';
import Label from '../../components/Label';
import SectionLabel from '../../components/SectionLabel';
import { IProposal } from '../../interfaces';
import CenteredTitle from '../../components/CenteredTitle';
import FieldText, { ErrorMessage } from '../../components/FieldText';
import FieldTextarea from '../../components/FieldTextarea';
import Checkbox from '../../components/Checkbox';
// import { EthereumContext } from '../../components/EthereumProvider';

const Separator = styled.div`
  border: 1px solid ${COLORS.grey5};
`;

const FormSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email')
    .required('Required'),
  title: yup
    .string()
    .max(80, 'Too Long!')
    .required('Required'),
  description: yup
    .string()
    .max(5000, 'Too Long!')
    .required('Required'),
  recommendation: yup.string().required('Required'),
});

interface Context {
  proposals: IProposal[];
}

const CreateSlate: React.FunctionComponent = () => {
  const { proposals }: Context = React.useContext(AppContext);
  // const { account, ethProvider, contracts }: any = React.useContext(EthereumContext);
  // console.log('proposals:', proposals);
  // console.log('account, ethProvider:', account, ethProvider);
  // console.log('contracts:', contracts);

  // async function handleSubmit(formValues: any) {
  //   console.log('create-slate-form-values:', formValues);

  //   // try {
  //   //   // const response = await postProposal(formValues);
  //   //   if (response.status === 200) {
  //   //     // setOpenModal(true);
  //   //     // await onGetAllProposals();
  //   //     // TODO: redirect: /proposals
  //   //     // or: move this logic to proposals/index and remove from componentDidMount in Layout
  //   //   }
  //   // } catch (error) {
  //   //   onNotify(error.message, 'error');
  //   // }
  // }
  return (
    <div>
      <CenteredTitle title="Create a Grant Slate" />
      <FormWrapper>
        <Formik
          initialValues={{
            email: '',
            title: '',
            description: '',
            recommendation: '',
            proposals: {},
          }}
          validationSchema={FormSchema}
          onSubmit={async (values: any, { setSubmitting, setFieldError }) => {
            const proposalIDs = Object.keys(values.proposals).filter(
              p => values.proposals[p] === true
            );
            if (proposalIDs.length === 0) {
              setFieldError('proposals', 'need at least 1 proposal.');
            } else {
              values.proposals = proposals.filter(p => proposalIDs.includes(p.id.toString()));
              // await handleSubmit(values);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, setFieldValue, values }): any => (
            <Form>
              {console.log('props.values:', values)}
              <div className="pa4">
                <SectionLabel>{'ABOUT'}</SectionLabel>

                <FieldText required label={'Email'} name="email" placeholder="Enter your email" />
                <FieldText required label={'Title'} name="title" placeholder="Enter title" />

                <FieldText
                  required
                  label={'First Name'}
                  name="firstName"
                  placeholder="Enter your first name"
                />
                <FieldText label={'Last Name'} name="lastName" placeholder="Enter your last name" />
                <FieldText
                  label={'Organization Name'}
                  name="organization"
                  placeholder="Enter your organization's name"
                />

                <FieldTextarea
                  required
                  label={'Description'}
                  name="description"
                  placeholder="Enter a description for your slate"
                />
              </div>
              <Separator />
              <div className="pa4">
                <SectionLabel>{'RECOMMENDATION'}</SectionLabel>
                <Label htmlFor="recommendation" required>
                  {'What type of recommendation would you like to make?'}
                </Label>
                <ErrorMessage name="recommendation" component="span" />
                <div>
                  <Checkbox name="recommendation" value="grant" label="Recommend grant proposals" />
                  <Checkbox name="recommendation" value="noAction" label="Recommend no action" />
                </div>
                <div>
                  {
                    'By recommending no action you are opposing any current or future slates for this batch.'
                  }
                </div>
              </div>
              <Separator />
              <div className="pa4">
                <SectionLabel>{'GRANTS'}</SectionLabel>
                <div className="mv3 f7 black-50">
                  {'Select the grants that you would like to add to your slate'}
                </div>
                <div className="flex flex-wrap">
                  {proposals &&
                    proposals.map((proposal: any) => (
                      <Card
                        key={proposal.id}
                        category={proposal.category + ' PROPOSAL'}
                        title={proposal.title}
                        subtitle={proposal.tokensRequested}
                        description={proposal.summary}
                        onClick={() => {
                          if (values.proposals.hasOwnProperty(proposal.id)) {
                            setFieldValue(
                              `proposals.${proposal.id}`,
                              !values.proposals[proposal.id]
                            );
                          } else {
                            setFieldValue(`proposals.${proposal.id}`, true);
                          }
                        }}
                        proposals={values.proposals}
                        id={proposal.id}
                      />
                    ))}
                </div>
              </div>
              <Separator />
              <div className="flex pa4 justify-end">
                <Button large>{'Back'}</Button>
                <Button type="submit" large primary disabled={isSubmitting}>
                  {'Create Slate'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </FormWrapper>
    </div>
  );
};

export default CreateSlate;
