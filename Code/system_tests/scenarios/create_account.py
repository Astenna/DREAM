from selenium.webdriver.common.by import By

from constants.endpoints import URL
from helpers.general import wait_and_fill_in_fields, wait_for_pop_up_to_appear
from models.Role import Role


def click_on_create_account_button(driver):
    create_account_button = driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/main/div/div/div[4]/div/button/span'
    )
    create_account_button.click()


def open_registration_form(driver):
    driver.get(URL)
    click_on_create_account_button(driver)


def fill_in_common_fields(driver, user):
    wait_and_fill_in_fields(
        driver,
        {
            'register_name': user.name,
            'register_surname': user.surname,
            'register_email': user.email,
            'register_password': user.password,
            'register_confirm': user.password,
        }
    )


def select_role(driver, role):
    role_field = driver.find_element(By.ID, 'register_role')
    role_field.click()

    if role == Role.FARMER:
        element = driver.find_element(
            By.XPATH,
            '(.//*[normalize-space(text()) and normalize-space(.)="policy_maker"])[1]/following::div[6]'
        )
    else:
        element = driver.find_element(
            By.XPATH, '(.//*[normalize-space(text()) and normalize-space(.)="Farmer"])[1]/following::div[2]'
        )

    element.click()


def fill_in_farmer_specific_fields(driver, farmer):
    wait_and_fill_in_fields(
        driver,
        {
            'register_sensorSystemId': farmer.farm.sensor_system_id,
            'register_waterIrrigationSystemId': farmer.farm.water_irrigation_system_id,
            'register_farmAddressLine1': farmer.farm.address_line1,
            'register_farmAddressLine2': farmer.farm.address_line2,
            'register_farmCity': farmer.farm.city,
            'register_farmPostalCode': farmer.farm.postal_code,
            'register_mandal': farmer.farm.mandal
        }
    )


def submit_form(driver):
    submit_button = driver.find_element(
        By.XPATH,
        '(.//*[normalize-space(text()) and normalize-space(.)="Cancel"])[1]/following::span[1]'
    )
    submit_button.click()

    return wait_for_pop_up_to_appear(driver)
