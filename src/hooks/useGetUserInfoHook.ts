import { useLazyQuery, useQuery } from "@apollo/client";
import { GetUserInfoData, GetUserInfoVars } from "../interface/signUpInterface";
import { GET_USER_INFO } from "../graphql/auth/authQuery";
import { useSelector } from "react-redux";
import { RootState } from "../redux-saga/rootReducer";

export const useGetUserInfo = () => {
    const token = useSelector((state: RootState) => state.authReducer.accessToken)
    const [fetchUserInfo, { data : userData, loading: userLoading, error:userError }] = useLazyQuery<
    GetUserInfoData,
    GetUserInfoVars
  >(
      GET_USER_INFO,
      {
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            }
        },
        onCompleted: (res) => {

        },
        onError: (err) => {
          console.log("error fetching user info", err)
        }
      }
    );
  
    return { fetchUserInfo, userData, userLoading, userError };
  };