import {CreateAccountFarmerRequest} from '../../../model/api/CreateAccountFarmer';
import {useState} from 'react';
import {authRequests} from '../../../api/requests/authRequests';
import {Role} from '../../../model/Role';
import {notification} from 'antd';
import strings from '../../../values/strings';
import {CreateAccountPolicyMakerRequest} from '../../../model/api/CreateAccountPolicyMaker';

/**
 * Hook for register request. Create account and log in.
 * @returns {[register, boolean]}
 */
export const useCreateAccount =
  (setModalVisible: (value: boolean) => void): [((v: CreateAccountFarmerRequest) => void), boolean, ((v: boolean) => void)] => {
    const [loading, setLoading] = useState(false)
    const postCreateAccountFarmer = authRequests.usePostCreateAccountFarmer()
    const postCreateAccountPolicyMaker = authRequests.usePostCreateAccountPolicyMaker()

    const createAccount = (createAccountForm: any) => {
      if (loading) {
        return
      }
      console.log(createAccountForm)
      setLoading(true)
      if (createAccountForm.role === Role.FARMER) {
        const form = createAccountForm as CreateAccountFarmerRequest
        form.farmName = "dummy" //TODO
        postCreateAccountFarmer(form)
          .then(_ => {
            setModalVisible(false)
            notification['info']({message: strings.INFO.ACCOUNT_CREATED})
          })
          .catch(_ => {
          })
          .finally(() => setLoading(false))
      } else if (createAccountForm.role === Role.POLICY_MAKER) {
        const form = createAccountForm as CreateAccountPolicyMakerRequest
        postCreateAccountPolicyMaker(form)
          .then(_ => {
            setModalVisible(false)
            notification['info']({message: strings.INFO.ACCOUNT_CREATED})
          })
          .catch(_ => {
          })
          .finally(() => setLoading(false))
      }
    }

    return [createAccount, loading, setLoading]
  }