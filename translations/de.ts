import { TranslationKey } from '../types/translations.types'

const de: Record<TranslationKey, string> = {
  // Navigation
  'nav.home': 'Startseite',
  'nav.snapshots': 'Snapshots',
  'nav.analytics': 'Analytics',
  'nav.contact': 'Kontakt',
  'nav.dashboard': 'Dashboard',
  'nav.profile': 'Profil',
  'nav.history': 'Verlauf',
  
  // Wallet
  'wallet.connect': 'Ultra Wallet verbinden',
  'wallet.connecting': 'Verbinde...',
  'wallet.disconnect': 'Wallet trennen',
  
  // Pages
  'page.dashboard.title': 'Dashboard',
  'page.dashboard.subtitle': 'Übersicht über Ihre automatisierten Snapshot-Jobs',
  'page.snapshots.title': 'Snapshot-Jobs',
  'page.snapshots.subtitle': 'Erstellen und verwalten Sie Ihre automatisierten Snapshots für Ihre NFT-Sammlungen',
  'page.analytics.title': 'Analytics',
  'page.analytics.subtitle': 'Analysieren Sie die Leistung Ihrer Snapshots und Airdrops',
  'page.faq.title': 'Häufig gestellte Fragen',
  'page.faq.subtitle': 'Finden Sie schnelle Antworten auf Ihre Fragen zu UT-Snapshot',
  'page.profile.title': 'Profil',
  'page.profile.subtitle': 'Verwalten Sie Ihr Profil und Ihre Einstellungen',
  'page.history.title': 'Snapshot-Verlauf',
  'page.history.subtitle': 'Sehen Sie die vollständige Geschichte Ihrer Snapshot-Ausführungen',
  
  // Boutons
  'button.create': 'Erstellen',
  'button.cancel': 'Abbrechen',
  'button.save': 'Speichern',
  'button.edit': 'Bearbeiten',
  'button.delete': 'Löschen',
  'button.view': 'Anzeigen',
  'button.details': 'Details',
  
  // Statuts
  'status.active': 'Aktiv',
  'status.paused': 'Pausiert',
  'status.completed': 'Abgeschlossen',
  'status.failed': 'Fehlgeschlagen',
  'status.success': 'Erfolgreich',
  
  // Général
  'general.loading': 'Lädt...',
  'general.search': 'Suchen',
  'general.filter': 'Filter',
  'general.all': 'Alle',
  'general.cost': 'Kosten',
  'general.total': 'Gesamt',
  'general.date': 'Datum',
  'general.duration': 'Dauer',
  'general.holders': 'Inhaber',
  
  // Landing
  'landing.title': 'Automatisieren Sie Ihre Snapshots & Airdrops auf Ultra',
  'landing.subtitle': 'Zeit sparen, Community aktivieren',
  'landing.description': 'Sparen Sie Zeit, aktivieren Sie Ihre Community und verwalten Sie Ihre Token-Inhaber mühelos mit unserer fortschrittlichen Automatisierungsplattform.',
  'landing.hero.title.part1': 'Automatisieren Sie Ihre',
  'landing.hero.title.part2': 'Snapshots & Airdrops',
  'landing.hero.title.part3': 'auf Ultra',
  'landing.hero.subtitle': 'Sparen Sie Zeit, aktivieren Sie Ihre Community und verwalten Sie Ihre Token-Inhaber mühelos mit unserer fortschrittlichen Automatisierungsplattform.',
  'landing.connectWallet': 'Ultra Wallet verbinden',
  'landing.connecting': 'Verbinde...',
  'landing.tryDemo': 'Demo testen',
  'landing.goToDashboard': 'Zum Dashboard',
  'landing.createSnapshot': 'Snapshot erstellen',
  'landing.badge': 'Betrieben von Ultra Blockchain',
  'landing.connectShort': 'Verbinden',
  'landing.demoShort': 'Demo',
  
  // Landing Features
  'landing.features.automation': 'Sofortige Automatisierung',
  'landing.features.security': 'Sicher & Zuverlässig',
  'landing.features.usability': 'Einfach zu verwenden',
  
  // Landing Stats
  'landing.stats.snapshots': 'Erstellte Snapshots',
  'landing.stats.tokens': 'Verteilte Tokens',
  'landing.stats.uptime': 'Betriebszeit',
  
  // Landing Floating Cards
  'landing.floatingCards.live': 'Live Snapshots',
  'landing.floatingCards.auto': 'Auto Airdrops',
  
  // Landing CTA
  'landing.cta.badge': 'Bereit loszulegen?',
  'landing.cta.title': 'Treten Sie der Zukunft der Token-Verteilung bei',
  'landing.cta.description': 'Beginnen Sie heute mit der Automatisierung Ihrer Snapshots und Airdrops. Schließen Sie sich Tausenden von Erstellern an, die UT-Snapshot für ihre Token-Verteilungsanforderungen vertrauen.',
  'landing.cta.startFree': 'Heute kostenlos starten',
  'landing.cta.startShort': 'Kostenlos starten',
  'landing.cta.viewDemo': 'Demo ansehen',
  'landing.cta.trusted': 'Vertraut von Erstellern weltweit',
  
  // Landing CTA Benefits
  'landing.cta.benefits.speed': 'Blitzschnelle Einrichtung',
  'landing.cta.benefits.security': 'Unternehmenssicherheit',
  'landing.cta.benefits.support': '24/7 Support',
  'landing.cta.benefits.pricing': 'Keine versteckten Gebühren',
  
  // Landing CTA Stats
  'landing.cta.stats.users': 'Aktive Benutzer',
  'landing.cta.stats.tokens': 'Verteilte Tokens',
  'landing.cta.stats.uptime': 'Betriebszeit',
  'landing.cta.stats.support': 'Support',
  
  // Landing Key Features
  'landing.features.badge': 'Hauptmerkmale',
  'landing.features.title': 'Leistungsstarke Funktionen für moderne Ersteller',
  'landing.features.subtitle': 'Alles was Sie brauchen, um Ihre Token-Verteilungen effizient und sicher auf der Ultra-Blockchain zu verwalten.',
  
  // Landing Key Features - Security
  'landing.features.security.title': 'Unternehmenssicherheit',
  'landing.features.security.description': 'Bankenklasse Sicherheit mit mehrschichtiger Verschlüsselung und sicherer Wallet-Integration.',
  'landing.features.security.detail1': 'Ende-zu-Ende-Verschlüsselung',
  'landing.features.security.detail2': 'Sichere Wallet-Verbindung',
  'landing.features.security.detail3': 'Audit-Trail',
  
  // Landing Key Features - Speed
  'landing.features.speed.title': 'Blitzschnell',
  'landing.features.speed.description': 'Verarbeiten Sie Tausende von Snapshots und Airdrops in Sekunden mit unserer optimierten Infrastruktur.',
  'landing.features.speed.detail1': 'Hochleistungsverarbeitung',
  'landing.features.speed.detail2': 'Echtzeitausführung',
  'landing.features.speed.detail3': 'Sofortige Benachrichtigungen',
  
  // Landing Key Features - Automation
  'landing.features.automation.title': 'Intelligente Automatisierung',
  'landing.features.automation.description': 'Einstellen und vergessen. Unser intelligentes System übernimmt alles automatisch.',
  'landing.features.automation.detail1': 'Geplante Ausführung',
  'landing.features.automation.detail2': 'Intelligente Bedingungen',
  'landing.features.automation.detail3': 'Auto-Retry-Logik',
  
  // Landing Key Features - Analytics
  'landing.features.analytics.title': 'Erweiterte Analytics',
  'landing.features.analytics.description': 'Umfassende Einblicke und detaillierte Berichte für alle Ihre Snapshot-Aktivitäten.',
  'landing.features.analytics.detail1': 'Echtzeit-Dashboards',
  'landing.features.analytics.detail2': 'Export-Funktionen',
  'landing.features.analytics.detail3': 'Historische Daten',
  
  // Landing Key Features - Community
  'landing.features.community.title': 'Community-Fokus',
  'landing.features.community.description': 'Entwickelt für Ersteller und Communities mit intuitiven Tools und nahtloser Erfahrung.',
  'landing.features.community.detail1': 'Benutzerfreundliche Oberfläche',
  'landing.features.community.detail2': 'Community-Tools',
  'landing.features.community.detail3': '24/7 Support',
  
  // Landing Key Features - Integration
  'landing.features.integration.title': 'Ultra-Integration',
  'landing.features.integration.description': 'Native Integration mit Ultra-Blockchain für nahtloses Token-Management.',
  'landing.features.integration.detail1': 'Native Ultra-Unterstützung',
  'landing.features.integration.detail2': 'Multi-Token-Handling',
  'landing.features.integration.detail3': 'Cross-Chain bereit',
  
  // Landing Key Features Stats
  'landing.features.stats.uptime': 'Betriebszeit',
  'landing.features.stats.snapshots': 'Snapshots',
  'landing.features.stats.tokens': 'Verteilte Tokens',
  'landing.features.stats.support': 'Support',
  
  // Landing How It Works
  'landing.howItWorks.badge': 'So funktioniert es',
  'landing.howItWorks.title': 'Einfache Schritte zur Automatisierung von allem',
  'landing.howItWorks.subtitle': 'Beginnen Sie mit UT-Snapshot in nur drei einfachen Schritten. Keine komplexe Einrichtung, keine technischen Kenntnisse erforderlich.',
  'landing.howItWorks.cta': 'Jetzt loslegen',
  
  // Landing How It Works - Connect
  'landing.howItWorks.connect.title': 'Verbinden',
  'landing.howItWorks.connect.description': 'Verbinden Sie Ihr Ultra-Wallet und greifen Sie mit einem Klick auf Ihren Factory Manager-Bereich zu.',
  'landing.howItWorks.connect.detail1': 'Sichere Wallet-Integration',
  'landing.howItWorks.connect.detail2': 'Sofortiger Zugang',
  'landing.howItWorks.connect.detail3': 'Keine Einrichtung erforderlich',
  
  // Landing How It Works - Configure
  'landing.howItWorks.configure.title': 'Konfigurieren',
  'landing.howItWorks.configure.description': 'Richten Sie Ihre Snapshot-Parameter und Airdrop-Bedingungen mit unserer intuitiven Oberfläche ein.',
  'landing.howItWorks.configure.detail1': 'Benutzerdefinierte Parameter',
  'landing.howItWorks.configure.detail2': 'Intelligente Bedingungen',
  'landing.howItWorks.configure.detail3': 'Echtzeit-Vorschau',
  
  // Landing How It Works - Automate
  'landing.howItWorks.automate.title': 'Automatisieren',
  'landing.howItWorks.automate.description': 'Starten Sie Ihre Jobs und lassen Sie UT-Snapshot Ihre Snapshots und Airdrops automatisch verwalten.',
  'landing.howItWorks.automate.detail1': 'Automatisierte Ausführung',
  'landing.howItWorks.automate.detail2': 'Echtzeit-Überwachung',
  'landing.howItWorks.automate.detail3': 'Sofortige Benachrichtigungen',
  
  // Snapshots
  'snapshots.title': 'Snapshot-Jobs',
  'snapshots.subtitle': 'Erstellen und verwalten Sie Ihre automatisierten Snapshots',
  'snapshots.create': 'Snapshot erstellen',
  'snapshots.empty.title': 'Keine Snapshots erstellt',
  'snapshots.empty.description': 'Beginnen Sie mit der Erstellung Ihres ersten automatisierten Snapshots',
  'snapshots.stats.total': 'Gesamt',
  'snapshots.stats.running': 'Laufend',
  'snapshots.stats.completed': 'Abgeschlossen',
  'snapshots.stats.scheduled': 'Geplant',
  'snapshots.filter.all': 'Alle',
  'snapshots.filter.completed': 'Abgeschlossen',
  'snapshots.filter.running': 'Laufend',
  'snapshots.filter.failed': 'Fehlgeschlagen',
  'snapshots.filter.scheduled': 'Geplant',
  'snapshots.duplicate': 'Duplizieren',
  'snapshots.download': 'Herunterladen',
  'snapshots.view': 'Anzeigen',
  'snapshots.holders': 'Inhaber',
  'snapshots.downloads': 'Downloads',
  'snapshots.pagination.previous': 'Vorherige',
  'snapshots.pagination.next': 'Nächste',
  'snapshots.pagination.showing': 'Zeige',
  'snapshots.pagination.of': 'von',
  'snapshots.modal.title.create': 'Snapshot erstellen',
  'snapshots.modal.title.duplicate': 'Snapshot duplizieren',
  'snapshots.modal.step.config': 'Grundkonfiguration',
  'snapshots.modal.step.planning': 'Erweiterte Planung',
  'snapshots.modal.step.review': 'Überprüfung und Validierung',
  'snapshots.modal.name': 'Snapshot-Name',
  'snapshots.modal.description': 'Beschreiben Sie das Ziel dieses Snapshots, Auswahlkriterien, angewandte Filter und seine beabsichtigte Verwendung, um Ihre Strategie zu optimieren...',
  'snapshots.modal.collection': 'Ultra-Sammlung oder Vertrag',
  'snapshots.modal.date': 'Geplantes Datum',
  'snapshots.modal.time': 'Ausführungszeit',
  'snapshots.modal.conditions': 'Erweiterte Kriterien und Bedingungen',
  'snapshots.modal.export': 'Exportformat',
  'snapshots.modal.summary': 'Konfigurationsübersicht',
  'snapshots.modal.button.previous': 'Vorheriger Schritt',
  'snapshots.modal.button.next': 'Nächster Schritt',
  'snapshots.modal.button.cancel': 'Abbrechen',
  'snapshots.modal.button.draft': 'Als Entwurf speichern',
  'snapshots.modal.button.create': 'Snapshot erstellen',
  
  // Analytics
  'analytics.title': 'Analytics',
  'analytics.subtitle': 'Analysieren Sie die Leistung Ihrer Snapshots und Airdrops',
  'analytics.overview.title': 'Übersicht',
  'analytics.overview.snapshots': 'Erstellte Snapshots',
  'analytics.overview.executions': 'Ausführungen',
  'analytics.overview.downloads': 'Downloads',
  'analytics.overview.successRate': 'Erfolgsrate',
  'analytics.overview.averageTime': 'Durchschnittszeit',
  'analytics.overview.costs': 'Gesamtkosten',
  'analytics.charts.snapshots.title': 'Snapshots-Entwicklung',
  'analytics.charts.executions.title': 'Ausführungen-Entwicklung',
  'analytics.status.title': 'Snapshot-Status',
  'analytics.status.completed': 'Abgeschlossen',
  'analytics.status.running': 'Laufend',
  'analytics.status.scheduled': 'Geplant',
  'analytics.status.failed': 'Fehlgeschlagen',
  'analytics.timeRange.7d': '7 Tage',
  'analytics.timeRange.30d': '30 Tage',
  'analytics.timeRange.90d': '90 Tage',
  'analytics.timeRange.1y': '1 Jahr',
  'analytics.insights.title': 'Schnelle Einblicke',
  'analytics.insights.activeSnapshots': 'Erstellte Snapshots',
  'analytics.insights.successRate': 'Erfolgsrate',
  'analytics.insights.performance.title': 'Leistungsmetriken',
  'analytics.insights.performance.downloads': 'Downloads',
  'analytics.insights.performance.costs': 'Gesamtkosten',
  
  // FAQ
  'faq.title': 'Häufig gestellte Fragen',
  'faq.subtitle': 'Finden Sie schnelle Antworten auf Ihre Fragen zu UT-Snapshot',
  'faq.search.placeholder': 'In häufig gestellten Fragen suchen...',
  'faq.stats.questions': 'Fragen',
  'faq.stats.categories': 'Kategorien',
  'faq.stats.satisfaction': 'Zufriedenheit',
  'faq.category.general': 'Allgemein',
  'faq.category.usage': 'Verwendung',
  'faq.category.pricing': 'Preise',
  'faq.category.automation': 'Automatisierung',
  'faq.category.support': 'Support',
  'faq.category.security': 'Sicherheit',
  'faq.category.api': 'API',
  'faq.contact.title': 'Benötigen Sie Hilfe?',
  'faq.contact.subtitle': 'Unser Team ist da, um Ihnen zu helfen',
  'faq.contact.chat': 'Live-Chat',
  'faq.contact.email': 'E-Mail senden',
  'faq.contact.phone': 'Anruf'
}

export default de 