import { useTranslation } from 'react-i18next';

import '@/lib/i18n/config';
import { PrimaryButton, SecondaryButton } from '@/components/common';
export default function Home() {
  const { t, i18n } = useTranslation();
  const title = t('hello');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      {title}
      <PrimaryButton onClick={() => changeLanguage('en')}>EN</PrimaryButton>
      <SecondaryButton onClick={() => changeLanguage('vi')}>VN</SecondaryButton>
    </div>
  );
}
