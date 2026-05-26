export type ServiceIconKey =
  | 'orthopedic'
  | 'internal-medicine'
  | 'physical-therapy'
  | 'peptide-wellness'
  | 'acupuncture'
  | 'iv-infusion'
  | 'in-house-lab'

export type ServicePage = {
  slug: string
  title: string
  iconKey: ServiceIconKey
  metaDescription: string
  cardDescription: string
  summary: string
  intro: string
  conditions: string[]
  approach: string[]
  specialistName?: string
  specialistBio?: string
  keywords: string[]
}

export const servicePages: ServicePage[] = [
  {
    slug: 'orthopedic-services',
    title: 'Orthopedic Services',
    iconKey: 'orthopedic',
    metaDescription:
      'Comprehensive orthopedic care at Elevate Wellness & Health — bones, joints, spine, hands, fractures, and sports-related injuries, led by Dr. Kamil M. Amer.',
    cardDescription:
      'Advanced care for bones, joints, spine, hands, fractures, and sports-related injuries — led by an experienced orthopedic surgeon.',
    summary:
      'Advanced care for bones, joints, spine, hands, fractures, and sports-related injuries — led by an experienced orthopedic surgeon.',
    intro:
      'At Elevate Wellness & Health, our orthopedic services focus on diagnosing and treating conditions affecting the bones, joints, spine, hands, and muscles. Whether you are dealing with joint pain, a major fracture, sports injury, hand condition, spine concern, or need surgical evaluation, our team provides careful assessment and personalized treatment options to help restore movement, strength, and quality of life.',
    conditions: [
      'Joint pain and arthritis',
      'Hip, knee, shoulder, and other joint problems',
      'Major fractures and injury-related bone conditions',
      'Hand and wrist conditions',
      'Spine and back-related concerns',
      'Sports injuries',
      'Tendon, ligament, and muscle injuries',
      'Post-traumatic orthopedic problems',
      'Surgical and non-surgical orthopedic evaluations',
    ],
    approach: [
      'Detailed evaluation with exam and imaging when appropriate',
      'Shared decision-making about non-operative and surgical options',
      'Coordination with therapy and follow-up across recovery milestones',
      'Clear communication at each step of your care plan',
    ],
    specialistName: 'Dr. Kamil M. Amer, MD',
    specialistBio:
      'Our orthopedic care is led by Dr. Kamil M. Amer, a board-certified orthopedic surgeon with fellowship training in hand and upper-extremity surgery from Thomas Jefferson University Hospital. Known for his hardworking and patient-focused approach, Dr. Amer provides thoughtful evaluation and treatment planning for both routine and complex orthopedic concerns, with hospital affiliations across northern New Jersey.',
    keywords: [
      'orthopedic services',
      'orthopedic surgeon',
      'joint pain',
      'hand surgery',
      'fracture care',
      'sports injury',
      'North Bergen orthopedist',
    ],
  },
  {
    slug: 'internal-medicine-gastroenterology',
    title: 'Internal Medicine & Gastroenterology',
    iconKey: 'internal-medicine',
    metaDescription:
      'Adult internal medicine and gastroenterology care at Elevate Wellness & Health, led by Dr. Kamal M. Amer, MD — board-certified in both specialties.',
    cardDescription:
      'Comprehensive adult care that connects overall health with digestive wellness — led by a board-certified specialist in both fields.',
    summary:
      'Internal medicine and gastroenterology care under one roof, with a focus on connecting overall adult health and digestive wellness.',
    intro:
      'Dr. Kamal M. Amer provides comprehensive care in Internal Medicine and Gastroenterology, focusing on both overall adult health and digestive wellness. His combined training lets him see the whole patient — connecting medical history, lifestyle, and digestive function into a single coordinated care plan.',
    conditions: [
      'Adult preventive care and annual wellness visits',
      'High blood pressure, diabetes, and cholesterol management',
      'Chronic condition management and ongoing medical concerns',
      'Acid reflux, heartburn, and GERD',
      'Abdominal pain, bloating, and digestive discomfort',
      'Constipation, diarrhea, and bowel concerns',
      'Liver and stomach conditions',
      'Intestinal disorders and routine GI screening',
      'Fatigue, weight, and metabolic wellness concerns',
    ],
    approach: [
      'Whole-patient evaluation that connects general health and digestive wellness',
      'Clear diagnosis with appropriate testing and imaging',
      'Personalized treatment plans focused on finding the cause of symptoms',
      'Ongoing follow-up and preventive care planning',
    ],
    specialistName: 'Dr. Kamal M. Amer, MD',
    specialistBio:
      'Dr. Kamal M. Amer is board-certified in Gastroenterology, Internal Medicine, and Obesity & Nutrition. He completed his fellowship in Gastroenterology and Hepatology at Rutgers New Jersey Medical School and his Internal Medicine residency at Thomas Jefferson University Hospital. He cares for patients in English, Spanish, and Arabic, and brings a thoughtful, patient-focused approach to both routine adult medical care and specialized digestive health support.',
    keywords: [
      'internal medicine',
      'gastroenterology',
      'colonoscopy',
      'acid reflux',
      'adult primary care',
      'preventive care',
      'North Bergen gastroenterologist',
    ],
  },
  {
    slug: 'physical-therapy',
    title: 'Physical Therapy',
    iconKey: 'physical-therapy',
    metaDescription:
      'Personalized physical therapy at Elevate Wellness & Health — pain relief, rehabilitation, strength, mobility, and recovery planning.',
    cardDescription:
      'Personalized therapy to help you move better, recover stronger, and return to daily life with confidence.',
    summary:
      'Personalized therapy to help you move better, recover stronger, and return to daily life with confidence.',
    intro:
      'Our Physical Therapy program is designed to support patients through every stage of recovery — from pain relief and injury rehabilitation to strength, mobility, balance, and long-term function. We focus on the root cause of discomfort, not just the symptom, so each plan fits the patient’s condition, lifestyle, and goals.',
    conditions: [
      'Back pain and neck pain',
      'Joint pain and post-surgical recovery',
      'Sports injuries and overuse strain',
      'Muscle weakness and difficulty with movement',
      'Balance issues and gait concerns',
      'Arthritis-related stiffness',
      'Chronic pain and functional limitation',
    ],
    approach: [
      'Hands-on care combined with guided exercises and stretching',
      'Strength, posture, and movement training',
      'Clear progression with weekly adjustments based on response',
      'Coordination with your physician and care team',
    ],
    keywords: [
      'physical therapy',
      'rehabilitation',
      'back pain',
      'recovery',
      'movement therapy',
    ],
  },
  {
    slug: 'peptide-wellness',
    title: 'Peptide Wellness',
    iconKey: 'peptide-wellness',
    metaDescription:
      'Peptide therapy at Elevate Wellness & Health — medically guided support for energy, recovery, weight management, and overall wellness.',
    cardDescription:
      'Personalized peptide support to help with energy, weight management, recovery, and overall wellness.',
    summary:
      'Personalized peptide support to help with energy, weight management, recovery, and overall wellness.',
    intro:
      'Peptides are small protein-like compounds that may help signal the body to improve certain functions. Our Peptide Wellness services are designed for patients who want to support their body’s natural healing, metabolism, strength, and overall vitality with a medically guided plan.',
    conditions: [],
    approach: [
      'May support weight management, energy, and metabolism',
      'May support muscle recovery, healthy aging, and sleep',
      'May complement immune support and overall wellness goals',
      'Plans built on health history and individual wellness priorities',
    ],
    keywords: [
      'peptide therapy',
      'peptide wellness',
      'weight management',
      'metabolic health',
      'recovery',
    ],
  },
  {
    slug: 'acupuncture',
    title: 'Acupuncture',
    iconKey: 'acupuncture',
    metaDescription:
      'Acupuncture at Elevate Wellness & Health — natural, gentle care for pain, tension, and overall wellness in a calm professional environment.',
    cardDescription:
      'Natural, holistic care to support pain relief, relaxation, healing, and overall wellness.',
    summary:
      'Natural, holistic care to support pain relief, relaxation, healing, and overall wellness.',
    intro:
      'Acupuncture is a gentle, time-tested treatment that uses very fine needles placed at specific points to help support the body’s natural healing process. Our services are designed to help patients feel better, move better, and restore balance in the body.',
    conditions: [
      'Back pain, neck pain, and joint pain',
      'Headaches and muscle tension',
      'Stress, anxiety, and fatigue',
      'Inflammation and chronic pain',
      'Recovery from injuries',
      'General wellness and balance',
    ],
    approach: [
      'Calm, professional, and supportive environment',
      'Personalized treatment plans based on symptoms and history',
      'Often complements other care plans for chronic pain or recovery',
      'Focus on long-term, natural healing',
    ],
    keywords: [
      'acupuncture',
      'pain relief',
      'natural medicine',
      'wellness',
      'holistic care',
    ],
  },
  {
    slug: 'iv-infusion-therapy',
    title: 'IV & Infusion Therapy',
    iconKey: 'iv-infusion',
    metaDescription:
      'IV and infusion therapy at Elevate Wellness & Health — hydration, vitamin, and wellness infusions delivered in a safe, professional environment.',
    cardDescription:
      'Hydration and wellness support designed to help restore, refresh, and recharge your body.',
    summary:
      'Hydration and wellness support designed to help restore, refresh, and recharge your body.',
    intro:
      'IV therapy allows fluids, vitamins, and nutrients to be delivered directly into the bloodstream, helping the body absorb them more efficiently. Our IV & Infusion Therapy services are designed to support hydration, energy, recovery, and overall wellness.',
    conditions: [],
    approach: [
      'May help with dehydration, fatigue, and low energy',
      'May support immune health and vitamin replenishment',
      'May aid recovery from illness or strenuous activity',
      'All infusions are reviewed against your health history and goals',
    ],
    keywords: [
      'IV therapy',
      'infusion therapy',
      'hydration',
      'wellness IV',
      'vitamin infusion',
    ],
  },
  {
    slug: 'in-house-lab',
    title: 'In-House Lab Services',
    iconKey: 'in-house-lab',
    metaDescription:
      'In-house lab and blood draw services at Elevate Wellness & Health — convenient testing for wellness visits, chronic condition monitoring, and specialty care plans.',
    cardDescription:
      'Convenient lab testing and blood draw services available right here in our clinic.',
    summary:
      'Convenient lab testing and blood draw services available right here in our clinic.',
    intro:
      'We make care easier by offering in-house lab services and blood draws in the same location. Patients can complete their visit, receive their lab order, and have blood work done without needing to travel to a separate facility.',
    conditions: [],
    approach: [
      'Wellness visits and annual screenings',
      'Chronic condition monitoring and medication management',
      'Hormone, vitamin, and metabolic panels',
      'Lab support for weight loss programs, peptide therapy, and preventive care',
    ],
    keywords: [
      'in-house lab',
      'blood draw',
      'lab testing',
      'wellness labs',
      'chronic condition monitoring',
    ],
  },
]

const bySlug = new Map(servicePages.map((s) => [s.slug, s]))

export function getServicePage(slug: string): ServicePage | undefined {
  return bySlug.get(slug)
}

export function getAllServiceSlugs(): string[] {
  return servicePages.map((s) => s.slug)
}
