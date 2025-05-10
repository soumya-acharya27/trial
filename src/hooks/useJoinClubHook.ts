import { useMutation } from "@apollo/client";
import { JoinClubResponse, JoinClubVariables } from "../interface/clubinterface";
import { JOIN_CLUB } from "../graphql/clubs/clubsMutation";
import { useSelector } from "react-redux";
import { RootState } from "../redux-saga/rootReducer";
import { errorMessage, showErrorToast } from "../utils";

interface useJoinClubProps {
    successCb: (data: JoinClubResponse) => void;
    errorCb: () => void;
}

const useJoinClub = ({successCb, errorCb} : useJoinClubProps) => {
    const token = useSelector((state: RootState) => state.authReducer.accessToken)
    const [joinClub, { loading, error, data }] = useMutation<JoinClubResponse, JoinClubVariables>(JOIN_CLUB,
        {
            context: {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            },
            onCompleted:(data) => {
                successCb(data)
            },
            onError: (error) => {
                showErrorToast(errorMessage)
                errorCb()
            }
        },
    );
  
    return { joinClub, joinClubLoading: loading, joinClubError: error, joinClubData: data };
  };
  
  export default useJoinClub;