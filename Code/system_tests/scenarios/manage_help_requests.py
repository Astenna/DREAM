from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait

from constants.timeout import TIMEOUT
from helpers.general import wait_and_fill_in_fields, wait_for_pop_up_to_appear


def click_on_my_help_requests_button(driver):
    my_help_requests_button = driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/aside/div/ul/li[4]/span'
    )
    my_help_requests_button.click()


def open_my_help_requests_view(driver):
    click_on_my_help_requests_button(driver)


def click_on_create_help_request_button(driver):
    my_help_requests_button = driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/section/main/div/div[3]/div/div/div[2]/button'
    )
    my_help_requests_button.click()


def open_create_help_request_form(driver):
    click_on_create_help_request_button(driver)


def fill_in_create_help_request_form(driver, help_request):
    wait_and_fill_in_fields(driver, {
        'topic': help_request.topic,
        'description': help_request.description
    })


def submit_form(driver):
    submit_button = driver.find_element(
        By.XPATH,
        '(.//*[normalize-space(text()) and normalize-space(.)="Cancel"])[1]/following::span[1]'
    )
    submit_button.click()

    #     TODO: Uncomment after notification is implemented
    # return wait_for_pop_up_to_appear(driver)


def get_invalid_topic_alert(driver):
    return WebDriverWait(driver, TIMEOUT).until(
        EC.visibility_of_element_located((
            By.XPATH,
            '(.//*[normalize-space(text()) and normalize-space(.)="Create help request"])[2]/following::div[7]'
        ))
    )


def get_invalid_description_alert(driver):
    return WebDriverWait(driver, TIMEOUT).until(
        EC.visibility_of_element_located((
            By.XPATH,
            '(.//*[normalize-space(text()) and normalize-space(.)="This field is required"])[1]/following::div[6]'
        ))
    )


def open_my_help_request(driver):
    my_help_request = driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/section/main/div/div[3]/div/a/div/div/div/div/h1'
    )
    my_help_request.click()


def fill_in_response(driver, advice):
    wait_and_fill_in_fields(driver, {
        'provideAdvice_content': advice,
    })


def submit_response(driver):
    submit_response_button = driver.find_element(
        By.XPATH,
        '//button[@type="submit"]'
    )
    submit_response_button.click()

    # TODO: Uncomment after notification is implemented
    # return wait_for_pop_up_to_appear(driver)
