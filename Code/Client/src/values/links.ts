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
    URL: "/summary",
    BREADCRUMB: strings.SIDEBAR.SUMMARY
  },
  PRODUCTION_DATA: {
    URL: "/production_data",
    BREADCRUMB: strings.SIDEBAR.PRODUCTION_DATA
  },
  MY_HELP_REQUESTS: {
    URL: "/my-help-requests",
    BREADCRUMB: strings.SIDEBAR.MY_HELP_REQUESTS
  },
  MY_HELP_REQUESTS_DETAIL: {
    URL: "/my-help-requests/:id",
  },
  PROVIDE_HELP: {
    URL: "/provide-help",
    BREADCRUMB: strings.SIDEBAR.PROVIDE_HELP
  },
  PROVIDE_HELP_DETAIL: {
    URL: "/provide-help/:id",
    BREADCRUMB: strings.SIDEBAR.PROVIDE_HELP
  },
  FORUM: {
    URL: "/forum",
    BREADCRUMB: strings.SIDEBAR.FORUM
  },
  FORUM_DETAIL: {
    URL: "/forum/:id",
    BREADCRUMB: strings.SIDEBAR.FORUM
  },
  FARMERS: {
    URL: "/farmers/:type",
    BREADCRUMB: strings.SIDEBAR.FARMERS,
    TYPE: {
      ALL: "/farmers/all",
      POSITIVE: "/farmers/positive",
      NEGATIVE: "/farmers/negative",
    }
  },
  FARMERS_FARMER: {
    URL: "/farmers/farmer",
    PARAM: "/farmers/farmer/:id"
  },
  ROOT: {
    URL: "/",
  }
};
export default links