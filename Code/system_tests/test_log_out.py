from constants.paths import URL
from helpers.general import wait_for_view_change
from helpers.log_out import log_out
import test_log_in as tli


def test_log_out_policy_maker(driver):
    tli.test_log_in_policy_maker(driver)

    log_out(driver)

    wait_for_view_change(driver, URL)
    assert driver.current_url == URL


def test_log_out_farmer(driver):
    tli.test_log_in_farmer(driver)

    log_out(driver)

    wait_for_view_change(driver, URL)
    assert driver.current_url == URL
