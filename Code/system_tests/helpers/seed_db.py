from constants.endpoints import URL, SUMMARY, DASHBOARD
from helpers.general import wait_for_view_change
from scenarios.create_account import open_registration_form, fill_in_common_fields, select_role, \
    fill_in_farmer_specific_fields, submit_form
from models.Farmer import Farmer
from models.PolicyMaker import PolicyMaker

from models.Role import Role
from scenarios.delete_account import open_delete_account_form, fill_in_delete_account_form, delete_account, SUCCESS
from scenarios.log_in import open_log_in_dialog, fill_in_email_and_password, log_in
from scenarios.open_user_summary import open_summary

seed_farmer = Farmer(name='Seed', surname='Farmer', idx=5)
seed_policy_maker = PolicyMaker(name='Seed', surname='Policymaker', idx=5)


def seed_db(driver):
    users = [seed_farmer, seed_policy_maker]
    for user in users:
        driver.get(URL)
        open_registration_form(driver)
        fill_in_common_fields(driver, user)

        select_role(driver, user.role)
        if user.role == Role.FARMER:
            fill_in_farmer_specific_fields(driver, user)

        submit_form(driver)


def db_cleanup(driver):
    users = [seed_farmer, seed_policy_maker]
    for user in users:
        open_log_in_dialog(driver)
        fill_in_email_and_password(driver, user.email, user.password)
        log_in(driver)

        wait_for_view_change(driver, DASHBOARD)

        open_summary(driver)

        wait_for_view_change(driver, SUMMARY)
        assert driver.current_url == SUMMARY

        open_delete_account_form(driver)
        fill_in_delete_account_form(driver, user)

        notification = delete_account(driver)
        assert notification.text == SUCCESS

        wait_for_view_change(driver, URL)
        assert driver.current_url == URL
