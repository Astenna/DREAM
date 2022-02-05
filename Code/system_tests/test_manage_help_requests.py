import pytest

from constants.endpoints import MY_HELP_REQUESTS, MY_HELP_REQUEST, URL
from constants.labels import FIELD_IS_REQUIRED_WARNING
from helpers.general import wait_for_view_change
import test_log_in as tli
from models.HelpRequest import HelpRequest
from scenarios.log_out import log_out
from scenarios.manage_help_requests import open_my_help_requests_view, open_create_help_request_form, \
    fill_in_create_help_request_form, submit_form, get_invalid_topic_alert, get_invalid_description_alert, \
    open_my_help_request, fill_in_response, submit_response


@pytest.fixture(autouse=True, scope='module')
def setup_module(driver):
    tli.test_log_in_farmer(driver)
    yield
    driver.get(URL)
    log_out(driver)


@pytest.fixture(autouse=True, scope='function')
def open_dashboard(driver):
    driver.get(URL)
    yield


def test_open_my_help_requests_view(driver):
    open_my_help_requests_view(driver)

    wait_for_view_change(driver, MY_HELP_REQUESTS)
    assert driver.current_url == MY_HELP_REQUESTS


def test_create_help_request(driver):
    test_open_my_help_requests_view(driver)
    help_request = HelpRequest()

    open_create_help_request_form(driver)
    fill_in_create_help_request_form(driver, help_request)

    notification = submit_form(driver)

    # TODO: Add assert after notification is implemented


def test_create_help_request_no_data_with_error(driver):
    test_open_my_help_requests_view(driver)
    help_request = HelpRequest(topic='', description='')

    open_create_help_request_form(driver)
    fill_in_create_help_request_form(driver, help_request)

    submit_form(driver)

    # TODO: Uncomment when OK button functionality is implemented
    # assert get_invalid_topic_alert(driver).text == FIELD_IS_REQUIRED_WARNING
    # assert get_invalid_description_alert(driver).text == FIELD_IS_REQUIRED_WARNING


def test_view_my_help_request(driver):
    test_open_my_help_requests_view(driver)

    open_my_help_request(driver)

    wait_for_view_change(driver, MY_HELP_REQUEST)
    assert driver.current_url == MY_HELP_REQUEST


def test_respond_to_my_help_request(driver):
    test_view_my_help_request(driver)

    advice = 'This is my advice.'
    fill_in_response(driver, advice)

    notification = submit_response(driver)
    # TODO: Add assert after notification is implemented
