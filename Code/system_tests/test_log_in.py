import pytest

from constants.endpoints import DASHBOARD
from constants.labels import FIELD_IS_REQUIRED_WARNING, INVALID_EMAIL
from helpers.general import FAILURE, wait_for_view_change, wait_for_pop_up_to_appear
from scenarios.log_in import fill_in_email_and_password, open_log_in_dialog, log_in, get_invalid_email_alert, \
    get_invalid_password_alert, user_does_not_exist_message
from helpers.seed_db import seed_policy_maker, seed_farmer
from models.User import User
from scenarios.log_out import log_out


@pytest.fixture(scope='function')
def f_log_out(driver):
    yield
    log_out(driver)


@pytest.mark.usefixtures('f_log_out')
def test_log_in_policy_maker(driver, p_policy_maker=None):
    policy_maker = seed_policy_maker if p_policy_maker is None else p_policy_maker

    open_log_in_dialog(driver)
    fill_in_email_and_password(driver, policy_maker.email, policy_maker.password)
    log_in(driver)

    wait_for_view_change(driver, DASHBOARD)
    assert driver.current_url == DASHBOARD


@pytest.mark.usefixtures('f_log_out')
def test_log_in_farmer(driver, p_farmer=None):
    farmer = seed_farmer if p_farmer is None else p_farmer

    open_log_in_dialog(driver)
    fill_in_email_and_password(driver, farmer.email, farmer.password)
    log_in(driver)

    wait_for_view_change(driver, DASHBOARD)
    assert driver.current_url == DASHBOARD


def test_log_in_unregistered_user_with_error(driver):
    unregistered_user = User(
        name='Unreg',
        surname='Unreg',
        email='unregistered@mail.com',
        password='unreg123',
        role=None
    )

    open_log_in_dialog(driver)
    fill_in_email_and_password(driver,
                               unregistered_user.email,
                               unregistered_user.password)
    log_in(driver)

    notification = wait_for_pop_up_to_appear(driver)
    assert notification.text == user_does_not_exist_message(unregistered_user.email)


def test_log_in_no_data_with_error(driver):
    open_log_in_dialog(driver)

    fill_in_email_and_password(driver, '', '')

    log_in(driver)

    assert get_invalid_email_alert(driver).text == INVALID_EMAIL
    assert get_invalid_password_alert(driver).text == FIELD_IS_REQUIRED_WARNING
