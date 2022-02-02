from models.Farm import Farm
from models.Role import Role
from models.User import User


class Farmer(User):
    id_iter = 1

    def __init__(self,
                 name='Arun',
                 surname='Ghosh',
                 email=f'arun{id_iter}.ghosh@mail.com',
                 password='test12324',
                 role=Role.FARMER,
                 farm=Farm(),
                 idx=None,
                 ):
        if idx is not None:
            email = f'json{idx}.rajesh@mail.com'

        super().__init__(name, surname, email, password, role)
        self.farm = farm
