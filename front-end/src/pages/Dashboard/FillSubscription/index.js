import InstituteForm from '../../../components/PersonalInformationForm/InstituteForm';
import AddressForm from '../../../components/PersonalInformationForm/AddressForm';
import CategoryForm from '../../../components/PersonalInformationForm/CategoryForm';

export default function FillSubscription() {
  return (
    <>
      <InstituteForm />
      <AddressForm />
      <CategoryForm/>
    </>
  );
}
