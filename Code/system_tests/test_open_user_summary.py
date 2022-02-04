from constants.endpoints import SUMMARY
from constants.labels import WEATHER_FORECAST_LABEL, SOIL_HUMIDITY_LABEL, WATER_USAGE_LABEL
from helpers.general import wait_for_view_change
import test_log_in as tli
from scenarios.open_user_summary import open_summary, get_weather_forecast_component, get_soil_humidity_component, \
    get_water_usage_component


def test_open_summary_policy_maker(driver):
    tli.test_log_in_policy_maker(driver)

    open_summary(driver)

    wait_for_view_change(driver, SUMMARY)
    assert driver.current_url == SUMMARY


def test_open_summary_farmer(driver):
    tli.test_log_in_farmer(driver)

    open_summary(driver)

    wait_for_view_change(driver, SUMMARY)
    assert driver.current_url == SUMMARY

    assert get_soil_humidity_component(driver).text == SOIL_HUMIDITY_LABEL
    assert get_weather_forecast_component(driver).text == WEATHER_FORECAST_LABEL
    assert get_water_usage_component(driver).text == WATER_USAGE_LABEL
