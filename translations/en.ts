import { TranslationKey } from '../types/translations.types'

const en: Record<TranslationKey, string> = {
  // Navigation
  'nav.home': 'Home',
  'nav.snapshots': 'Snapshots',
  'nav.analytics': 'Analytics',
  'nav.contact': 'Contact',
  'nav.dashboard': 'Dashboard',
  'nav.profile': 'Profile',
  'nav.history': 'History',
  
  // Wallet
  'wallet.connect': 'Connect Ultra Wallet',
  'wallet.connecting': 'Connecting...',
  'wallet.disconnect': 'Disconnect Wallet',
  
  // Pages
  'page.dashboard.title': 'Dashboard',
  'page.dashboard.subtitle': 'Overview of your automated snapshot jobs',
  'page.snapshots.title': 'Snapshot Jobs',
  'page.snapshots.subtitle': 'Create and manage your automated snapshots for your NFT collections',
  'page.analytics.title': 'Analytics',
  'page.analytics.subtitle': 'Analyze the performance of your snapshots and airdrops',
  'page.faq.title': 'Frequently Asked Questions',
  'page.faq.subtitle': 'Find quick answers to your questions about UT-Snapshot',
  'page.profile.title': 'Profile',
  'page.profile.subtitle': 'Manage your profile and settings',
  'page.history.title': 'Snapshot History',
  'page.history.subtitle': 'View the complete history of your snapshot executions',
  
  // Boutons
  'button.create': 'Create',
  'button.cancel': 'Cancel',
  'button.save': 'Save',
  'button.edit': 'Edit',
  'button.delete': 'Delete',
  'button.view': 'View',
  'button.details': 'Details',
  
  // Statuts
  'status.active': 'Active',
  'status.paused': 'Paused',
  'status.completed': 'Completed',
  'status.failed': 'Failed',
  'status.success': 'Success',
  
  // Général
  'general.loading': 'Loading...',
  'general.search': 'Search',
  'general.filter': 'Filter',
  'general.all': 'All',
  'general.cost': 'Cost',
  'general.total': 'Total',
  'general.date': 'Date',
  'general.duration': 'Duration',
  'general.holders': 'Holders',
  
  // Landing
  'landing.title': 'Automate your Snapshots & Airdrops on Ultra',
  'landing.subtitle': 'Save time, engage your community',
  'landing.description': 'Save time, engage your community, and manage your token holders effortlessly with our advanced automation platform.',
  'landing.connectWallet': 'Connect Ultra Wallet',
  'landing.tryDemo': 'Try Demo',
  'landing.goToDashboard': 'Go to Dashboard',
  'landing.createSnapshot': 'Create Snapshot',
  'landing.badge': 'Powered by Ultra Blockchain',
  'landing.connectShort': 'Connect',
  'landing.demoShort': 'Demo',
  
  // Landing Features
  'landing.features.automation': 'Instant Automation',
  'landing.features.security': 'Secure & Reliable',
  'landing.features.usability': 'Easy to Use',
  
  // Landing Stats
  'landing.stats.snapshots': 'Snapshots Created',
  'landing.stats.tokens': 'Tokens Distributed',
  'landing.stats.uptime': 'Uptime',
  
  // Landing Floating Cards
  'landing.floatingCards.live': 'Live Snapshots',
  'landing.floatingCards.auto': 'Auto Airdrops',
  
  // Landing CTA
  'landing.cta.badge': 'Ready to Get Started?',
  'landing.cta.title': 'Join the Future of Token Distribution',
  'landing.cta.description': 'Start automating your snapshots and airdrops today. Join thousands of creators who trust UT-Snapshot for their token distribution needs.',
  'landing.cta.startFree': 'Start Free Today',
  'landing.cta.startShort': 'Start Free',
  'landing.cta.viewDemo': 'View Demo',
  'landing.cta.trusted': 'Trusted by creators worldwide',
  
  // Landing CTA Benefits
  'landing.cta.benefits.speed': 'Lightning Fast Setup',
  'landing.cta.benefits.security': 'Enterprise Security',
  'landing.cta.benefits.support': '24/7 Support',
  'landing.cta.benefits.pricing': 'No Hidden Fees',
  
  // Landing CTA Stats
  'landing.cta.stats.users': 'Active Users',
  'landing.cta.stats.tokens': 'Tokens Distributed',
  'landing.cta.stats.uptime': 'Uptime',
  'landing.cta.stats.support': 'Support',
  
  // Landing Key Features
  'landing.features.badge': 'Key Features',
  'landing.features.title': 'Powerful Features for Modern Creators',
  'landing.features.subtitle': 'Everything you need to manage your token distributions efficiently and securely on the Ultra blockchain.',
  
  // Landing Key Features - Security
  'landing.features.security.title': 'Enterprise Security',
  'landing.features.security.description': 'Bank-grade security with multi-layer encryption and secure wallet integration.',
  'landing.features.security.detail1': 'End-to-end encryption',
  'landing.features.security.detail2': 'Secure wallet connection',
  'landing.features.security.detail3': 'Audit trail',
  
  // Landing Key Features - Speed
  'landing.features.speed.title': 'Lightning Fast',
  'landing.features.speed.description': 'Process thousands of snapshots and airdrops in seconds with our optimized infrastructure.',
  'landing.features.speed.detail1': 'High-performance processing',
  'landing.features.speed.detail2': 'Real-time execution',
  'landing.features.speed.detail3': 'Instant notifications',
  
  // Landing Key Features - Automation
  'landing.features.automation.title': 'Smart Automation',
  'landing.features.automation.description': 'Set it and forget it. Our intelligent system handles everything automatically.',
  'landing.features.automation.detail1': 'Scheduled execution',
  'landing.features.automation.detail2': 'Smart conditions',
  'landing.features.automation.detail3': 'Auto-retry logic',
  
  // Landing Key Features - Analytics
  'landing.features.analytics.title': 'Advanced Analytics',
  'landing.features.analytics.description': 'Comprehensive insights and detailed reports for all your snapshot activities.',
  'landing.features.analytics.detail1': 'Real-time dashboards',
  'landing.features.analytics.detail2': 'Export capabilities',
  'landing.features.analytics.detail3': 'Historical data',
  
  // Landing Key Features - Community
  'landing.features.community.title': 'Community Focus',
  'landing.features.community.description': 'Built for creators and communities with intuitive tools and seamless experience.',
  'landing.features.community.detail1': 'User-friendly interface',
  'landing.features.community.detail2': 'Community tools',
  'landing.features.community.detail3': '24/7 support',
  
  // Landing Key Features - Integration
  'landing.features.integration.title': 'Ultra Integration',
  'landing.features.integration.description': 'Native integration with Ultra blockchain for seamless token management.',
  'landing.features.integration.detail1': 'Native Ultra support',
  'landing.features.integration.detail2': 'Multi-token handling',
  'landing.features.integration.detail3': 'Cross-chain ready',
  
  // Landing Key Features Stats
  'landing.features.stats.uptime': 'Uptime',
  'landing.features.stats.snapshots': 'Snapshots',
  'landing.features.stats.tokens': 'Tokens Distributed',
  'landing.features.stats.support': 'Support',
  
  // Landing How It Works
  'landing.howItWorks.badge': 'How It Works',
  'landing.howItWorks.title': 'Simple Steps to Automate Everything',
  'landing.howItWorks.subtitle': 'Get started with UT-Snapshot in just three simple steps. No complex setup, no technical knowledge required.',
  'landing.howItWorks.cta': 'Get Started Now',
  
  // Landing How It Works - Connect
  'landing.howItWorks.connect.title': 'Connect',
  'landing.howItWorks.connect.description': 'Connect your Ultra wallet and access your Factory Manager space with one click.',
  'landing.howItWorks.connect.detail1': 'Secure wallet integration',
  'landing.howItWorks.connect.detail2': 'Instant access',
  'landing.howItWorks.connect.detail3': 'No setup required',
  
  // Landing How It Works - Configure
  'landing.howItWorks.configure.title': 'Configure',
  'landing.howItWorks.configure.description': 'Set up your snapshot parameters and airdrop conditions with our intuitive interface.',
  'landing.howItWorks.configure.detail1': 'Custom parameters',
  'landing.howItWorks.configure.detail2': 'Smart conditions',
  'landing.howItWorks.configure.detail3': 'Real-time preview',
  
  // Landing How It Works - Automate
  'landing.howItWorks.automate.title': 'Automate',
  'landing.howItWorks.automate.description': 'Launch your jobs and let UT-Snapshot handle your snapshots and airdrops automatically.',
  'landing.howItWorks.automate.detail1': 'Automated execution',
  'landing.howItWorks.automate.detail2': 'Real-time monitoring',
  'landing.howItWorks.automate.detail3': 'Instant notifications',
  
  // Snapshots
  'snapshots.title': 'Snapshot Jobs',
  'snapshots.subtitle': 'Create and manage your automated snapshots',
  'snapshots.create': 'Create Snapshot',
  'snapshots.empty.title': 'No snapshots created',
  'snapshots.empty.description': 'Start by creating your first automated snapshot',
  'snapshots.stats.total': 'Total',
  'snapshots.stats.running': 'Running',
  'snapshots.stats.completed': 'Completed',
  'snapshots.stats.scheduled': 'Scheduled',
  'snapshots.filter.all': 'All',
  'snapshots.filter.completed': 'Completed',
  'snapshots.filter.running': 'Running',
  'snapshots.filter.failed': 'Failed',
  'snapshots.filter.scheduled': 'Scheduled',
  'snapshots.duplicate': 'Duplicate',
  'snapshots.download': 'Download',
  'snapshots.view': 'View',
  'snapshots.holders': 'Holders',
  'snapshots.downloads': 'Downloads',
  'snapshots.pagination.previous': 'Previous',
  'snapshots.pagination.next': 'Next',
  'snapshots.pagination.showing': 'Showing',
  'snapshots.pagination.of': 'of',
  'snapshots.modal.title.create': 'Create Snapshot',
  'snapshots.modal.title.duplicate': 'Duplicate Snapshot',
  'snapshots.modal.step.config': 'Basic configuration',
  'snapshots.modal.step.planning': 'Advanced planning',
  'snapshots.modal.step.review': 'Review and validation',
  'snapshots.modal.name': 'Snapshot name',
  'snapshots.modal.description': 'Describe the goal of this snapshot, selection criteria, applied filters, and its intended use to optimize your strategy...',
  'snapshots.modal.collection': 'Ultra Collection or Contract',
  'snapshots.modal.date': 'Scheduled date',
  'snapshots.modal.time': 'Execution time',
  'snapshots.modal.conditions': 'Advanced Criteria and Conditions',
  'snapshots.modal.export': 'Export Format',
  'snapshots.modal.summary': 'Configuration Summary',
  'snapshots.modal.button.previous': 'Previous step',
  'snapshots.modal.button.next': 'Next step',
  'snapshots.modal.button.cancel': 'Cancel',
  'snapshots.modal.button.draft': 'Save as draft',
  'snapshots.modal.button.create': 'Create snapshot',
  
  // Analytics
  'analytics.title': 'Analytics',
  'analytics.subtitle': 'Analyze the performance of your snapshots and airdrops',
  'analytics.overview.title': 'Overview',
  'analytics.overview.snapshots': 'Snapshots Created',
  'analytics.overview.executions': 'Executions',
  'analytics.overview.downloads': 'Downloads',
  'analytics.overview.successRate': 'Success Rate',
  'analytics.overview.averageTime': 'Average Time',
  'analytics.overview.costs': 'Total Costs',
  'analytics.charts.snapshots.title': 'Snapshots Evolution',
  'analytics.charts.executions.title': 'Executions Evolution',
  'analytics.status.title': 'Snapshot Status',
  'analytics.status.completed': 'Completed',
  'analytics.status.running': 'Running',
  'analytics.status.scheduled': 'Scheduled',
  'analytics.status.failed': 'Failed',
  'analytics.timeRange.7d': '7 days',
  'analytics.timeRange.30d': '30 days',
  'analytics.timeRange.90d': '90 days',
  'analytics.timeRange.1y': '1 year',
  'analytics.insights.title': 'Quick Insights',
  'analytics.insights.activeSnapshots': 'Created Snapshots',
  'analytics.insights.successRate': 'Success Rate',
  'analytics.insights.performance.title': 'Performance Metrics',
  'analytics.insights.performance.downloads': 'Downloads',
  'analytics.insights.performance.costs': 'Total Costs',
  
  // FAQ
  'faq.title': 'Frequently Asked Questions',
  'faq.subtitle': 'Find quick answers to your questions about UT-Snapshot',
  'faq.search.placeholder': 'Search in frequently asked questions...',
  'faq.stats.questions': 'Questions',
  'faq.stats.categories': 'Categories',
  'faq.stats.satisfaction': 'Satisfaction',
  'faq.category.general': 'General',
  'faq.category.usage': 'Usage',
  'faq.category.pricing': 'Pricing',
  'faq.category.automation': 'Automation',
  'faq.category.support': 'Support',
  'faq.category.security': 'Security',
  'faq.category.api': 'API',
  'faq.contact.title': 'Need help?',
  'faq.contact.subtitle': 'Our team is here to assist you',
  'faq.contact.chat': 'Live Chat',
  'faq.contact.email': 'Send Email',
  'faq.contact.phone': 'Phone Call'
}

export default en 