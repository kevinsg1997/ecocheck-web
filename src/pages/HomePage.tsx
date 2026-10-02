import { CategoriesSection } from '../components/home/CategoriesSection'
import { FinalCta } from '../components/home/FinalCta'
import { Hero } from '../components/home/Hero'
import { HowItWorks } from '../components/home/HowItWorks'
import { OdsSection } from '../components/home/OdsSection'
import { PrivacySection } from '../components/home/PrivacySection'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function HomePage() {
  useDocumentTitle()

  return (
    <>
      <Hero />
      <HowItWorks />
      <CategoriesSection />
      <OdsSection />
      <PrivacySection />
      <FinalCta />
    </>
  )
}
