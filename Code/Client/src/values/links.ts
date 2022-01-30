/**
 * Links used in application.
 * TODO: not finished
 */
import strings from './strings';

const links = {
  NO_AUTHORIZED_403: {
    URL: "/403",
  },
  NOT_FOUND_404: {
    URL: "/404",
  },
  SERVER_ERROR_500: {
    URL: "/500",
  },
  DASHBOARD: {
    URL: "/dashboard",
    BREADCRUMB: strings.DASHBOARD
  },
  SUMMARY: {
    URL: "/dashboard/summary",
    BREADCRUMB: strings.SIDEBAR.SUMMARY
  },
  PRODUCTION_DATA: {
    URL: "/dashboard/production_data",
    BREADCRUMB: strings.SIDEBAR.PRODUCTION_DATA
  },
  MY_HELP_REQUESTS: {
    URL: "/dashboard/my_help_requests",
    BREADCRUMB: strings.SIDEBAR.MY_HELP_REQUESTS
  },
  PROVIDE_HELP: {
    URL: "/dashboard/provide_help",
    BREADCRUMB: strings.SIDEBAR.PROVIDE_HELP
  },
  FORUM: {
    URL: "/dashboard/forum",
    BREADCRUMB: strings.SIDEBAR.FORUM
  },
  FARMERS: {
    URL: "/dashboard/farmers",
    BREADCRUMB: strings.SIDEBAR.FARMERS
  },
  ROOT: {
    URL: "/",
  }
}
export default links