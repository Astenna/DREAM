import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait


@pytest.mark.example
def test_open_google(driver):
    driver.get('https://google.com/')
    assert driver.title == 'Google'


@pytest.mark.example
def test_open_the_verge(driver):
    driver.get('https://theverge.com/')
    assert driver.title == 'The Verge'


@pytest.mark.example
def test_open_tesla(driver):
    driver.get('https://tesla.com/')
    assert driver.title == 'Electric Cars, Solar & Clean Energy | Tesla'


@pytest.mark.parametrize('url, title', [('https://google.com/', 'Google'),
                                        ('https://theverge.com', 'The Verge'),
                                        ('https://tesla.com', 'Electric Cars, Solar & Clean Energy | Tesla')])
def test_open_url(driver, url, title):
    driver.get(url)
    assert driver.title == title


@pytest.mark.example
def test_user_should_able_to_add_item(driver):
    new_task = 'Sample Testing'

    driver.get('https://lambdatest.github.io/sample-todo-app/')

    assert driver.title == 'Sample page - lambdatest.com'

    assert len(driver.find_elements(By.TAG_NAME, 'li')) == 5

    driver.find_element(By.NAME, 'li1').click()
    driver.find_element(By.NAME, 'li2').click()

    email_text_field = driver.find_element(By.ID, 'sampletodotext')
    email_text_field.send_keys(new_task)

    driver.find_element(By.ID, 'addbutton').click()
    _ = WebDriverWait(driver, 20).until(lambda x: x.find_element(By.NAME, 'li6'))

    assert len(driver.find_elements(By.TAG_NAME, 'li')) == 6
