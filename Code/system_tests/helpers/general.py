from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait

from constants.timeout import TIMEOUT

SUCCESS = 'Account created successfully.'
FAILURE = 'An unidentified error occurred.'


def fill_in_field(driver, element_id, keys):
    field = driver.find_element(By.ID, element_id)
    field.click()
    field.send_keys(keys)


def wait_and_fill_in_fields(driver, data):
    for idx, (element_id, keys) in enumerate(data.items()):
        if idx == 0:
            _ = WebDriverWait(driver, TIMEOUT).until(
                EC.element_to_be_clickable((By.ID, element_id))
            )

        fill_in_field(driver, element_id, keys)


def wait_for_pop_up_to_appear(driver):
    return WebDriverWait(driver, TIMEOUT).until(
        EC.element_to_be_clickable((
            By.CLASS_NAME,
            'ant-notification-notice-message'))
    )


def wait_for_pop_up_to_disappear(driver):
    _ = WebDriverWait(driver, TIMEOUT).until_not(
        EC.visibility_of_element_located((
            By.CLASS_NAME,
            'ant-notification-notice-message'))
    )


def wait_for_view_change(driver, view):
    _ = WebDriverWait(driver, TIMEOUT).until(
        EC.url_matches(view)
    )
