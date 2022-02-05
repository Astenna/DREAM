from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait

from constants.timeout import TIMEOUT
from helpers.general import wait_for_pop_up_to_appear
from models.Note import Note
from models.ProblemType import ProblemType

NOTE_SAVED = 'Note saved.'


def click_on_farmers_button(driver):
    farmers_button = driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/aside/div/ul/li[2]'
    )
    farmers_button.click()


def open_farmers_view(driver):
    click_on_farmers_button(driver)


def first_latest_farmer_name(driver):
    return driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/section/main/div/div[3]/div/div[2]/div/div/div/div/div/table/tbody/tr/td'
    )


def search_for_farmer(driver, farmer):
    search_box = driver.find_element(
        By.XPATH,
        '//input[@value=""]'
    )
    search_box.click()

    search_box.send_keys(f'{farmer.name} {farmer.surname}')

    search_button = driver.find_element(
        By.XPATH,
        '(.//*[normalize-space(text()) and normalize-space(.)="Farmer"])[1]/following::*[name()="svg"][1]'
    )
    search_button.click()

    WebDriverWait(driver, TIMEOUT).until(
        lambda wd: first_latest_farmer_name(wd).text == f'{farmer.name} {farmer.surname}'
    )


def click_on_farmer(driver):
    farmers_button = driver.find_element(
        By.XPATH,
        '(.//*[normalize-space(text()) and normalize-space(.)="Kataram"])[1]/following::*[name()="svg"][2]'
    )
    farmers_button.click()


def open_farmers_summary(driver):
    click_on_farmer(driver)


def click_on_change_note_button(driver):
    change_note_button = driver.find_element(
        By.LINK_TEXT,
        'Change'
    )
    change_note_button.click()


def open_change_note_form(driver):
    click_on_change_note_button(driver)


def select_note(driver, note):
    note_dropdown = WebDriverWait(driver, TIMEOUT).until(
        EC.visibility_of_element_located((
            By.CLASS_NAME,
            'ant-select-selector'
        ))
    )
    note_dropdown.click()

    if note == Note.POSITIVE:
        note_option = WebDriverWait(driver, TIMEOUT).until(
            EC.element_to_be_clickable((
                By.XPATH,
                '(.//*[normalize-space(text()) and normalize-space(.)="Neutral"])[2]/following::div[2]'
            ))
        )
    elif note == Note.NEGATIVE:
        note_option = WebDriverWait(driver, TIMEOUT).until(
            EC.element_to_be_clickable((
                By.XPATH,
                '(.//*[normalize-space(text()) and normalize-space(.)="Neutral"])[1]/following::div[6]'
            ))
        )
    else:
        note_option = WebDriverWait(driver, TIMEOUT).until(
            EC.element_to_be_clickable((
                By.XPATH,
                '(.//*[normalize-space(text()) and normalize-space(.)="Negative"])[2]/following::div[2]'
            ))
        )
    note_option.click()


def select_problem_type(driver, problem_type):
    selectors = WebDriverWait(driver, TIMEOUT).until(
        EC.visibility_of_all_elements_located((
            By.CLASS_NAME,
            'ant-select-selector'
        ))
    )
    selectors[-1].click()

    if problem_type == ProblemType.WEATHER:
        problem_type_option = WebDriverWait(driver, TIMEOUT).until(
            EC.element_to_be_clickable((
                By.XPATH,
                '(.//*[normalize-space(text()) and normalize-space(.)="Insects"])[1]/following::div[6]'
            ))
        )
    elif problem_type == ProblemType.INSECTS:
        problem_type_option = WebDriverWait(driver, TIMEOUT).until(
            EC.element_to_be_clickable((
                By.XPATH,
                '(.//*[normalize-space(text()) and normalize-space(.)="Weather"])[5]/following::div[2]'
            ))
        )
    elif problem_type == ProblemType.NEGATIVE_NOTE:
        problem_type_option = WebDriverWait(driver, TIMEOUT).until(
            EC.element_to_be_clickable((
                By.XPATH,
                '(.//*[normalize-space(text()) and normalize-space(.)="Insects"])[3]/following::div[2]'
            ))
        )
    else:
        problem_type_option = WebDriverWait(driver, TIMEOUT).until(
            EC.element_to_be_clickable((
                By.XPATH,
                '(.//*[normalize-space(text()) and normalize-space(.)="NegativeNote"])[3]/following::div[2]'
            ))
        )
    problem_type_option.click()


def get_invalid_problem_type_alert(driver):
    return WebDriverWait(driver, TIMEOUT).until(
        EC.visibility_of_element_located((
            By.XPATH,
            '(.//*[normalize-space(text()) and normalize-space(.)="Problem type"])[1]/following::div[2]'
        ))
    )


def click_on_save_changes_button(driver):
    save_changes_button = driver.find_element(
        By.XPATH,
        '(.//*[normalize-space(text()) and normalize-space(.)="Cancel"])[1]/following::span[1]'
    )
    save_changes_button.click()


def submit_form(driver):
    click_on_save_changes_button(driver)

    return wait_for_pop_up_to_appear(driver)
