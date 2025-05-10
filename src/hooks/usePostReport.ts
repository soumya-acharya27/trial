import { gql, useMutation, useQuery } from '@apollo/client';
import { 
  GetReportCategoriesResponse, 
  AddPostReportResponse, 
  AddPostReportVariables 
} from '../interface/clubinterface';
import { useSelector } from 'react-redux';
import { RootState } from '../redux-saga/rootReducer';

const GET_REPORT_CATEGORIES = gql`
  query GetReportCategories {
    getReportCategories {
      reports {
        id
        reason
      }
    }
  }
`;

const ADD_POST_REPORT = gql`
  mutation AddPostReport($input: AddPostReportInput!) {
    addPostReport(input: $input) {
      id
      postId
      reason
      reportId
      userId
    }
  }
`;
export const usePostReport = () => {
  const token = useSelector((state: RootState) => state.authReducer.accessToken)
  const { data: categoriesData, loading: categoriesLoading } = useQuery<GetReportCategoriesResponse>(
    GET_REPORT_CATEGORIES, {
      context: {
        headers: {
            authorization: `Bearer ${token}`,
        }
      },
    }
  );

  const [reportPost, { loading: reportLoading }] = useMutation<AddPostReportResponse, AddPostReportVariables>(
    ADD_POST_REPORT, 
    {
      context: {
        headers: {
            authorization: `Bearer ${token}`,
        }
      },
      onCompleted: (data) => {
      },
      onError: (res) => {
        console.log("res" , res)
      }
    }
  );

  const submitReport = async (postId: string, reportId: string) => {
    try {
      const response = await reportPost({
        variables: {
          input: {
            postId,
            reportId
          }
        }
      });
      return response.data?.addPostReport;
    } catch (error) {
      console.error('Error reporting post:', error);
      throw error;
    }
  };

  return {
    reportCategories: categoriesData?.getReportCategories.reports || [],
    categoriesLoading,
    submitReport,
    reportLoading
  };
}; 