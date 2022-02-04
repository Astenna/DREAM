from selenium.webdriver.common.by import By


def click_on_delete_account_button(driver):
    delete_account_button = driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/section/main/div/div/div/button/span'
    )
    delete_account_button.click()


def delete_account(driver):
    click_on_delete_account_button(driver)
