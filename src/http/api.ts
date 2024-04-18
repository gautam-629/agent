
import { ICreateUser, ICredentials, IRechargeUser, IRedeemUser, IResetUser } from '../types';
import { api } from './client';

export const login = (credentials: ICredentials) => api.post('/master/master/login', credentials);

//Protected Route

export const getUsers = (queryString:string, authToken:string | null) => {
    return api.get(`/master/master/userList?${queryString}`, {
      headers: {
        'X-Access-Token': authToken
      }
    });
  };

  export const getAdminInfo = (authToken:string | null) => {
    return api.get(`/master/master/adminInfo`,{
      headers: {
        'X-Access-Token': authToken
      }
    });
  };

  export const createUser = (user:ICreateUser,authToken:string | null) => {
    return api.post(`/master/master/createUser`,user,{
      headers: {
        'X-Access-Token': authToken
      }
    });
  };

  export const resetUserPassword = (user:IResetUser,authToken:string | null) => {
    return api.post(`/master/master/userResetPass`,user,{
      headers: {
        'X-Access-Token': authToken
      }
    });
  };

  export const createReedem = (user:IRedeemUser,authToken:string | null) => {
    return api.post(`/master/master/userRedeem`,user,{
      headers: {
        'X-Access-Token': authToken
      }
    });
  };

  export const createRecharge = (user:IRechargeUser,authToken:string | null) => {
    return api.post(`/master/master/userRecharge`,user,{
      headers: {
        'X-Access-Token': authToken
      }
    });
  };

  
  export const getTransactionSummary = (queryString:string, authToken:string | null) => {
    return api.get(`/master/master/userSummary?${queryString}`, {
      headers: {
        'X-Access-Token': authToken
      }
    });
  };

  export const getTransactionDetail = (queryString:string, authToken:string | null) => {
    return api.get(`/master/master/userLogList?${queryString}`, {
      headers: {
        'X-Access-Token': authToken
      }
    });
  };


// export const getUsers = (queryString: string,authToken:string) => apiInstance.get(`/master/master/userList?${queryString}`);
// export const createUser = (user:ICreateUser) => apiInstance.post('/master/master/createUser',user);
// export const resetUserPassword = (user:IResetUser) => apiInstance.post('/master/master/userResetPass',user);
// export const getAdminInfo = () => apiInstance.post('/master/master/adminInfo');
// export const createReedem = (data:IRedeemUser) => apiInstance.post('/master/master/userRedeem',data);
// export const createRecharge = (data:IRechargeUser) => apiInstance.post('/master/master/userRecharge',data);

// export const getTransactionSummary = () => apiInstance.get('/master/master/userSummary');
// export const getTransactionDetail = () => apiInstance.get('/master/master/userLogLists');











