// repo and demo are optional. The UI hides them while they are empty strings.
export const projectCategories = [
  { id: 'all', label: 'All' },
  { id: 'fullstack', label: 'Full-stack' },
  { id: 'devops', label: 'DevOps' },
  { id: 'ml', label: 'ML and data' },
]

export const projects = [
  {
    slug: 'flex-academic-portal',
    title: 'Flex Academic Portal',
    category: 'fullstack',
    description:
      'Developed an academic management portal allowing students and faculty to manage courses, assignments, and grades efficiently. Built using C# .NET ASP Core and SQL database.',
    bullets: [],
    tags: ['C#', '.NET Core', 'SQL'],
    repo: '',
    demo: '',
  },
  {
    slug: 'job-fair-management-system',
    title: 'Job Fair Management System',
    category: 'fullstack',
    description:
      'Designed and developed a Job Fair Management application enabling recruiters and candidates to seamlessly manage job postings, applications, and interview scheduling using the MERN stack.',
    bullets: [],
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    repo: '',
    demo: '',
  },
  {
    slug: 'event-management-system',
    title: 'Event Management System',
    category: 'fullstack',
    description:
      'Built a comprehensive event management solution for creating, organizing, and tracking events and registrations using the MERN stack.',
    bullets: [],
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    repo: '',
    demo: '',
  },
  {
    slug: 'mlops-nlp-pipeline',
    title: 'MLOps NLP Pipeline Project',
    category: 'devops',
    description:
      'Developed an end-to-end MLOps pipeline for news text classification using Airflow for orchestration, MLflow for experiment tracking, FastAPI for model serving, and Prometheus + Grafana for API monitoring.',
    bullets: [
      'Automated data processing, feature engineering, and model training',
      'Implemented robust monitoring dashboards',
      'Containerized using Docker Compose',
    ],
    tags: ['Airflow', 'MLflow', 'FastAPI', 'Prometheus', 'Grafana'],
    repo: '',
    demo: '',
  },
  {
    slug: 'task-manager-docker-k8s',
    title: 'Task Manager (Docker & Kubernetes)',
    category: 'devops',
    description:
      'Built a Flask & MongoDB task manager, fully containerized with Docker and deployable on Kubernetes. Used GitHub Actions for CI/CD automation and verification.',
    bullets: [
      'Add, complete, and delete tasks via intuitive UI',
      'Automatic testing & deployment with GitHub Actions',
      'Scalable microservices architecture',
    ],
    tags: ['Docker', 'Kubernetes', 'Flask', 'MongoDB', 'GitHub Actions'],
    repo: '',
    demo: '',
  },
  {
    slug: 'docker-flask-calculator',
    title: 'Docker-Flask-Calculator',
    category: 'devops',
    description:
      'Designed a RESTful calculator API using Flask, containerized with Docker, and setup a CI/CD pipeline via GitHub Actions for automated testing, linting, building, and Docker Hub deployment.',
    bullets: [],
    tags: ['Flask', 'Docker', 'GitHub Actions'],
    repo: '',
    demo: '',
  },
  {
    slug: 'github-workflows-automation',
    title: 'GitHub Workflows Automation',
    category: 'devops',
    description:
      'Automated project testing workflows using GitHub Actions, ensuring code quality and reliability through continuous integration.',
    bullets: [],
    tags: ['GitHub Actions'],
    repo: '',
    demo: '',
  },
  {
    slug: 'income-prediction-analysis',
    title: 'Income Prediction Analysis',
    category: 'ml',
    description:
      'Performed extensive EDA and built predictive models (Logistic Regression & SVM) for U.S. Census income classification using multiple preprocessing pipelines. Used DVC integrated with Google Drive for efficient experiment and dataset versioning.',
    bullets: [
      'Multiple imputation & scaling strategies',
      'Comprehensive performance comparison',
      'Key insights on demographic income factors',
      'DVC for reproducible pipelines (Google Drive remote)',
    ],
    tags: ['DVC', 'Logistic Regression', 'SVM'],
    repo: '',
    demo: '',
  },
  {
    slug: 'hateful-meme-classification',
    title: 'Hateful Meme Classification',
    category: 'ml',
    description:
      'Implemented multimodal deep learning to classify memes as hateful or non-hateful by fusing image and text features. Explored early and late fusion strategies with models like BERT, LSTM, CNN, and ResNet.',
    bullets: [
      'Custom data loaders and augmentation',
      'Evaluation with AUROC, F1, confusion matrix',
      'Visualization: word clouds, class distribution',
    ],
    tags: ['BERT', 'LSTM', 'CNN', 'ResNet'],
    repo: '',
    demo: '',
  },
  {
    slug: 'stationary-detector-yolov5',
    title: 'Stationary Detector (YOLOv5)',
    category: 'ml',
    description:
      'Developed a custom YOLOv5 model and Streamlit web app to detect and count stationary items (Eraser, Pencil, Scale, Sharpener) in images, generating bills automatically.',
    bullets: [
      'Custom dataset training with Roboflow',
      'Real-time detection and billing UI',
      'Model retrainable with new data',
    ],
    tags: ['YOLOv5', 'Streamlit', 'Roboflow'],
    repo: '',
    demo: '',
  },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)
export const imageName = (p) => `hassaan/${p.slug}:latest`
