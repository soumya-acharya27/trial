import { gql, useMutation } from '@apollo/client';
import { BlockUserResponse, BlockUserVariables } from '../interface/clubinterface';
import { useSelector } from 'react-redux';
import { RootState } from '../redux-saga/rootReducer';

const BLOCK_USER = gql`
  mutation BlockUser($blockedUserId: String!, $isBlocked: Boolean!) {
    blockUser(blockedUserId: $blockedUserId, isBlocked: $isBlocked) {
      blockedUser {
        blockedUserId
        id
        isBlocked
        userId
      }
    }
  }
`;

export const useBlockUser = () => {
  const token = useSelector((state: RootState) => state.authReducer.accessToken)
  const [blockUserMutation, { loading }] = useMutation<BlockUserResponse, BlockUserVariables>(
    BLOCK_USER, {
      context: {
        headers: {
            authorization: `Bearer ${token}`,
        }
      },
      onCompleted: (data) => {
        
      },
      onError: (data) => {
        console.log({data})
      }
    }
  
  );

  const blockUser = async (blockedUserId: string, isBlocked: boolean) => {
    try {
      const response = await blockUserMutation({
        variables: {
          blockedUserId,
          isBlocked
        }
      });
      return response.data?.blockUser.blockedUser;
    } catch (error) {
      console.error('Error blocking user:', error);
      throw error;
    }
  };

  return { blockUser, loading };
}; 