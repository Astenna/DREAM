import pytest

from constants.endpoints import SUMMARY
from constants.labels import WEATHER_FORECAST_LABEL, SOIL_HUMIDITY_LABEL, WATER_USAGE_LABEL
from helpers.general import wait_for_view_change
import test_log_in as tli
from helpers.seed_db import seed_farmer, seed_policy_maker
from scenarios.log_out import log_out
from scenarios.open_user_summary import open_summary, get_weather_forecast_component, get_soil_humidity_component, \
    get_water_usage_component


@pytest.fixture(autouse=True, scope='function')
def f_log_out(driver):
    yield
    log_out(driver)


def test_open_summary_policy_maker(driver, p_policy_maker=None):
    policy_maker = seed_policy_maker if p_policy_maker is None else p_policy_maker
    tli.test_log_in_policy_maker(driver, policy_maker)

    open_summary(driver)

    wait_for_view_change(driver, SUMMARY)
    assert driver.current_url == SUMMARY


def test_open_summary_farmer(driver, p_farmer=None):
    farmer = seed_farmer if p_farmer is None else p_farmer
    tli.test_log_in_farmer(driver, farmer)

    open_summary(driver)

    wait_for_view_change(driver, SUMMARY)
    assert driver.current_url == SUMMARY

    assert get_soil_humidity_component(driver).text == SOIL_HUMIDITY_LABEL
    assert get_weather_forecast_component(driver).text == WEATHER_FORECAST_LABEL
    assert get_water_usage_component(driver).text == WATER_USAGE_LABEL
