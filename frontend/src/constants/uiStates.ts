/**
 * Centralized UI State Messages – Industrial Brain OS
 * Hierarchically organized by module for zero duplication and seamless future scalability.
 */

export interface StateMessageConfig {
  title: string;
  description: string;
}

export const LOADING_MESSAGES = {
  common: {
    title: "Loading...",
    description: "Please wait while enterprise data is being prepared.",
  },
  dashboard: {
    title: "Loading Dashboard Command...",
    description: "Synchronizing system telemetry and roadmap modules.",
  },
  documents: {
    title: "Loading Documents...",
    description: "Retrieving indexed industrial documentation and OCR metadata.",
  },
  knowledgeGraph: {
    title: "Loading Knowledge Graph...",
    description: "Constructing semantic relationships and industrial ontologies.",
  },
  search: {
    title: "Searching Enterprise Repository...",
    description: "Querying across vector embeddings and relational records.",
  },
  analytics: {
    title: "Loading Telemetry Analytics...",
    description: "Aggregating real-time metrics and historical performance.",
  },
  widgets: {
    title: "Loading Widgets...",
    description: "Fetching live dashboard widget feeds.",
  },
  chat: {
    title: "Connecting AI Copilot...",
    description: "Initializing LLM context and industrial knowledge engines.",
  },
  users: {
    title: "Loading Directory...",
    description: "Fetching enterprise user profiles and RBAC permissions.",
  },
  settings: {
    title: "Loading Configuration...",
    description: "Retrieving system preferences and security policies.",
  },
} as const;

export const EMPTY_MESSAGES = {
  common: {
    title: "No Data Available",
    description: "There are no records to display at this time.",
  },
  dashboard: {
    title: "No Dashboard Modules Active",
    description: "Your enterprise role currently has no assigned dashboard views.",
  },
  documents: {
    title: "No Documents",
    description: "Upload your first industrial document or drawing to initialize indexing.",
  },
  knowledgeGraph: {
    title: "Knowledge Graph Empty",
    description: "Connect data sources or ingest documents to build the industrial ontology.",
  },
  search: {
    title: "No Results Found",
    description: "We couldn't find anything matching your search query. Try adjusting your filters.",
  },
  analytics: {
    title: "No Analytics Recorded",
    description: "Telemetry streams have not yet logged sufficient data for visualization.",
  },
  widgets: {
    title: "No dashboard widgets available yet.",
    description: "Recent documents, activity logs, and AI suggestions will appear here as you interact with the platform.",
  },
  chat: {
    title: "No Active Conversations",
    description: "Start a new query with the AI Copilot to analyze industrial operations.",
  },
  users: {
    title: "No Users Found",
    description: "No team members match the selected role or search criteria.",
  },
  settings: {
    title: "No Custom Settings",
    description: "All system configurations are currently set to enterprise defaults.",
  },
} as const;

export const ERROR_MESSAGES = {
  common: {
    title: "Unable to load data",
    description: "An unexpected error occurred while communicating with enterprise services. Please try again.",
  },
  dashboard: {
    title: "Dashboard Synchronization Failed",
    description: "Could not retrieve command center telemetry. Check your network connection.",
  },
  documents: {
    title: "Document Retrieval Error",
    description: "Failed to fetch document repository files or OCR metadata.",
  },
  knowledgeGraph: {
    title: "Ontology Connection Error",
    description: "Could not query the knowledge graph engine or resolve semantic nodes.",
  },
  search: {
    title: "Search Query Failed",
    description: "The vector search engine encountered an error while processing your request.",
  },
  analytics: {
    title: "Analytics Feed Error",
    description: "Failed to aggregate real-time telemetry metrics.",
  },
  widgets: {
    title: "Widget Loading Failed",
    description: "Could not initialize one or more dashboard widgets.",
  },
  chat: {
    title: "AI Copilot Disconnected",
    description: "Failed to establish a streaming connection with the industrial intelligence engine.",
  },
  users: {
    title: "Directory Error",
    description: "Could not retrieve user management records or RBAC policies.",
  },
  settings: {
    title: "Configuration Error",
    description: "Failed to load enterprise system preferences.",
  },
} as const;

export const NOT_FOUND_MESSAGES = {
  common: {
    title: "404",
    subtitle: "Page Not Found",
    description: "The page or resource you are looking for does not exist, has been removed, or you lack permission to view it.",
  },
  dashboard: {
    title: "404",
    subtitle: "Module Not Found",
    description: "This dashboard module or view does not exist within Industrial Brain OS.",
  },
  documents: {
    title: "404",
    subtitle: "Document Not Found",
    description: "The requested document ID could not be located in the enterprise repository.",
  },
  knowledgeGraph: {
    title: "404",
    subtitle: "Node Not Found",
    description: "The specified ontology entity or graph relationship does not exist.",
  },
  search: {
    title: "404",
    subtitle: "Index Not Found",
    description: "The target search index or collection is unavailable.",
  },
  analytics: {
    title: "404",
    subtitle: "Metric Not Found",
    description: "The requested telemetry dashboard or metric stream does not exist.",
  },
  widgets: {
    title: "404",
    subtitle: "Widget Not Found",
    description: "The specified dashboard widget is not registered.",
  },
} as const;
