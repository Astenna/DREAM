import pytest

from constants.labels import SUMMARY_LABEL, TIPS_AND_SUGGESTIONS_LABEL, RECENT_PRODUCTION_DATA_LABEL, \
    MY_HELP_REQUESTS_LABEL, FARMERS_WITH_POSITIVE_NOTE_LABEL, FARMERS_WITH_NEGATIVE_NOTE_LABEL
import test_log_in as tli
from helpers.seed_db import seed_farmer, seed_policy_maker
from scenarios.log_out import log_out
from scenarios.open_user_dashboard import get_summary_component, get_tips_and_suggestions_component, \
    get_recent_production_data_component, get_my_help_requests_component, get_farmers_with_positive_note, \
    get_farmers_with_negative_note


@pytest.fixture(autouse=True, scope='function')
def f_log_out(driver):
    yield
    log_out(driver)


def test_open_dashboard_policy_maker(driver):
    policy_maker = seed_policy_maker
    tli.test_log_in_policy_maker(driver, policy_maker)

    assert get_farmers_with_positive_note(driver).text == FARMERS_WITH_POSITIVE_NOTE_LABEL
    assert get_farmers_with_negative_note(driver).text == FARMERS_WITH_NEGATIVE_NOTE_LABEL


def test_open_dashboard_farmer(driver):
    tli.test_log_in_farmer(driver, seed_farmer)

    assert get_summary_component(driver).text == SUMMARY_LABEL
    assert get_tips_and_suggestions_component(driver).text == TIPS_AND_SUGGESTIONS_LABEL
    assert get_recent_production_data_component(driver).text == RECENT_PRODUCTION_DATA_LABEL
    assert get_my_help_requests_component(driver).text == MY_HELP_REQUESTS_LABEL
