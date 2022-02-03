from constants.endpoints import DASHBOARD
from helpers.general import FAILURE, wait_for_view_change, wait_for_pop_up_to_appear
from scenarios.log_in import fill_in_email_and_password, open_log_in_dialog, log_in, get_invalid_email_alert, \
    INVALID_EMAIL, get_invalid_password_alert, INVALID_PASSWORD
from helpers.seed_db import seed_policy_maker, seed_farmer
from models.User import User


def test_log_in_policy_maker(driver):
    open_log_in_dialog(driver)
    fill_in_email_and_password(
        driver, seed_policy_maker.email, seed_policy_maker.password)
    log_in(driver)

    wait_for_view_change(driver, DASHBOARD)
    assert driver.current_url == DASHBOARD


def test_log_in_farmer(driver):
    open_log_in_dialog(driver)
    fill_in_email_and_password(driver, seed_farmer.email, seed_farmer.password)
    log_in(driver)

    wait_for_view_change(driver, DASHBOARD)
    assert driver.current_url == DASHBOARD


def test_log_in_unregistered_user(driver):
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
    assert notification.text == FAILURE


def test_log_in_no_data(driver):
    open_log_in_dialog(driver)

    fill_in_email_and_password(driver, '', '')

    log_in(driver)

    assert get_invalid_email_alert(driver).text == INVALID_EMAIL
    assert get_invalid_password_alert(driver).text == INVALID_PASSWORD
