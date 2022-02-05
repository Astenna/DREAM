from models.Role import Role
from models.User import User


class PolicyMaker(User):
    id_iter = 1

    def __init__(self,
                 name='Json',
                 surname='Rajesh',
                 email=f'json{id_iter}.rajesh@mail.com',
                 password='test1234',
                 role=Role.POLICY_MAKER,
                 idx=None
                 ):
        if idx is not None:
            email = f'{name.lower()}{idx}.{surname.lower()}@mail.com',
        super().__init__(name, surname, email, password, role)
