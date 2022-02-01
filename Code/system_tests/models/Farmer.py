from models.User import User


class Farmer(User):
    def __init__(self, name, surname, email, password, role, farm):
        super().__init__(name, surname, email, password, role)
        self.farm = farm
