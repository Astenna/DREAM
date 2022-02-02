from constants.paths import URL
from helpers.create_account import open_registration_form, fill_in_common_fields, select_role, \
    fill_in_farmer_specific_fields, submit_form
from models.Farmer import Farmer
from models.PolicyMaker import PolicyMaker

from models.Role import Role

seed_farmer = Farmer(idx=5)
seed_policy_maker = PolicyMaker(idx=5)


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
