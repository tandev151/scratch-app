import { useTranslation } from 'react-i18next';

import '@/lib/i18n/config';
import { PrimaryButton, SecondaryButton } from '@/components/common';
export default function HomePage() {
  const { t, i18n } = useTranslation();
  const title = t('hello');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const changeTheme = (theme: string) => {
    const body = document.body;
    if (theme === 'dark') {
      body.classList.add('dark');
    } else {
      body.classList.toggle('dark');
    }
  };

  return (
    <div className="bg-primary text-text-primary">
      Hello
      {title}
      <PrimaryButton onClick={() => changeLanguage('en')}>EN</PrimaryButton>
      <SecondaryButton onClick={() => changeLanguage('vi')}>VN</SecondaryButton>
      <PrimaryButton onClick={() => changeTheme('light')}>Light</PrimaryButton>
      <SecondaryButton onClick={() => changeTheme('dark')}>Dark</SecondaryButton>
    </div>
  );
}
