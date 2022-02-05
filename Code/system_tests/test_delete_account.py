from constants.endpoints import URL
from helpers.general import wait_for_view_change
import test_open_user_summary as tus
import test_create_account as tca
from models.Farmer import Farmer
from models.PolicyMaker import PolicyMaker
from scenarios.delete_account import delete_account, open_delete_account_form, fill_in_delete_account_form, SUCCESS


def test_delete_account_policy_maker(driver):
    policy_maker = PolicyMaker(idx=500)
    tca.test_create_policy_maker_account(driver, policy_maker)
    tus.test_open_summary_policy_maker(driver, policy_maker)

    open_delete_account_form(driver)
    fill_in_delete_account_form(driver, policy_maker)

    notification = delete_account(driver)
    assert notification.text == SUCCESS

    wait_for_view_change(driver, URL)
    assert driver.current_url == URL


def test_delete_account_farmer(driver):
    farmer = Farmer(idx=500)
    tca.test_create_farmer_account(driver, farmer)
    tus.test_open_summary_farmer(driver, farmer)

    open_delete_account_form(driver)
    fill_in_delete_account_form(driver, farmer)

    notification = delete_account(driver)
    assert notification.text == SUCCESS

    wait_for_view_change(driver, URL)
    assert driver.current_url == URL
