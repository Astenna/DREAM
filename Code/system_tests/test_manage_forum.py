import re

import pytest

import test_log_in as tli

from constants.endpoints import URL, FORUM, FORUM_THREAD_REGEX
from constants.labels import FIELD_IS_REQUIRED_WARNING
from helpers.general import wait_for_view_change
from models.ForumThread import ForumThread
from scenarios.log_out import log_out
from scenarios.manage_forum import open_forum_view, open_create_forum_thread_form, fill_in_create_forum_thread_form, \
    submit_form, get_invalid_topic_alert, get_invalid_description_alert, open_forum_thread, fill_in_comment, \
    submit_comment, verify_latest_comment, get_invalid_advice_alert, delete_forum_comment


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


def test_open_forum_view(driver):
    open_forum_view(driver)

    wait_for_view_change(driver, FORUM)
    assert driver.current_url == FORUM


def test_create_forum_thread(driver):
    test_open_forum_view(driver)
    forum_thread = ForumThread()

    open_create_forum_thread_form(driver)
    fill_in_create_forum_thread_form(driver, forum_thread)

    submit_form(driver)


def test_create_forum_thread_no_data_with_error(driver):
    test_open_forum_view(driver)
    forum_thread = ForumThread(topic='', description='')

    open_create_forum_thread_form(driver)
    fill_in_create_forum_thread_form(driver, forum_thread)

    submit_form(driver)

    assert get_invalid_topic_alert(driver).text == FIELD_IS_REQUIRED_WARNING
    assert get_invalid_description_alert(driver).text == FIELD_IS_REQUIRED_WARNING


def test_view_forum_thread(driver):
    test_create_forum_thread(driver)
    test_open_forum_view(driver)

    open_forum_thread(driver)

    wait_for_view_change(driver, FORUM_THREAD_REGEX)
    assert re.match(FORUM_THREAD_REGEX, driver.current_url)


def test_add_comment_to_forum_thread(driver):
    test_view_forum_thread(driver)

    comment = 'This is my advice.'
    fill_in_comment(driver, comment)

    submit_comment(driver)
    verify_latest_comment(driver, comment)


def test_add_comment_to_forum_thread_no_comment_with_error(driver):
    test_view_forum_thread(driver)

    comment = ''
    fill_in_comment(driver, comment)

    submit_comment(driver)
    assert get_invalid_advice_alert(driver).text == FIELD_IS_REQUIRED_WARNING


def test_delete_forum_comment(driver):
    test_add_comment_to_forum_thread(driver)

    delete_forum_comment(driver)
