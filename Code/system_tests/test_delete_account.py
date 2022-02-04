from constants.endpoints import URL
from helpers.general import wait_for_view_change
import test_open_user_summary as tus
from scenarios.delete_account import delete_account


def test_delete_account_policy_maker(driver):
    tus.test_open_summary_policy_maker(driver)

    delete_account(driver)

    # TODO: Assert view change
    # wait_for_view_change(driver, URL)
    # assert driver.current_url == URL


def test_delete_account_farmer(driver):
    tus.test_open_summary_farmer(driver)

    delete_account(driver)

    # wait_for_view_change(driver, URL)
    # assert driver.current_url == URL
