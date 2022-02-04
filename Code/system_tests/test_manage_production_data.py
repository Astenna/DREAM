from constants.endpoints import PRODUCTION_DATA
from helpers.general import wait_for_view_change
import test_log_in as tli
from models.ProductionData import ProductionData
from scenarios.manage_production_data import open_production_data_view, open_add_production_data_form, submit_form, \
    fill_in_production_data_form, select_existing_production_data, delete_data


def test_open_production_data_view(driver):
    tli.test_log_in_farmer(driver)

    open_production_data_view(driver)

    wait_for_view_change(driver, PRODUCTION_DATA)
    assert driver.current_url == PRODUCTION_DATA


def test_add_production_data(driver):
    test_open_production_data_view(driver)
    production_data = ProductionData()

    open_add_production_data_form(driver)
    fill_in_production_data_form(driver, production_data)

    notification = submit_form(driver)
    # TODO: Add assert after notification is implemented


def test_add_production_data_no_data_with_error(driver):
    test_open_production_data_view(driver)
    production_data = ProductionData(p_type='', amount='', date='')

    open_add_production_data_form(driver)
    fill_in_production_data_form(driver, production_data)

    notification = submit_form(driver)

    submit_form(driver)

    # TODO: Uncomment when OK button functionality is implemented
    # assert get_invalid_topic_alert(driver).text == FIELD_IS_REQUIRED_WARNING
    # assert get_invalid_description_alert(driver).text == FIELD_IS_REQUIRED_WARNING


def test_edit_production_data(driver):
    test_open_production_data_view(driver)
    production_data = ProductionData()

    open_add_production_data_form(driver)
    fill_in_production_data_form(driver, production_data)

    notification = submit_form(driver)
    # TODO: Add assert after notification is implemented


def test_delete_production_data(driver):
    test_open_production_data_view(driver)

    select_existing_production_data(driver)
    delete_data(driver)

    # TODO: Add assert after functionality is implemented
