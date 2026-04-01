export type ServicePage = {
  slug: string
  title: string
  metaDescription: string
  summary: string
  intro: string
  conditions: string[]
  approach: string[]
  keywords: string[]
}

export const servicePages: ServicePage[] = [
  {
    slug: 'joint-replacement',
    title: 'Joint Replacement',
    metaDescription:
      'Hip, knee, and shoulder replacement with modern techniques and recovery-focused care at Elevated Health & Wellness.',
    summary:
      'Restore mobility with advanced joint replacement options tailored to your goals and lifestyle.',
    intro:
      'When joint pain limits everyday activities and conservative care is no longer enough, joint replacement can offer lasting relief. Our team focuses on careful planning, proven implants and methods, and a clear path through recovery.',
    conditions: [
      'Osteoarthritis of the hip, knee, or shoulder',
      'Post-traumatic arthritis after injury',
      'Inflammatory joint disease when surgery is indicated',
      'Failed prior arthroplasty requiring revision evaluation',
    ],
    approach: [
      'Thorough evaluation and shared decision-making',
      'Minimally invasive approaches when clinically appropriate',
      'Pain control and mobilization plans aligned with your safety',
      'Coordination with therapy and follow-up through healing milestones',
    ],
    keywords: [
      'joint replacement',
      'hip replacement',
      'knee replacement',
      'shoulder replacement',
      'orthopedics',
    ],
  },
  {
    slug: 'sports-medicine',
    title: 'Sports Medicine',
    metaDescription:
      'Evaluation and treatment of athletic and active-lifestyle injuries—sprains, tears, overuse, and return-to-play planning.',
    summary:
      'Get back to the activities you love with specialized sports injury care.',
    intro:
      'From weekend warriors to competitive athletes, we diagnose and treat injuries that affect performance and daily movement. Treatment may include activity modification, targeted therapy, injections, or surgery when needed.',
    conditions: [
      'ACL and other knee ligament injuries',
      'Meniscus tears and cartilage problems',
      'Shoulder instability, labral tears, and rotator cuff issues',
      'Ankle sprains, Achilles problems, and stress reactions',
      'Overuse injuries and tendinopathy',
    ],
    approach: [
      'Clear diagnosis with exam and appropriate imaging',
      'Conservative options first when they fit your goals',
      'Surgical planning when repair or reconstruction is indicated',
      'Graduated return-to-activity guidance',
    ],
    keywords: ['sports medicine', 'ACL', 'rotator cuff', 'athletic injury'],
  },
  {
    slug: 'spine-care',
    title: 'Spine Care',
    metaDescription:
      'Back and neck pain care including non-operative treatment and surgical options when appropriate for your condition.',
    summary:
      'Comprehensive spine care from conservative therapy to advanced surgery.',
    intro:
      'Neck and back symptoms can stem from many causes. We build a plan that matches your diagnosis—often starting with non-surgical care and progressing only if symptoms or imaging support the next step.',
    conditions: [
      'Herniated disc and radicular pain',
      'Spinal stenosis with claudication symptoms',
      'Degenerative disc disease',
      'Spondylolisthesis and mechanical back pain',
      'Selected cervical spine disorders',
    ],
    approach: [
      'Focused history, exam, and imaging when needed',
      'Physical therapy, medications, and injections as indicated',
      'Surgery discussed when deficits or pain persist despite appropriate care',
      'Recovery and activity counseling after treatment',
    ],
    keywords: ['spine care', 'back pain', 'neck pain', 'herniated disc'],
  },
  {
    slug: 'hand-wrist',
    title: 'Hand & Wrist',
    metaDescription:
      'Expert care for carpal tunnel, arthritis, fractures, and tendon conditions of the hand and wrist.',
    summary:
      'Precise treatment for hand and wrist pain, numbness, and loss of function.',
    intro:
      'Fine hand and wrist function matters for work and daily life. We treat common and complex conditions with both non-operative and surgical options.',
    conditions: [
      'Carpal tunnel syndrome',
      'Trigger finger and tendonitis',
      'Basilar thumb and finger arthritis',
      'Fractures and ligament injuries',
      'Ganglion cysts and masses (evaluation)',
    ],
    approach: [
      'Detailed hand exam and targeted testing',
      'Splinting, therapy, and injections when appropriate',
      'Outpatient procedures for nerve and tendon conditions',
      'Hand therapy coordination for recovery',
    ],
    keywords: ['hand surgery', 'carpal tunnel', 'wrist pain'],
  },
  {
    slug: 'foot-ankle',
    title: 'Foot & Ankle',
    metaDescription:
      'Bunions, plantar fasciitis, ankle instability, Achilles issues, and foot deformity care.',
    summary:
      'Walk comfortably again with foot and ankle care built around your symptoms.',
    intro:
      'Foot and ankle problems can change gait and limit activity. We identify the source of pain and offer evidence-based treatment paths.',
    conditions: [
      'Plantar fasciitis and heel pain',
      'Bunions and toe deformities',
      'Ankle sprains and chronic instability',
      'Achilles tendinopathy and tears',
      'Arthritis of the foot and ankle',
    ],
    approach: [
      'Biomechanical assessment and imaging when useful',
      'Orthotics, bracing, therapy, and injections as options',
      'Surgery for deformity, instability, or tendon problems when indicated',
      'Progressive return to weight-bearing and sport',
    ],
    keywords: ['foot pain', 'ankle', 'plantar fasciitis', 'bunion'],
  },
  {
    slug: 'arthroscopic-surgery',
    title: 'Arthroscopic Surgery',
    metaDescription:
      'Minimally invasive arthroscopic procedures for joints when repair or debridement is the right choice.',
    summary:
      'Smaller incisions and focused joint treatment when arthroscopy is appropriate.',
    intro:
      'Arthroscopy uses a camera and small instruments inside the joint to treat labral tears, meniscus problems, loose bodies, and other conditions—often as outpatient surgery.',
    conditions: [
      'Knee meniscus tears and selected cartilage lesions',
      'Shoulder labral tears and impingement syndromes',
      'Hip impingement evaluation and treatment in selected cases',
      'Ankle and wrist arthroscopy for specific diagnoses',
    ],
    approach: [
      'Confirm that arthroscopy matches your diagnosis and goals',
      'Discuss alternatives, risks, and realistic outcomes',
      'Outpatient procedure with structured post-op protocols',
      'Therapy to restore motion, strength, and function',
    ],
    keywords: ['arthroscopy', 'minimally invasive', 'knee scope'],
  },
  {
    slug: 'physical-therapy',
    title: 'Physical Therapy',
    metaDescription:
      'Rehabilitation and therapy coordination to regain strength, motion, and confidence after injury or surgery.',
    summary:
      'Structured rehabilitation plans to support recovery and performance.',
    intro:
      'Therapy is often central to recovery—whether you avoid surgery or recover after a procedure. We work with skilled therapists on plans that match your condition and pace.',
    conditions: [
      'Post-operative rehabilitation after joint or sports procedures',
      'Weakness and stiffness after injury or immobilization',
      'Balance and gait training',
      'Work-related and overuse strain',
    ],
    approach: [
      'Clear therapy goals tied to your activity level',
      'Communication between your physician and therapy team',
      'Progressive loading and return-to-sport criteria when relevant',
      'Adjustments based on how you respond each week',
    ],
    keywords: ['physical therapy', 'rehabilitation', 'recovery'],
  },
  {
    slug: 'pain-management',
    title: 'Pain Management',
    metaDescription:
      'Multimodal pain care including injections and coordinated non-opioid strategies when appropriate.',
    summary:
      'Thoughtful pain control options that fit your diagnosis and overall health.',
    intro:
      'Pain management is not one-size-fits-all. We combine activity modification, therapy, medications when appropriate, and procedures such as injections to target the source of pain.',
    conditions: [
      'Joint and bursal inflammation',
      'Radicular or mechanical spine-related pain (evaluation)',
      'Tendon and soft-tissue pain syndromes',
      'Post-operative pain flares during recovery',
    ],
    approach: [
      'Identify anatomical contributors when possible',
      'Coordinate with therapy and other specialists as needed',
      'Image-guided injections when indicated',
      'Ongoing reassessment with a focus on function',
    ],
    keywords: ['pain management', 'joint injection', 'musculoskeletal pain'],
  },
  {
    slug: 'fracture-care',
    title: 'Fracture Care',
    metaDescription:
      'Treatment for acute fractures and traumatic injuries—including immobilization, reduction, and surgical fixation when needed.',
    summary:
      'Timely fracture care from urgent evaluation through healing.',
    intro:
      'Broken bones need appropriate alignment, stability, and follow-up. We treat many fractures in the office and operating room, with plans based on bone, location, and your health.',
    conditions: [
      'Wrist, ankle, and foot fractures',
      'Humerus and clavicle fractures',
      'Hip and femur fractures in selected settings',
      'Stress fractures and injury follow-up',
    ],
    approach: [
      'Prompt assessment and imaging',
      'Casting, splinting, or surgery to achieve stable alignment',
      'Monitoring bone healing with timely X-rays',
      'Return to activity as healing permits',
    ],
    keywords: ['fracture', 'broken bone', 'trauma'],
  },
]

const bySlug = new Map(servicePages.map((s) => [s.slug, s]))

export function getServicePage(slug: string): ServicePage | undefined {
  return bySlug.get(slug)
}

export function getAllServiceSlugs(): string[] {
  return servicePages.map((s) => s.slug)
}
