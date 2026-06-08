/**
 * Focus-area "pills" shown on each provider's card — single source of truth so
 * the homepage spotlight and the /providers page stay in sync. Keyed by the
 * provider's route slug.
 */
export const providerFocus: Record<string, string[]> = {
  'dr-kamil-amer': [
    'Orthopedic Surgery',
    'Hand & Upper Extremity',
    'Sports Injuries',
    'Fracture Care',
    'Arthroscopic Surgery',
    'Joint Pain & Arthritis',
  ],
  'dr-kamal-amer': [
    'Gastroenterology',
    'Internal Medicine',
    'Digestive Health',
    'Obesity & Nutrition',
    'Preventive & Primary Care',
    'Weight Management',
  ],
  'muneer-obeidallah': [
    'Orthopedic Rehabilitation',
    'Post-Surgical Recovery',
    'Sports Injury Rehabilitation',
    'Balance & Fall Prevention',
    'Chronic Pain Management',
    'Strength & Mobility Training',
    'Functional Movement Restoration',
    'Personalized Exercise Programs',
  ],
}
