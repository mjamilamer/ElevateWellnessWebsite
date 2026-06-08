export type ServiceIconKey =
  | 'orthopedic'
  | 'internal-medicine'
  | 'physical-therapy'
  | 'peptide-wellness'
  | 'acupuncture'
  | 'iv-infusion'
  | 'in-house-lab'
  | 'emg-ncs'
  | 'weight-management'

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
  /** Route slug for the specialist's provider page, e.g. 'dr-kamil-amer'. */
  specialistSlug?: string
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
      'Our orthopedic specialists provide expert evaluation and treatment for conditions affecting the bones, joints, muscles, ligaments, tendons, and spine. Whether you are experiencing chronic joint pain, sports injuries, fractures, arthritis, hand conditions, or work-related injuries, we offer comprehensive treatment options tailored to your needs. Our focus is on restoring mobility, reducing pain, and helping patients return to their active lifestyles.',
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
    specialistSlug: 'dr-kamil-amer',
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
      'Our Internal Medicine and Gastroenterology services focus on the prevention, diagnosis, and treatment of a wide range of acute and chronic medical conditions. We provide comprehensive care for digestive disorders, acid reflux, liver disease, gastrointestinal symptoms, diabetes, hypertension, high cholesterol, and overall adult wellness. Our goal is to deliver personalized, evidence-based care that promotes long-term health and well-being.',
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
    specialistSlug: 'dr-kamal-amer',
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
    summary: 'Restore Movement. Relieve Pain. Reclaim Your Life.',
    intro:
      'Our Physical Therapy program is designed to help patients recover from injuries, surgeries, chronic pain, and mobility limitations through personalized treatment plans focused on restoring strength, function, and movement. Our licensed physical therapists work closely with each patient to develop individualized rehabilitation programs that address their unique needs and goals.\n\nWe provide treatment for orthopedic injuries, sports-related conditions, post-surgical rehabilitation, neck and back pain, joint pain, balance disorders, and functional limitations. Through a combination of therapeutic exercises, manual therapy, stretching, strengthening, balance training, and patient education, we help patients regain independence, reduce pain, and improve overall quality of life.\n\nWhether you are recovering from surgery, managing a chronic condition, or looking to improve mobility and physical performance, our goal is to help you move better, feel stronger, and return to the activities you enjoy as safely and quickly as possible.',
    conditions: [],
    approach: [
      'Post-Surgical Rehabilitation',
      'Sports Injury Rehabilitation',
      'Back & Neck Pain Treatment',
      'Joint Pain & Arthritis Management',
      'Balance & Fall Prevention Training',
      'Strength & Conditioning Programs',
      'Gait & Mobility Training',
      'Work-Related Injury Rehabilitation',
      'Manual Therapy',
      'Personalized Home Exercise Programs',
    ],
    specialistName: 'Muneer Obeidallah, PT',
    specialistSlug: 'muneer-obeidallah',
    specialistBio:
      'Our physical therapy is led by Muneer Obeidallah, a dedicated Physical Therapist who creates individualized treatment plans using therapeutic exercise, manual therapy, functional training, and patient education. He works closely with our physicians to deliver coordinated, comprehensive care that promotes healing, strength, and long-term wellness.',
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
      'At Elevate Wellness & Health, we offer medically supervised peptide therapies designed to support overall health, recovery, metabolism, wellness, and healthy aging. Peptides are naturally occurring compounds that may help promote tissue repair, optimize cellular function, support weight management, improve energy levels, and enhance recovery. Every treatment plan is individualized and carefully monitored by our healthcare professionals to ensure safety and effectiveness.',
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
      'Our IV Therapy and Infusion Services provide patients with safe, physician-supervised treatments in a comfortable clinical environment. Infusion therapy may be used for hydration, vitamin supplementation, wellness support, and medically necessary treatments prescribed by your healthcare provider. Our experienced clinical team ensures that every infusion is administered safely while prioritizing patient comfort and individualized care.',
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
      'Our in-house laboratory services provide convenient and efficient testing to support your healthcare needs. We offer a wide range of diagnostic blood work and laboratory testing to assist in preventive care, chronic disease management, wellness monitoring, and diagnostic evaluations. Having laboratory services available on-site allows for faster results, improved coordination of care, and greater convenience for our patients.',
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
  {
    slug: 'emg-nerve-conduction-studies',
    title: 'EMG & Nerve Conduction Studies',
    iconKey: 'emg-ncs',
    metaDescription:
      'EMG and Nerve Conduction Studies (NCS) at Elevate Wellness & Health — advanced diagnostic testing for nerve and muscle disorders such as carpal tunnel syndrome, neuropathy, and pinched nerves.',
    cardDescription:
      'Advanced diagnostic testing for nerve and muscle disorders — carpal tunnel, neuropathy, pinched nerves, and more.',
    summary:
      'Advanced diagnostic testing that pinpoints the source of numbness, tingling, weakness, and pain.',
    intro:
      'Nerve Conduction Studies are advanced diagnostic tests used to evaluate how well electrical signals travel through your nerves. These studies help diagnose conditions such as carpal tunnel syndrome, neuropathy, nerve injuries, pinched nerves, and other disorders affecting the nervous system. Our specialists use state-of-the-art technology to provide accurate diagnoses and personalized treatment recommendations, helping patients find answers to symptoms such as numbness, tingling, weakness, and pain.\n\nElectromyography (EMG) is a specialized test that evaluates the health and function of muscles and the nerves that control them. EMG helps identify nerve and muscle disorders, including radiculopathy, neuropathy, muscle diseases, and nerve compression syndromes. By accurately identifying the source of symptoms, our providers can develop targeted treatment plans to improve function, reduce pain, and enhance quality of life.',
    conditions: [
      'Carpal tunnel syndrome',
      'Neuropathy and nerve injuries',
      'Pinched or compressed nerves',
      'Radiculopathy',
      'Muscle diseases and disorders',
      'Numbness, tingling, weakness, and pain',
    ],
    approach: [
      'State-of-the-art diagnostic technology',
      'Accurate identification of the source of symptoms',
      'Targeted, personalized treatment recommendations',
      'Coordinated follow-up with our specialty team',
    ],
    keywords: [
      'EMG',
      'nerve conduction studies',
      'NCS',
      'carpal tunnel',
      'neuropathy',
      'nerve testing',
    ],
  },
  {
    slug: 'weight-management',
    title: 'Weight Management & Wellness',
    iconKey: 'weight-management',
    metaDescription:
      'Medically supervised weight management and metabolic health programs at Elevate Wellness & Health — designed to support healthy weight, energy, and overall wellness.',
    cardDescription:
      'Medically supervised programs to support a healthy weight, metabolic health, and overall wellness.',
    summary:
      'Medically supervised programs to support a healthy weight, metabolic health, and overall wellness.',
    intro:
      'We offer medically supervised programs designed to help patients achieve and maintain a healthy weight while improving overall metabolic health, energy levels, and wellness.',
    conditions: [],
    approach: [
      'Medically supervised weight management',
      'Metabolic and obesity & nutrition expertise',
      'Personalized nutrition and lifestyle guidance',
      'Coordinated with in-house labs and preventive care',
    ],
    specialistName: 'Dr. Kamal M. Amer, MD',
    specialistSlug: 'dr-kamal-amer',
    specialistBio:
      'Our weight management program is supported by Dr. Kamal M. Amer, who is board-certified in Obesity & Nutrition in addition to Gastroenterology and Internal Medicine. Care plans are individualized and coordinated with preventive medicine and on-site laboratory testing.',
    keywords: [
      'weight management',
      'metabolic health',
      'medical weight loss',
      'obesity and nutrition',
      'wellness program',
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
