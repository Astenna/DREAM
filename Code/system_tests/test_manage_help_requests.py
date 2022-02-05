import re

import pytest

from constants.endpoints import MY_HELP_REQUESTS, URL, MY_HELP_REQUEST_REGEX, PROVIDE_HELP, HELP_REQUEST_REGEX
from constants.labels import FIELD_IS_REQUIRED_WARNING
from helpers.general import wait_for_view_change
import test_assess_farmers_performance as tafp
import test_create_account as tca
import test_delete_account as tda
import test_log_in as tli
from helpers.seed_db import seed_farmer
from models.Farm import Farm
from models.Farmer import Farmer
from models.HelpRequest import HelpRequest
from scenarios.log_out import log_out
from scenarios.manage_help_requests import open_my_help_requests_view, open_create_help_request_form, \
    fill_in_create_help_request_form, submit_form, get_invalid_topic_alert, get_invalid_description_alert, \
    open_my_help_request, fill_in_response, submit_response, open_provide_help_view, open_help_request, \
    verify_latest_response


@pytest.fixture(autouse=True, scope='module')
def setup_module(driver):
    negative_farmer = Farmer(
        name='Alan',
        surname='Anders',
        email='alan.anders@mail.com',
        password='test1234',
        farm=Farm(idx=99)
    )
    tca.test_create_farmer_account(driver, negative_farmer)
    tli.test_log_in_policy_maker(driver)
    tafp.test_give_positive_note(driver, seed_farmer)
    driver.get(URL)
    tafp.test_give_negative_note(driver, negative_farmer)
    driver.get(URL)
    log_out(driver)

    tli.test_log_in_farmer(driver)
    yield
    driver.get(URL)
    log_out(driver)
    tda.test_delete_account_farmer(driver, negative_farmer)


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

    submit_form(driver)


def test_create_help_request_no_data_with_error(driver):
    test_open_my_help_requests_view(driver)
    help_request = HelpRequest(topic='', description='')

    open_create_help_request_form(driver)
    fill_in_create_help_request_form(driver, help_request)

    submit_form(driver)

    assert get_invalid_topic_alert(driver).text == FIELD_IS_REQUIRED_WARNING
    assert get_invalid_description_alert(driver).text == FIELD_IS_REQUIRED_WARNING


def test_view_my_help_request(driver):
    test_open_my_help_requests_view(driver)

    open_my_help_request(driver)

    wait_for_view_change(driver, MY_HELP_REQUEST_REGEX)
    assert re.match(MY_HELP_REQUEST_REGEX, driver.current_url)


def test_open_provide_help_view(driver):
    open_provide_help_view(driver)

    wait_for_view_change(driver, PROVIDE_HELP)
    assert driver.current_url == PROVIDE_HELP


def test_view_help_request(driver):
    test_open_provide_help_view(driver)

    open_help_request(driver)
    wait_for_view_change(driver, HELP_REQUEST_REGEX)
    assert re.match(HELP_REQUEST_REGEX, driver.current_url)


def test_respond_to_help_request(driver):
    test_view_help_request(driver)

    advice = 'This is my advice.'
    fill_in_response(driver, advice)

    submit_response(driver)

    verify_latest_response(driver, advice)
