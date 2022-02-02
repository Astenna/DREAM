from constants.paths import DASHBOARD, URL
from helpers.general import FAILURE, wait_for_view_change, wait_for_pop_up_to_appear
from helpers.log_in import fill_in_email_and_password, open_log_in_dialog, log_in, get_invalid_email_alert, \
    INVALID_EMAIL, get_invalid_password_alert, INVALID_PASSWORD
from models.Farmer import Farmer
from models.PolicyMaker import PolicyMaker
from models.User import User
from test_create_account import test_create_policy_maker_account, test_create_farmer_account


def test_log_in_policy_maker(driver, p_policy_maker=None):
    policy_maker = PolicyMaker(idx=3) if p_policy_maker is None else p_policy_maker
    test_create_policy_maker_account(driver, policy_maker)

    open_log_in_dialog(driver)
    fill_in_email_and_password(driver, policy_maker.email, policy_maker.password)
    log_in(driver)

    wait_for_view_change(driver, DASHBOARD)
    assert driver.current_url == DASHBOARD


def test_log_in_farmer(driver, p_farmer=None):
    farmer = Farmer(idx=3) if p_farmer is None else p_farmer
    test_create_farmer_account(driver, farmer)

    open_log_in_dialog(driver)
    fill_in_email_and_password(driver, farmer.email, farmer.password)
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

    driver.get(URL)
    open_log_in_dialog(driver)
    fill_in_email_and_password(driver,
                               unregistered_user.email,
                               unregistered_user.password)
    log_in(driver)

    notification = wait_for_pop_up_to_appear(driver)
    assert notification.text == FAILURE


def test_log_in_no_data(driver):
    driver.get(URL)
    open_log_in_dialog(driver)

    fill_in_email_and_password(driver, '', '')

    log_in(driver)

    assert get_invalid_email_alert(driver).text == INVALID_EMAIL
    assert get_invalid_password_alert(driver).text == INVALID_PASSWORD
