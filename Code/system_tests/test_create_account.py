import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait

from constants.paths import URL
from constants.timeout import TIMEOUT
from models.Farm import Farm
from models.Farmer import Farmer
from models.Role import Role
from models.User import User

policy_maker = User(
    name='Steve',
    surname='Jobs',
    email='steve.jobs6@mail.com',
    password='test1234',
    role=Role.POLICY_MAKER
)

farm = Farm(
    sensor_system_id=5,
    water_irrigation_system_id=5,
    address_line1='JWHP',
    address_line2='+3XP',
    city='Kataram',
    postal_code='505503',
    mandal='Kataram'
)

farmer = Farmer(
    name='Json',
    surname='Rajesh',
    email='json18.rajesh@mail.com',
    password='test1234',
    role=Role.FARMER,
    farm=farm
)


def fill_in_common_fields(driver, user):
    # Click on Create account button
    create_account_button = driver.find_element(By.XPATH,
                                                '//div[@id="root"]/div/section/main/div/div/div[4]/div/button/span')
    create_account_button.click()

    name_field = WebDriverWait(driver, TIMEOUT).until(
        EC.element_to_be_clickable((By.ID, 'register_name')))
    name_field.click()
    name_field.send_keys(user.name)

    surname_field = driver.find_element(By.ID, 'register_surname')
    surname_field.click()
    surname_field.send_keys(user.surname)

    email_field = driver.find_element(By.ID, 'register_email')
    email_field.click()
    email_field.send_keys(user.email)

    password_field = driver.find_element(By.ID, 'register_password')
    password_field.click()
    password_field.send_keys(user.password)

    confirm_password_field = driver.find_element(By.ID, 'register_confirm')
    confirm_password_field.click()
    confirm_password_field.send_keys(user.password)


def test_create_policy_maker_account(driver):
    driver.get(URL)

    fill_in_common_fields(driver, policy_maker)

    # Select role
    role_field = driver.find_element(By.ID, 'register_role')
    role_field.click()
    policy_maker_option = driver.find_element(
        By.XPATH, '(.//*[normalize-space(text()) and normalize-space(.)="Farmer"])[1]/following::div[2]')
    policy_maker_option.click()

    # Submit
    submit_button = driver.find_element(
        By.XPATH, '(.//*[normalize-space(text()) and normalize-space(.)="Cancel"])[1]/following::span[1]')
    submit_button.click()

    notification = WebDriverWait(driver, TIMEOUT).until(
        lambda x: x.find_element(
            By.CLASS_NAME,
            'ant-notification-notice-with-icon'))

    assert notification.text == 'Account created successfully.'


def test_create_farmer_account(driver):
    driver.get(URL)

    fill_in_common_fields(driver, farmer)
    # Select role
    role_field = driver.find_element(By.ID, 'register_role')
    role_field.click()

    farmer_option = driver.find_element(
        By.XPATH, '(.//*[normalize-space(text()) and normalize-space(.)="policy_maker"])[1]/following::div[6]')
    farmer_option.click()

    sensor_system_id_field = WebDriverWait(driver, TIMEOUT).until(
        EC.element_to_be_clickable((By.ID, 'register_sensorSystemId')))
    sensor_system_id_field.click()
    sensor_system_id_field.send_keys(farmer.farm.sensor_system_id)

    water_irrigation_system_id_field = driver.find_element(By.ID, 'register_waterIrrigationSystemId')
    water_irrigation_system_id_field.click()
    water_irrigation_system_id_field.send_keys(farmer.farm.water_irrigation_system_id)

    farm_address_line1_field = driver.find_element(By.ID, 'register_farmAddressLine1')
    farm_address_line1_field.click()
    farm_address_line1_field.send_keys(farmer.farm.address_line1)

    farm_address_line2_field = driver.find_element(By.ID, 'register_farmAddressLine2')
    farm_address_line2_field.click()
    farm_address_line2_field.send_keys(farmer.farm.address_line2)

    city_field = driver.find_element(By.ID, 'register_farmCity')
    city_field.click()
    city_field.send_keys(farmer.farm.city)

    postal_code_field = driver.find_element(By.ID, 'register_farmPostalCode')
    postal_code_field.click()
    postal_code_field.send_keys(farmer.farm.postal_code)

    mandal_field = driver.find_element(By.ID, 'register_mandal')
    mandal_field.click()
    mandal_field.send_keys(farmer.farm.mandal)

    # Submit
    submit_button = driver.find_element(
        By.XPATH, '(.//*[normalize-space(text()) and normalize-space(.)="Cancel"])[1]/following::span[1]')
    submit_button.click()

    notification = WebDriverWait(driver, TIMEOUT).until(
        lambda x: x.find_element(
            By.CLASS_NAME,
            'ant-notification-notice-with-icon'))

    assert notification.text == 'Account created successfully.'
