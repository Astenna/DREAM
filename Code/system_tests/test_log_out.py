from constants.paths import DASHBOARD
from helpers.general import wait_for_view_change
from helpers.log_out import log_out
from models.Farmer import Farmer
from models.PolicyMaker import PolicyMaker
from test_log_in import test_log_in_farmer, test_log_in_policy_maker


def test_log_out_policy_maker(driver):
    policy_maker = PolicyMaker(idx=4)
    test_log_in_policy_maker(driver, policy_maker)

    log_out(driver)

    wait_for_view_change(driver, DASHBOARD)
    assert driver.current_url == DASHBOARD


def test_log_out_farmer(driver):
    farmer = Farmer(idx=4)
    test_log_in_farmer(driver, farmer)

    log_out(driver)

    wait_for_view_change(driver, DASHBOARD)
    assert driver.current_url == DASHBOARD
