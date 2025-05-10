// src/hooks/events/useGetEvents.ts
import { useState, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { GetEventsData, GetEventsVars } from '../interface/eventinterface';
import { GET_EVENTS } from '../graphql/events/eventQuery';

export const useGetEvents = ({
  token,
  regionId,
  type,
  clubId = ''
}: {
  token: string;
  regionId: string;
  type: 'trending' | 'upcoming';
  clubId?: string;
}) => {
  const [page, setPage] = useState(1);

  const { data, loading, error, fetchMore } = useQuery<GetEventsData, GetEventsVars>(
    GET_EVENTS,
    {
      variables: {
        input: {
          limit: 10,
          page: 1,
          regionId: regionId,
          trending: type === 'trending',
          status: 'UPCOMING',
          clubId: clubId ?? ''
        },
      },
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
      fetchPolicy: 'cache-and-network',
    }
  );

  const handleLoadMore = useCallback(() => {
    if (!loading && data?.getEvents.hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMore({
        variables: {
          input: {
            limit: 10,
            page: nextPage,
            regionId: regionId,
            trending: type === 'trending',
            status: 'UPCOMING',
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            getEvents: {
              ...fetchMoreResult.getEvents,
              events: [
                ...prev.getEvents.events,
                ...fetchMoreResult.getEvents.events,
              ],
            },
          };
        },
      });
    }
  }, [data?.getEvents.hasMore, fetchMore, loading, page, regionId, type]);

  return {
    data,
    loading,
    error,
    page,
    handleLoadMore,
  };
};
