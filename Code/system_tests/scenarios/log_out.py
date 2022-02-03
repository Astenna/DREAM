from selenium.webdriver.common.by import By


def log_out(driver):
    element = driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/section/header/ul/li[2]/span'
    )

    element.click()
