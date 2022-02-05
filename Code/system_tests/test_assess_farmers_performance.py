import re

import pytest

from assess_farmers_performance import open_farmers_view, open_farmers_summary, select_note, NOTE_SAVED, \
    open_change_note_form, submit_form, select_problem_type, click_on_save_changes_button, \
    get_invalid_problem_type_alert, search_for_farmer
from constants.endpoints import URL, FARMERS_ALL, FARMER_SUMMARY_REGEX
from constants.labels import FIELD_IS_REQUIRED_WARNING
from helpers.general import wait_for_view_change
import test_log_in as tli
from models.Note import Note
from models.ProblemType import ProblemType
from scenarios.log_out import log_out


@pytest.fixture(autouse=True, scope='module')
def setup_module(driver):
    tli.test_log_in_policy_maker(driver)
    yield
    driver.get(URL)
    log_out(driver)


@pytest.fixture(autouse=True, scope='function')
def open_dashboard(driver):
    driver.get(URL)
    yield


def test_open_farmers_view(driver):
    open_farmers_view(driver)

    wait_for_view_change(driver, FARMERS_ALL)
    assert driver.current_url == FARMERS_ALL


def test_open_farmers_summary(driver, p_farmer=None):
    test_open_farmers_view(driver)
    if p_farmer is not None:
        search_for_farmer(driver, p_farmer)

    open_farmers_summary(driver)

    wait_for_view_change(driver, FARMER_SUMMARY_REGEX)
    assert re.match(FARMER_SUMMARY_REGEX, driver.current_url)


def test_give_positive_note(driver, p_farmer=None):
    test_open_farmers_summary(driver, p_farmer)

    open_change_note_form(driver)
    select_note(driver, Note.POSITIVE)

    notification = submit_form(driver)
    assert notification.text == NOTE_SAVED


def test_give_neutral_note(driver, p_farmer=None):
    test_open_farmers_summary(driver, p_farmer)

    open_change_note_form(driver)
    select_note(driver, Note.NEUTRAL)

    notification = submit_form(driver)
    assert notification.text == NOTE_SAVED


def test_give_negative_note(driver, p_farmer=None):
    test_open_farmers_summary(driver, p_farmer)

    open_change_note_form(driver)
    select_note(driver, Note.NEGATIVE)
    select_problem_type(driver, ProblemType.WEATHER)

    notification = submit_form(driver)
    assert notification.text == NOTE_SAVED


def test_give_negative_note_no_problem_type_with_error(driver):
    test_open_farmers_summary(driver)

    open_change_note_form(driver)
    select_note(driver, Note.NEGATIVE)

    click_on_save_changes_button(driver)

    notification = get_invalid_problem_type_alert(driver)
    assert notification.text == FIELD_IS_REQUIRED_WARNING
